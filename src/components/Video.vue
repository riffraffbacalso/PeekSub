<script>
  import PlayPauseButton from "./PlayPauseButton.vue";
  import Progress from "./Progress.vue";

  export default {
    components: {
      PlayPauseButton,
      Progress,
    },
    data() {
      return {
        vid: null,
        isPaused: null,
        currentTime: null,
        duration: null,
      };
    },
    methods: {
      onLoad() {
        this.duration = +this.vid.duration.toFixed(1);
        this.currentTime = +this.vid.currentTime.toFixed(1);
      },
      onUpdate() {
        this.currentTime = +this.vid.currentTime.toFixed(1);
      },
      onEnd() {
        this.isPaused = true;
        this.currentTime = 0;
      },
      playPause() {
        if (this.vid.paused) this.vid.play();
        else this.vid.pause();
        this.isPaused = !this.isPaused;
      },
    },
    mounted() {
      this.vid = this.$refs.vid;
      this.isPaused = this.vid.paused;
      this.currentTime = this.vid.currentTime;
    },
  };
</script>

<template>
  <div class="app-container">
    <div class="video-container">
      <video
        ref="vid"
        class="video"
        @loadedmetadata="onLoad"
        @timeupdate="onUpdate"
        @ended="onEnd"
      >
        <source src="../assets/rocks.mp4" type="video/mp4" />
      </video>
      <p class="subtitles" contenteditable="true">
        It's interesting, the ghosts
      </p>
    </div>
    <div class="controls">
      <div class="play-pause-container">
        <PlayPauseButton :isPaused="isPaused" :onClick="playPause" />
      </div>
      <div class="progress-container">
        <Progress
          :currentTime="currentTime"
          :min="0"
          :max="duration"
          label=""
        />
      </div>
    </div>
  </div>
</template>
