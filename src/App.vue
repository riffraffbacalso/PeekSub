<script>
  import { mapState } from "pinia";
  import { useVideoStore } from "./store";
  import FileInputGroup from "./components/FileInputGroup.vue";
  import LoopButton from "./components/LoopButton.vue";
  import PlayPauseButton from "./components/PlayPauseButton.vue";
  import Progress from "./components/Progress.vue";
  import Video from "./components/Video.vue";

  export default {
    components: {
      FileInputGroup,
      LoopButton,
      PlayPauseButton,
      Progress,
      Video,
    },
    computed: {
      ...mapState(useVideoStore, ["videoUploaded"]),
    },
  };
</script>

<template>
  <div class="video-container">
    <Video v-if="videoUploaded" />
  </div>
  <div class="controls">
    <!-- <div class="button-container"> -->
    <PlayPauseButton :disabled="!videoUploaded" />
    <!-- </div> -->
    <!-- <div class="button-container"> -->
    <LoopButton :disabled="!videoUploaded" />
    <!-- </div> -->
  </div>
  <div class="progress-container">
    <Progress :isDisabled="!videoUploaded" />
  </div>
  <div class="right-column">
    <FileInputGroup />
    <div class="clips-container"></div>
  </div>
</template>

<style>
  #app {
    display: grid;
    width: 100vw;
    height: 100vh;
    margin-right: auto;
    margin-left: auto;
    grid-template-columns: 70vw 30vw;
    grid-template-rows: 80vh 10vh 10vh;
  }

  .video-container {
    position: relative;
    display: flex;
    width: 70vw;
    height: 80vh;
    padding-right: 0;
    padding-left: 0;
    background-color: black;
    grid-column: 1;
    grid-row: 1;
    /* outline: 1px dashed white; */
  }

  .controls {
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    grid-column: 1;
    grid-row: 2;
    /* outline: 1px dashed red; */
  }

  .progress-container {
    position: relative;
    display: flex;
    height: 7px;
    margin-right: 2rem;
    margin-left: 2rem;
    cursor: pointer;
    grid-column: 1;
    grid-row: 3;
    /* outline: 1px dashed red; */
  }

  .right-column {
    width: 30vw;
    background-color: #2c3639;
    grid-column: 2;
    grid-row: 1 / 4;
  }

  .clips-container {
    display: flex;
    /* height: 95vh; */
    /* outline: 1px dashed white; */
  }

  /* .button-container {
    flex: 0 0 auto;
    width: auto;
  } */
</style>
