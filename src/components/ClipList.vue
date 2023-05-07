<script>
  import { mapWritableState } from "pinia";
  import { useSubtitleStore, useVideoStore } from "../store";

  export default {
    data() {
      return {
        clipListEl: null,
        scrollPos: 0,
        content: [],
      };
    },
    computed: {
      ...mapWritableState(useSubtitleStore, ["subtitleFile"]),
      ...mapWritableState(useVideoStore, ["videoFile", "duration"]),
      shadowStyle() {
        return this.scrollPos !== 0 ? "box-shadow: 0px 7px 5px -7px inset" : "";
      },
    },
    methods: {
      onScroll() {
        this.scrollPos = this.clipListEl.scrollTop;
      },
    },
    watch: {
      subtitleFile() {
        let fr = new FileReader();
        fr.onload = () => {
          this.content = fr.result.split("\n");
        };
        fr.readAsText(this.subtitleFile);
      },
    },
    mounted() {
      this.clipListEl = this.$refs.clipListEl;
    },
  };
</script>

<template>
  <ol
    ref="clipListEl"
    class="clip-list"
    :style="shadowStyle"
    @scroll="onScroll"
  >
    <li v-for="line in content">
      {{ line }}
    </li>
  </ol>
</template>

<style>
  .clip-list {
    width: 100%;
    height: 100%;
    padding: 20px;
    margin: 0;
    overflow-y: scroll;
  }

  .clip-list::-webkit-scrollbar {
    width: 10px;
  }

  .clip-list::-webkit-scrollbar-track {
    background: #2c3639;
  }

  .clip-list::-webkit-scrollbar-thumb {
    background: #3f4e4f;
  }

  li {
    all: unset;
  }
</style>
