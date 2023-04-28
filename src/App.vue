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
  <div class="right-column">
    <header class="file-input-group">
      <FileInput />
    </header>
    <div class="clips-container"></div>
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

  .video-container {
    display: flex;
    width: 70vw;
    height: 80vh;
    position: relative;
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
    display: flex;
    position: relative;
    height: 7px;
    margin-left: 0.75rem;
    margin-right: 0.75rem;
    cursor: pointer;

    grid-column: 1;
    grid-row: 3;

    /* outline: 1px dashed red; */
  }

  .right-column {
    grid-column: 2;
    grid-row: 1 / 4;
    width: 30vw;
    background-color: #2c3639;
  }

  .file-input-group {
    height: 5vh;
    box-shadow: 5px 0px 5px;
    display: flex;
    align-items: center;
  }

  .clips-container {
    height: 95vh;
    /* outline: 1px dashed white; */
  }

  /* .button-container {
    flex: 0 0 auto;
    width: auto;
  } */
</style>
