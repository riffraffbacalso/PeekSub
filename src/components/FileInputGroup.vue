<script lang="ts">
  import { defineComponent } from "vue";
  import { mapWritableState } from "pinia";
  import { useSubtitleStore, useVideoStore } from "../store";
  import FileInput from "./FileInput.vue";

  export default defineComponent({
    components: { FileInput },
    computed: {
      ...mapWritableState(useVideoStore, ["videoFile"]),
      ...mapWritableState(useSubtitleStore, ["subtitleFile"]),
    },
    methods: {
      updateVideoFile(newFile: File) {
        this.videoFile = newFile;
      },
      updateSubtitleFile(newFile: File) {
        this.subtitleFile = newFile;
      },
    },
  });
</script>

<template>
  <header class="file-input-group">
    <FileInput
      fileType="Video"
      acceptStr="video/*"
      :updateFile="updateVideoFile"
    />
    <FileInput
      fileType="Subtitle"
      acceptStr=".srt"
      :updateFile="updateSubtitleFile"
    />
  </header>
</template>

<style>
  .file-input-group {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-evenly;
  }
</style>
