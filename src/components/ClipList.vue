<script lang="ts">
  import { defineComponent, ComponentPublicInstance as CPI } from "vue";
  import { mapWritableState } from "pinia";
  import { useSubtitleStore, useVideoStore } from "../store";
  import { parseSrt } from "../util/subtitleParse";
  // import { extractFrames } from "../util/videoFrames";
  // import { toSeconds } from "../util/time";
  import Clip from "./Clip.vue";

  export default defineComponent({
    components: {
      Clip,
    },
    data() {
      return {
        clipListEl: null as CPI<HTMLOListElement> | null,
        isScrolled: false as Boolean,
      };
    },
    computed: {
      ...mapWritableState(useVideoStore, [
        "videoFile",
        "duration",
        "thumbnails",
      ]),
      ...mapWritableState(useSubtitleStore, ["subtitleFile", "srtBlocks"]),
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
      async subtitleFile() {
        if (this.subtitleFile) {
          let fr = new FileReader();
          fr.onload = async () => {
            if (fr.result) {
              let srtContent = (<string>fr.result)
                .replace(/\r/g, "")
                .split("\n");
              this.srtBlocks = parseSrt(srtContent);
            }
            // if (this.videoFile) {
            //   this.thumbnails = await extractFrames(
            //     this.videoFile,
            //     this.srtBlocks
            //       .filter(
            //         (srtBlock) => toSeconds(srtBlock.endTime) <= this.duration
            //       )
            //       .map((srtBlock) => srtBlock.startTime)
            //   );
            // }
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
    <Clip v-for="srtBlock in srtBlocks" :srtBlock="srtBlock">
      {{ srtBlock.subtitles[0] }}
    </Clip>
  </ol>
</template>

<style>
  .clip-list {
    all: unset;
    width: 100%;
    height: 100%;
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
