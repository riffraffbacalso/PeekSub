<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { mapState } from "pinia";
  import { useVideoStore } from "../store";
  import { SRTBlock } from "../util/subtitleParse";

  export default defineComponent({
    props: {
      srtBlock: { type: Object as PropType<SRTBlock>, required: true },
    },
    computed: {
      ...mapState(useVideoStore, ["thumbnails"]),
      imgSrc() {
        return this.thumbnails[this.srtBlock.id - 1] || "";
      },
    },
  });
</script>

<template>
  <li>
    <div class="clip">
      <img :src="imgSrc" width="128" height="72" v-if="imgSrc" />
      <div class="clip-subtitle-container">
        <span class="clip-subtitle" v-for="subtitle in srtBlock.subtitles">
          {{ subtitle }}
        </span>
      </div>
    </div>
  </li>
</template>

<style>
  .clip {
    display: flex;
    min-height: 10px;
    padding: 5px;
    outline: 1px solid gray;
  }

  .clip-subtitle-container {
    flex-grow: 0;
  }

  .clip-subtitle {
    display: inline-block;
    color: lightgray;
    white-space: pre-wrap;
  }
</style>
