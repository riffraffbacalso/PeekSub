<script>
  import PlayPauseButton from "./PlayPauseButton.vue";

  export default {
    components: {
      PlayPauseButton,
    },
    data() {
      return {
        vid: null,
        paused: null,
      };
    },
    methods: {
      playPause() {
        if (this.vid.paused) this.vid.play();
        else this.vid.pause();
        this.paused = !this.paused;
      },
    },
    mounted() {
      this.vid = this.$refs.vid;
      this.paused = this.vid.paused;
    },
  };
</script>

<template>
  <div class="container-fluid w-50 h-50">
    <div class="container-fluid d-flex position-relative w-100 h-100 pb-2 px-0">
      <video ref="vid" class="object-fit-md-contain w-100 h-100" loop muted>
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
    <PlayPauseButton :paused="paused" :playPause="playPause" />
  </div>
</template>
