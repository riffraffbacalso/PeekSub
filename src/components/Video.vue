<script>
  import { mapWritableState } from "pinia";
  import { useVideoStore } from "../store";

  export default {
    computed: {
      ...mapWritableState(useVideoStore, [
        "videoEl",
        "isPaused",
        "currentTime",
        "duration",
      ]),
    },
    methods: {
      onLoad() {
        this.duration = +this.videoEl.duration.toFixed(1);
        this.currentTime = +this.videoEl.currentTime.toFixed(1);
      },
      onUpdate() {
        this.currentTime = +this.videoEl.currentTime.toFixed(1);
      },
      onEnd() {
        this.isPaused = true;
        this.currentTime = 0;
      },
    },
    mounted() {
      this.videoEl = this.$refs.videoEl;
      this.isPaused = this.videoEl.paused;
      this.currentTime = this.videoEl.currentTime;
    },
  };
</script>

<template>
  <div class="video-container">
    <video
      ref="videoEl"
      class="video"
      @loadedmetadata="onLoad"
      @timeupdate="onUpdate"
      @ended="onEnd"
    >
      <source src="../assets/rocks.mp4" type="video/mp4" />
    </video>
    <p class="subtitles" contenteditable="true">It's interesting, the ghosts</p>
  </div>
</template>
