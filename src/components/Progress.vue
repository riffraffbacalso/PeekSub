<script lang="ts">
  import { defineComponent, ComponentPublicInstance as CPI } from "vue";
  import { mapActions, mapState } from "pinia";
  import { useVideoStore } from "../store";

  export default defineComponent({
    props: {
      start: { type: Number, default: 0 },
      isDisabled: { type: Boolean, default: false },
    },
    data() {
      return {
        left: 0 as number,
        width: 0 as number,
        isMouseOver: false as boolean,
        isScrubbing: false as boolean,
        indicatorPos: 0 as number,
        indicatorTime: 0 as number,
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
      calcIndicator(mouseXPos: number) {
        let posRatio = (mouseXPos - this.left) / this.width;
        this.indicatorPos = Math.min(Math.max(posRatio, 0), 1);
        return this.duration * this.indicatorPos;
      },
      onMouseDown(e: MouseEvent) {
        if (this.isDisabled) return;
        this.hiddenPause();
        this.isScrubbing = true;
        let time = this.calcIndicator(e.clientX);
        this.seek(time);
      },
      onMouseMove(e: MouseEvent) {
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
      onMouseOver(e: MouseEvent) {
        if (this.isDisabled) return;
        this.isMouseOver = true;
        let progressEl = this.$refs.progress as CPI<HTMLElement>;
        let rect = progressEl.getBoundingClientRect();
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
  });
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
    position: relative;
    overflow: hidden;
    height: 2px;
    flex: 1 0 0;
    align-self: center;
    border-radius: 0.375rem;
    background-color: gray;
  }

  .progress:after {
    position: absolute;
    top: 0;
    right: var(--percent-right);
    bottom: 0;
    left: 0;
    background-color: white;
    content: "";
  }

  .progress-time {
    position: absolute;
    z-index: 1;
    bottom: 10px;
    color: white;
    font-size: 0.75rem;
    transform: translateX(50%);
  }

  .progress-container:hover > .progress {
    height: 7px;
    transition: 0.25s;
  }

  .progress-container:has(.progress[disabled="true"]) {
    pointer-events: none;
  }
</style>
