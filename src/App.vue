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
    },
  };
</script>

<template>
  <div class="video-container">
    <Video v-if="videoSrc !== ''" />
    <div v-else class="video-empty" />
  </div>
  <div class="controls">
    <!-- <div class="button-container"> -->
    <PlayPauseButton />
    <!-- </div> -->
    <!-- <div class="button-container"> -->
    <LoopButton />
    <!-- </div> -->
  </div>
  <div class="progress-container">
    <Progress />
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

  input[type="file"] {
    display: none;
  }

  label {
    border-radius: 2px;
    padding: 5px 15px;
    margin: 10px;
    color: lightgray;
    font-size: 0.75rem;
    background-color: #3f4e4f;
    display: inline-block;
    cursor: pointer;
  }
</style>
