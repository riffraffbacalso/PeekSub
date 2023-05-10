<script lang="ts">
  import { defineComponent, ComponentPublicInstance as CPI } from "vue";
  import { mapWritableState } from "pinia";
  import { useSubtitleStore, useVideoStore } from "../store";
  import { parseSrt, SRTBlock } from "../util/subtitleParse";
  import Clip from "./Clip.vue";

  export default defineComponent({
    components: {
      Clip,
    },
    data() {
      return {
        clipListEl: null as CPI<HTMLOListElement> | null,
        isScrolled: false as Boolean,
        srtBlocks: [] as SRTBlock[],
      };
    },
    computed: {
      ...mapWritableState(useSubtitleStore, ["subtitleFile"]),
      ...mapWritableState(useVideoStore, ["videoFile", "duration"]),
      shadowStyle() {
        return this.isScrolled ? "box-shadow: 0px 7px 5px -7px inset" : "";
      },
    },
    methods: {
      onScroll() {
        if (this.clipListEl) {
          this.isScrolled = this.clipListEl.scrollTop !== 0;
        }
      },
    },
    watch: {
      subtitleFile() {
        if (this.subtitleFile) {
          let fr = new FileReader();
          fr.onload = () => {
            if (fr.result) {
              let srtContent = (<string>fr.result).split("\r\n");
              this.srtBlocks = parseSrt(srtContent);
            }
          };
          fr.readAsText(this.subtitleFile);
        }
      },
    },
    mounted() {
      this.clipListEl = this.$refs.clipListEl as CPI<HTMLOListElement>;
    },
  });
</script>

<template>
  <ol
    ref="clipListEl"
    class="clip-list"
    :style="shadowStyle"
    @scroll="onScroll"
  >
    <Clip v-for="srtBlock in srtBlocks" :subtitle="srtBlock.subtitles[0]">
      {{ srtBlock.subtitles[0] }}
    </Clip>
  </ol>
</template>

<style>
  .clip-list {
    all: unset;
    width: 100%;
    height: calc(100% - 40px);
    padding: 20px;
    margin: 0;
    overflow-x: hidden;
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
