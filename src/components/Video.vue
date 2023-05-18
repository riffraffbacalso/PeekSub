<script lang="ts">
  import { defineComponent, ComponentPublicInstance as CPI } from "vue";
  import { mapState, mapWritableState } from "pinia";
  import { useVideoStore, useSubtitleStore } from "../store";

  export default defineComponent({
    computed: {
      ...mapState(useVideoStore, ["videoSrc"]),
      ...mapState(useSubtitleStore, ["srtBlocks", "selectedBlock"]),
      ...mapWritableState(useVideoStore, [
        "videoEl",
        "isPaused",
        "currentTime",
        "duration",
      ]),
    },
    methods: {
      onLoad() {
        if (this.videoEl) {
          this.duration = +this.videoEl.duration.toFixed(1);
          this.currentTime = +this.videoEl.currentTime.toFixed(1);
        }
      },
      onUpdate() {
        if (this.videoEl) {
          this.currentTime = +this.videoEl.currentTime.toFixed(1);
        }
      },
      onEnd() {
        this.isPaused = true;
        this.currentTime = 0;
      },
    },
    watch: {
      videoSrc() {
        if (this.videoEl) {
          this.videoEl.load();
          this.isPaused = true;
        }
      },
    },
    mounted() {
      this.videoEl = this.$refs.videoEl as CPI<HTMLVideoElement>;
      this.isPaused = this.videoEl.paused;
      this.currentTime = this.videoEl.currentTime;
    },
  });
</script>

<template>
  <video
    ref="videoEl"
    class="video"
    @loadedmetadata="onLoad"
    @timeupdate="onUpdate"
    @ended="onEnd"
  >
    <source :src="videoSrc" type="video/mp4" />
  </video>
  <p class="subtitles" contenteditable="true">
    <span
      class="subtitle-line"
      v-for="subtitle in selectedBlock
        ? srtBlocks[selectedBlock].subtitles
        : []"
    >
      {{ subtitle }}
    </span>
  </p>
</template>

<style>
  .video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .subtitles {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    margin-bottom: 1rem;
    color: white;
    font-size: calc(1.275rem + 0.3vw);
    text-align: center;
    text-shadow: 1px 1px 1px black;
    transform: translateX(-50%);
  }

  .subtitles[contenteditable]:focus {
    background-color: rgba(80, 80, 80, 0.25);
    outline: none;
  }

  .subtitle-line {
    display: block;
    white-space: pre-wrap;
  }
</style>
