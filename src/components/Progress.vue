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
        let mouseX = e.clientX;
        let time = (this.end * (mouseX - this.left)) / this.width;
        this.seek(time);
      },
      onMouseUp() {
        this.isMouseDown = false;
      },
      onMouseMove(e) {
        if (!this.isMouseDown) return;
        let mouseX = e.clientX;
        let time = (this.end * (mouseX - this.left)) / this.width;
        this.seek(time);
      },
    },
    mounted() {
      let rect = this.$refs.progress.getBoundingClientRect();
      this.left = rect.left;
      this.width = rect.right - rect.left;
    },
  };
</script>

<template>
  <div
    ref="progress"
    class="progresss"
    role="progressbar"
    :style="rightStyle"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  ></div>
</template>
