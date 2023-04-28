<script>
  import { mapActions, mapState } from "pinia";
  import { useVideoStore } from "../store";

  export default {
    props: {
      start: { type: Number, default: 0 },
      isDisabled: { type: Boolean, default: false },
    },
    data() {
      return {
        left: null,
        width: null,
        isMouseOver: false,
        isScrubbing: false,
        indicatorPos: 0,
        indicatorTime: 0,
      };
    },
    computed: {
      // TODO: don't use video.duration once video sections are used as that refers to the video as a whole
      ...mapState(useVideoStore, ["currentTime", "duration"]),
      afterStyle() {
        return `--percent-right: ${(
          100 -
          (100 * this.currentTime) / this.duration
        ).toFixed(1)}%`;
      },
      indicatorStyle() {
        return `right: ${(100 - 100 * this.indicatorPos).toFixed(1)}%`;
      },
      hoveredTime() {
        let actualTime = this.indicatorTime + this.start;
        let hrs = Math.floor(actualTime / 3600);
        let mins = Math.floor((actualTime % 3600) / 60);
        let secs = Math.floor(actualTime % 60);
        let ms = actualTime.toFixed(3).slice(-3);
        return `${hrs}:${mins}:${secs}.${ms}`;
      },
    },
    methods: {
      ...mapActions(useVideoStore, ["hiddenPause", "hiddenPlay", "seek"]),
      calcIndicator(mouseXPos) {
        let posRatio = (mouseXPos - this.left) / this.width;
        this.indicatorPos = Math.min(Math.max(posRatio, 0), 1);
        return this.duration * this.indicatorPos;
      },
      onMouseDown(e) {
        if (this.isDisabled) return;
        this.hiddenPause();
        this.isScrubbing = true;
        let time = this.calcIndicator(e.clientX);
        this.seek(time);
      },
      onMouseMove(e) {
        if (this.isDisabled) return;
        let time = this.calcIndicator(e.clientX);
        this.indicatorTime = time;
        if (this.isScrubbing) {
          this.seek(time);
        }
      },
      onMouseUp() {
        if (this.isDisabled) return;
        this.hiddenPlay();
        this.isScrubbing = false;
      },
      onMouseOver(e) {
        if (this.isDisabled) return;
        this.isMouseOver = true;
        let rect = this.$refs.progress.getBoundingClientRect();
        this.left = rect.left;
        this.width = rect.right - rect.left;
        let time = this.calcIndicator(e.clientX);
        this.indicatorTime = time;
      },
      onMouseLeave() {
        if (this.isDisabled) return;
        this.isMouseOver = false;
      },
    },
    mounted() {
      document.addEventListener("mousemove", (e) => {
        if (this.isScrubbing) this.onMouseMove(e);
      });
      document.addEventListener("mouseup", () => {
        if (this.isScrubbing) this.onMouseUp();
      });
    },
    unmounted() {
      document.removeEventListener("mousemove", (e) => {
        if (this.isScrubbing) this.onMouseMove(e);
      });
      document.removeEventListener("mouseup", () => {
        if (this.isScrubbing) this.onMouseUp();
      });
    },
  };
</script>

<template>
  <div
    ref="progress"
    class="progress"
    :style="afterStyle"
    :disabled="isDisabled"
    @mousedown.prevent="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  />
  <span
    class="progress-time"
    :style="indicatorStyle"
    v-show="isMouseOver || isScrubbing"
    >{{ hoveredTime }}</span
  >
</template>

<style>
  .progress {
    flex: 1 0 0;
    align-self: center;
    height: 2px;
    overflow: hidden;
    background-color: gray;
    border-radius: 0.375rem;
    position: relative;
  }

  .progress:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: var(--percent-right);
    background-color: white;
  }

  .progress-time {
    position: absolute;
    bottom: 10px;
    transform: translateX(50%);
    font-size: 0.75rem;
    color: white;
    z-index: 1;
  }

  .progress-container:hover > .progress {
    height: 7px;
    transition: 0.25s;
  }

  .progress-container:has(.progress[disabled="true"]) {
    pointer-events: none;
  }
</style>
