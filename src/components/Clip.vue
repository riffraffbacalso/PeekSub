<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import { mapState, mapWritableState } from "pinia";
  import { useVideoStore, useSubtitleStore } from "../store";
  import { SRTBlock } from "../util/subtitleParse";

  export default defineComponent({
    props: {
      srtBlock: { type: Object as PropType<SRTBlock>, required: true },
    },
    computed: {
      ...mapState(useVideoStore, ["thumbnails"]),
      ...mapWritableState(useSubtitleStore, ["selectedBlock"]),
      selectedStyle() {
        return this.srtBlock.id === this.selectedBlock
          ? "background: #3C5357"
          : "";
      },
      imgSrc() {
        return this.thumbnails[this.srtBlock.id] || "";
      },
    },
    methods: {
      onCheck() {
        this.selectedBlock = this.srtBlock.id;
      },
    },
  });
</script>

<template>
  <li>
    <input class="clip-check" type="checkbox" :id="String(srtBlock.id)" />
    <label
      class="clip"
      :for="String(srtBlock.id)"
      @click="onCheck"
      :style="selectedStyle"
    >
      <img :src="imgSrc" width="128" height="72" v-if="imgSrc" />
      <div class="clip-subtitle-container">
        <!-- <span class="clip-subtitle" v-for="subtitle in srtBlock.subtitles">
          {{ subtitle }}
        </span> -->
        <span class="clip-subtitle">
          {{ srtBlock.subtitle }}
        </span>
      </div>
    </label>
  </li>
</template>

<style>
  .clip {
    all: unset;
    display: flex;
    width: 100%;
    min-height: 10px;
    padding: 5px;
    cursor: pointer;
    outline: 1px solid gray;
  }

  .clip-check {
    display: none;
  }

  .clip-subtitle-container {
    flex-grow: 0;
  }

  .clip-subtitle {
    display: block;
    min-height: 1lh;
    color: lightgray;
    white-space: pre-wrap;
  }
</style>
