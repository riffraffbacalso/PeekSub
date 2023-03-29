<script>
  import PauseSvg from "../assets/pause.svg?component";
  import PlaySvg from "../assets/play.svg?component";

  export default {
    components: {
      PauseSvg,
      PlaySvg,
    },
    props: {
      isPaused: Boolean,
      onClick: Function,
    },
  };
</script>

<template>
  <button type="button" @click="onClick">
    <PauseSvg v-show="!isPaused" />
    <PlaySvg v-show="isPaused" />
  </button>
</template>
