<script>
  import pauseSvg from "../assets/pause.svg?raw";
  import playSvg from "../assets/play.svg?raw";

  export default {
    props: {
      paused: Boolean,
      playPause: Function,
    },
    data() {
      return {
        pauseSvg,
        playSvg,
      };
    },
    computed: {
      playPauseSvg() {
        return this.paused ? playSvg : pauseSvg;
      },
    },
  };
</script>

<template>
  <button type="button" @click="playPause" v-html="playPauseSvg" />
</template>
