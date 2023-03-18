<script>
  import * as pauseSvg from "../assets/pause.svg";
  import * as playSvg from "../assets/play.svg";

  export default {
    data() {
      return {
        vid: { type: Element },
        paused: { type: Boolean },
        pauseSvg,
        playSvg,
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
  <div class="container-fluid w-75 h-75">
    <div class="container-fluid d-flex position-relative w-100 h-100 pb-2 px-0">
      <video
        ref="vid"
        class="object-fit-md-contain w-100 h-100"
        loop
        muted
        @loadeddata.once="playPause"
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
    <button type="button" @click="playPause">
      <svg viewBox="0 0 24 24">
        <use
          :xlink:href="`${
            this.paused ? playSvg.default : pauseSvg.default
          }#playPause`"
        />
      </svg>
    </button>
  </div>
</template>
