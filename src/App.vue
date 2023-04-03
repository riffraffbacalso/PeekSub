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
  <div class="progress-container">
    <Progress />
  </div>
  <div class="controls">
    <div class="play-pause-container">
      <PlayPauseButton />
    </div>
    <div class="play-pause-container">
      <LoopButton />
    </div>
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
  }
</style>
