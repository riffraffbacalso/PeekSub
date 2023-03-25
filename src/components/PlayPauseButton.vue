<script>
  import PauseSvg from "../assets/pause.svg?component";
  import PlaySvg from "../assets/play.svg?component";

  export default {
    components: {
      PauseSvg,
      PlaySvg,
    },
    props: {
      paused: Boolean,
      playPause: Function,
    },
  };
</script>

<template>
  <button type="button" @click="playPause">
    <PauseSvg v-show="!paused" />
    <PlaySvg v-show="paused" />
  </button>
</template>
