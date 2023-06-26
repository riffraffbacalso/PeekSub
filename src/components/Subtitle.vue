<script lang="ts">
  import { defineComponent, ComponentPublicInstance as CPI } from "vue";
  import { mapState } from "pinia";
  import { useSubtitleStore } from "../store";
  import { renderSrtFormat } from "../util/subtitleParse";

  export default defineComponent({
    data() {
      return {
        pEl: null as CPI<HTMLParagraphElement> | null,
        isFocused: false as boolean,
      };
    },
    computed: {
      ...mapState(useSubtitleStore, ["srtBlocks", "selectedBlock"]),
      rawSubtitle() {
        return this.srtBlocks[this.selectedBlock!]?.subtitle;
      },
      renderedSubtitle() {
        return renderSrtFormat(
          this.srtBlocks[this.selectedBlock!]?.subtitle || ""
        );
      },
    },
    methods: {
      onFocus() {
        this.isFocused = true;
      },
      onBlur() {
        this.isFocused = false;
      },
      onKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
          this.pEl!.blur();
        }
        // if (e.shiftKey && e.key === "Enter") {
        // e.preventDefault();
        // const selection = window.getSelection();
        // const range = selection!.getRangeAt(0);
        // const newline = document.createTextNode("\n");
        // range.insertNode(newline);
        // range.setStartAfter(newline);
        // range.setEndAfter(newline);
        // selection!.removeAllRanges();
        // selection!.addRange(range);
        // }
        if (!e.shiftKey && e.key === "Enter") {
          e.preventDefault();
          this.srtBlocks[this.selectedBlock!].subtitle = this.pEl!.innerText;
          this.pEl!.blur();
        }
      },
    },
    mounted() {
      this.pEl = this.$refs.pEl as CPI<HTMLParagraphElement>;
    },
  });
</script>

<template>
  <p
    ref="pEl"
    class="subtitle-editor"
    contenteditable="true"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeyDown"
  >
    <span class="subtitle" v-if="isFocused">
      {{ rawSubtitle }}
    </span>
    <span class="subtitle" v-else v-html="renderedSubtitle" />
  </p>
</template>

<style>
  .subtitle-editor {
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

  .subtitle-editor[contenteditable]:focus {
    background-color: rgba(80, 80, 80, 0.25);
    outline: none;
  }

  .subtitle {
    display: block;
    min-width: 20ch;
    min-height: 1lh;
    margin-right: 0.5em;
    margin-left: 0.5em;
    white-space: pre-wrap;
  }
</style>
