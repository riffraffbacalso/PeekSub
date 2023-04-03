<script>
  import { mapActions, mapState } from "pinia";
  import { useVideoStore } from "../store";

  export default {
    props: {
      start: (Number = 0),
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
    :style="rightStyle"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  />
</template>

<style>
  .progress-container {
    display: flex;
    /* flex: 1 0 0; */
    /* align-self: center; */
    height: 7px;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    cursor: pointer;

    outline: 1px dashed red;
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

  .progress-container:hover > .progress {
    height: 7px;
    transition: 0.25s;
  }
</style>
