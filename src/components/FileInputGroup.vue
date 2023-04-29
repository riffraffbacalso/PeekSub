<script>
  import { mapWritableState } from "pinia";
  import { useSubtitleStore, useVideoStore } from "../store";
  import FileInput from "./FileInput.vue";

  export default {
    components: { FileInput },
    computed: {
      ...mapWritableState(useVideoStore, ["videoSrc"]),
      ...mapWritableState(useSubtitleStore, ["subtitleSrc"]),
    },
    methods: {
      updateVideoSrc(newSrc) {
        this.videoSrc = newSrc;
      },
      updateSubtitleSrc(newSrc) {
        this.subtitleSrc = newSrc;
      },
    },
  };
</script>

<template>
  <header class="file-input-group">
    <FileInput
      filetype="Video"
      acceptStr="video/*"
      :updateSrc="updateVideoSrc"
    />
    <FileInput
      filetype="Subtitle"
      acceptStr=".srt"
      :updateSrc="updateSubtitleSrc"
    />
  </header>
</template>

<style>
  .file-input-group {
    display: flex;
    height: 40px;
    align-items: center;
    box-shadow: 5px 0px 5px;
  }
</style>
