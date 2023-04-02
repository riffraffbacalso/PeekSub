<script>
  import { mapActions, mapWritableState } from "pinia";
  import { useVideoStore } from "../store";
  import PauseSvg from "../assets/pause.svg?component";
  import PlaySvg from "../assets/play.svg?component";

  export default {
    components: {
      PauseSvg,
      PlaySvg,
    },
    computed: {
      ...mapWritableState(useVideoStore, ["isPaused"]),
    },
    methods: {
      ...mapActions(useVideoStore, ["playPause"]),
    },
  };
</script>

<template>
  <button type="button" @click="playPause">
    <PauseSvg v-show="!isPaused" />
    <PlaySvg v-show="isPaused" />
  </button>
</template>
