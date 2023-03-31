<script>
  export default {
    props: {
      currentTime: Number,
      start: Number,
      end: Number,
      seek: Function,
    },
    data() {
      return {
        left: null,
        width: null,
        isMouseDown: false,
      };
    },
    computed: {
      rightStyle() {
        return `--percent-right: ${(
          100 -
          (100 * this.currentTime) / this.end
        ).toFixed(1)}%`;
      },
    },
    methods: {
      onMouseDown(e) {
        this.isMouseDown = true;
        let rect = this.$refs.progress.getBoundingClientRect();
        this.left = rect.left;
        this.width = rect.right - rect.left;
        let time = (this.end * (e.clientX - this.left)) / this.width;
        this.seek(time);
      },
      onMouseUp() {
        this.isMouseDown = false;
      },
      onMouseMove(e) {
        if (!this.isMouseDown) return;
        let time = (this.end * (e.clientX - this.left)) / this.width;
        this.seek(time);
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
