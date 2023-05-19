<script lang="ts">
  import { defineComponent, ComponentPublicInstance as CPI } from "vue";

  export default defineComponent({
    props: {
      fileType: { type: String, required: true },
      acceptStr: { type: String, required: true },
      updateFile: { type: Function, required: true },
    },
    data() {
      return {
        inputEl: null as CPI<HTMLInputElement> | null,
        labelText: `Select ${this.fileType}` as string,
      };
    },
    methods: {
      onChange() {
        if (this.inputEl!.files?.length) {
          this.labelText = this.inputEl!.files[0].name;
          this.updateFile(this.inputEl!.files[0]);
        }
      },
    },
    mounted() {
      this.inputEl = this.$refs.inputEl as CPI<HTMLInputElement>;
    },
  });
</script>

<template>
  <!-- TODO: change from label tag for accesibility -->
  <label>
    {{ labelText }}
    <input ref="inputEl" type="file" :accept="acceptStr" @change="onChange" />
  </label>
</template>

<style>
  input[type="file"] {
    display: none;
  }

  label {
    display: inline-block;
    overflow: hidden;
    width: calc(50% - 45px);
    padding: 5px 15px;
    border-radius: 2px;
    background-color: #3f4e4f;
    color: lightgray;
    cursor: pointer;
    font-size: 0.75rem;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
