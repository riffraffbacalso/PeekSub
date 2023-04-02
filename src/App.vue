<script>
  import PlayPauseButton from "./components/PlayPauseButton.vue";
  import Progress from "./components/Progress.vue";
  import Video from "./components/Video.vue";

  export default {
    components: { PlayPauseButton, Progress, Video },
  };
</script>

<template>
  <Video />
  <div class="controls">
    <div class="play-pause-container">
      <PlayPauseButton />
    </div>
    <div class="progress-container">
      <Progress />
    </div>
  </div>
  <div class="clips-container"></div>
</template>
