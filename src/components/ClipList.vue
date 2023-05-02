<script>
  import { mapWritableState } from "pinia";
  import { useSubtitleStore, useVideoStore } from "../store";

  export default {
    data() {
      return {
        content: [],
      };
    },
    computed: {
      ...mapWritableState(useSubtitleStore, ["subtitleFile"]),
      ...mapWritableState(useVideoStore, ["videoFile", "duration"]),
    },
    watch: {
      subtitleFile() {
        let fr = new FileReader();
        fr.onload = () => {
          this.content = fr.result.split("\n");
        };
        fr.readAsText(this.subtitleFile);
      },
    },
  };
</script>

<template>
  <div class="clip-list">
    <li v-for="line in content">
      {{ line }}
    </li>
  </div>
</template>

<style>
  .clip-list {
    height: 100%;
    overflow-y: scroll;
  }
</style>
