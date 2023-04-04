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

<style>
  .video-container {
    display: flex;
    width: 70vw;
    height: 80vh;
    position: relative;
    padding-right: 0;
    padding-left: 0;

    background-color: black;
    /* outline: 1px dashed white; */
  }

  .video {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .subtitles {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin-bottom: 1rem;
    font-size: calc(1.275rem + 0.3vw);
    color: white;
    text-shadow: 1px 1px 1px black;
  }

  .subtitles[contenteditable]:focus {
    outline: none;
    background-color: rgba(80, 80, 80, 0.25);
  }
</style>
