<script>
  import { mapState } from "pinia";
  import { useVideoStore } from "./store";
  import FileInput from "./components/FileInput.vue";
  import LoopButton from "./components/LoopButton.vue";
  import PlayPauseButton from "./components/PlayPauseButton.vue";
  import Progress from "./components/Progress.vue";
  import Video from "./components/Video.vue";

  export default {
    components: { FileInput, LoopButton, PlayPauseButton, Progress, Video },
    computed: {
      ...mapState(useVideoStore, ["videoSrc"]),
      srcExists() {
        return this.videoSrc !== "";
      },
    },
  };
</script>

<template>
  <div class="video-container">
    <Video v-if="srcExists" />
  </div>
  <div class="controls">
    <!-- <div class="button-container"> -->
    <PlayPauseButton :disabled="!srcExists" />
    <!-- </div> -->
    <!-- <div class="button-container"> -->
    <LoopButton :disabled="!srcExists" />
    <!-- </div> -->
  </div>
  <div class="progress-container">
    <Progress :isDisabled="!srcExists" />
  </div>
  <div class="clips-container">
    <FileInput />
  </div>
</template>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    margin-right: auto;
    margin-left: auto;

    display: grid;
    grid-template-rows: 80vh 10vh 10vh;
    grid-template-columns: 70vw 30vw;
  }
</style>
