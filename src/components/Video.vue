<script lang="ts">
  import { defineComponent, ComponentPublicInstance as CPI } from "vue";
  import { mapState, mapWritableState } from "pinia";
  import { useVideoStore } from "../store";
  import Subtitle from "./Subtitle.vue";

  export default defineComponent({
    components: {
      Subtitle,
    },
    computed: {
      ...mapState(useVideoStore, ["videoSrc"]),
      ...mapWritableState(useVideoStore, [
        "videoEl",
        "isPaused",
        "currentTime",
        "duration",
      ]),
    },
    methods: {
      onLoad() {
        this.duration = +this.videoEl!.duration.toFixed(1);
        this.currentTime = +this.videoEl!.currentTime.toFixed(1);
      },
      onUpdate() {
        this.currentTime = +this.videoEl!.currentTime.toFixed(1);
      },
      onEnd() {
        this.isPaused = true;
        this.currentTime = 0;
      },
    },
    watch: {
      videoSrc() {
        this.videoEl!.load();
        this.isPaused = true;
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
  <Subtitle />
</template>

<style>
  .video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
