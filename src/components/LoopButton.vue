<script>
  import { mapActions, mapState } from "pinia";
  import { useVideoStore } from "../store";
  import LoopSvg from "../assets/loop.svg?component";

  export default {
    components: { LoopSvg },
    computed: {
      ...mapState(useVideoStore, ["isLoop"]),
      svgStyle() {
        return this.isLoop ? "stroke-width: 2; stroke: white;" : "";
      },
    },
    methods: { ...mapActions(useVideoStore, ["toggleLoop"]) },
  };
</script>

<template>
  <button type="button" @click="toggleLoop">
    <LoopSvg :style="svgStyle" />
  </button>
</template>
