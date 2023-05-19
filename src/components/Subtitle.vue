<script lang="ts">
  import { defineComponent } from "vue";
  import { mapState } from "pinia";
  import { useSubtitleStore } from "../store";

  export default defineComponent({
    data() {
      return {
        isFocused: false as boolean,
      };
    },
    computed: {
      ...mapState(useSubtitleStore, ["srtBlocks", "selectedBlock"]),
    },
    methods: {
      onFocus() {
        this.isFocused = true;
      },
      onBlur() {
        this.isFocused = false;
      },
      onInput(e: Event) {
        this.srtBlocks[this.selectedBlock!].subtitles = (<HTMLInputElement>(
          e.target
        )).innerText.split("\n");
      },
    },
  });
</script>

<template>
  <p
    class="subtitles"
    contenteditable="true"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
  >
    <template v-for="subtitle in srtBlocks[selectedBlock!]?.subtitles ?? []">
      <span class="subtitle-line" v-if="isFocused">{{ subtitle }}</span>
      <span class="subtitle-line" v-else v-html="subtitle" />
    </template>
  </p>
</template>

<style>
  .subtitles {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: max-content;
    margin-bottom: 1rem;
    color: white;
    font-size: calc(1.275rem + 0.3vw);
    text-align: center;
    text-shadow: 1px 1px 1px black;
    transform: translateX(-50%);
  }

  .subtitles[contenteditable]:focus {
    background-color: rgba(80, 80, 80, 0.25);
    outline: none;
  }

  .subtitle-line {
    display: block;
    white-space: pre-wrap;
  }
</style>
