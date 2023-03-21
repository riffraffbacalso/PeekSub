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
        paused: null,
        currentTime: null,
        duration: null,
      };
    },
    methods: {
      onLoad() {
        this.duration = +this.vid.duration.toFixed(1);
      },
      onUpdate() {
        requestAnimationFrame(
          () => (this.currentTime = +this.vid.currentTime.toFixed(1))
        );
      },
      onEnd() {
        this.paused = true;
      },
      playPause() {
        if (this.vid.paused) this.vid.play();
        else this.vid.pause();
        this.paused = !this.paused;
      },
    },
    mounted() {
      this.vid = this.$refs.vid;
      this.paused = this.vid.paused;
      this.currentTime = this.vid.currentTime;
    },
  };
</script>

<template>
  <div class="container-fluid w-50 h-50">
    <div class="container-fluid d-flex position-relative w-100 h-100 pb-2 px-0">
      <video
        ref="vid"
        class="object-fit-md-contain w-100 h-100"
        @loadedmetadata="onLoad"
        @timeupdate="onUpdate"
        @ended="onEnd"
      >
        <source src="../assets/rocks.mp4" type="video/mp4" />
      </video>
      <p
        :class="[
          'position-absolute',
          'bottom-0',
          'start-50',
          'translate-middle-x',
          'text-center',
          'fs-4',
          'text-light',
        ]"
      >
        It's interesting, the ghosts
      </p>
    </div>
    <div class="row mx-0">
      <div class="col-sm-auto px-0">
        <PlayPauseButton :paused="paused" :playPause="playPause" />
      </div>
      <div class="col align-self-center px-0 mx-1">
        <Progress :value="currentTime" :min="0" :max="duration" label="" />
      </div>
    </div>
  </div>
</template>
