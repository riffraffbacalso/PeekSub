<script>
  import LoopButton from "./components/LoopButton.vue";
  import PlayPauseButton from "./components/PlayPauseButton.vue";
  import Progress from "./components/Progress.vue";
  import Video from "./components/Video.vue";

  export default {
    components: { LoopButton, PlayPauseButton, Progress, Video },
  };
</script>

<template>
  <Video />
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
  <div class="clips-container"></div>
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
