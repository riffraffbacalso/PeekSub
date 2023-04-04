<script>
  import { mapActions, mapState } from "pinia";
  import { useVideoStore } from "../store";

  export default {
    props: {
      start: { type: Number, default: 0 },
    },
    data() {
      return {
        left: null,
        width: null,
        isMouseDown: false,
        isMouseOver: false,
        hoveredTime: 0,
      };
    },
    computed: {
      ...mapState(useVideoStore, ["currentTime", "duration"]),
      afterStyle() {
        return `--percent-right: ${(
          100 -
          (100 * this.currentTime) / this.duration
        ).toFixed(1)}%`;
      },
      timeStyle() {
        return `right: ${(
          100 -
          (100 * this.hoveredTime) / this.duration
        ).toFixed(1)}%`;
      },
      hoveredTimeFormatted() {
        let mins = Math.floor(this.hoveredTime / 60);
        let secs = Math.floor(this.hoveredTime % 60);
        let ms = this.hoveredTime.toFixed(3).slice(-3);
        return `${mins}:${secs}.${ms}`;
      },
    },
    methods: {
      ...mapActions(useVideoStore, ["seek"]),
      onMouseDown(e) {
        this.isMouseDown = true;
        let time =
          this.duration * ((e.clientX - this.left) / this.width) + this.start;
        this.seek(time);
      },
      onMouseMove(e) {
        if (!this.isMouseOver) return;
        let time =
          this.duration * ((e.clientX - this.left) / this.width) + this.start;
        this.hoveredTime = time;
        if (this.isMouseDown) this.seek(time);
      },
      onMouseUp() {
        this.isMouseDown = false;
      },
      onMouseOver(e) {
        this.isMouseOver = true;
        let rect = this.$refs.progress.getBoundingClientRect();
        this.left = rect.left;
        this.width = rect.right - rect.left;
        let time = (this.duration * (e.clientX - this.left)) / this.width;
        this.hoveredTime = time;
      },
      onMouseLeave() {
        this.isMouseOver = false;
      },
    },
  };
</script>

<template>
  <div
    ref="progress"
    class="progress"
    :style="afterStyle"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  />
  <span class="progress-time" :style="timeStyle" v-show="isMouseOver">{{
    hoveredTimeFormatted
  }}</span>
</template>

<style>
  .progress-container {
    display: flex;
    position: relative;
    height: 7px;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
    cursor: pointer;

    /* outline: 1px dashed red; */
  }

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
</style>
