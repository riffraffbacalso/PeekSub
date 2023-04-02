<script>
  import { mapActions, mapState } from "pinia";
  import { useVideoStore } from "../store";

  export default {
    props: {
      start: Number = 0,
    },
    data() {
      return {
        left: null,
        width: null,
        isMouseDown: false,
      };
    },
    computed: {
      ...mapState(useVideoStore, ["currentTime", "duration"]),
      rightStyle() {
        return `--percent-right: ${(
          100 -
          (100 * this.currentTime) / this.duration
        ).toFixed(1)}%`;
      },
    },
    methods: {
      ...mapActions(useVideoStore, ["seek"]),
      onMouseDown(e) {
        this.isMouseDown = true;
        let rect = this.$refs.progress.getBoundingClientRect();
        this.left = rect.left;
        this.width = rect.right - rect.left;
        let time = (this.duration * (e.clientX - this.left)) / this.width;
        this.seek(time);
      },
      onMouseMove(e) {
        if (!this.isMouseDown) return;
        let time = (this.duration * (e.clientX - this.left)) / this.width;
        this.seek(time);
      },
      onMouseUp() {
        this.isMouseDown = false;
      },
    },
  };
</script>

<template>
  <div
    ref="progress"
    class="progress"
    role="progressbar"
    :style="rightStyle"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  ></div>
</template>
