<script>
  export default {
    props: {
      fileType: { type: String, required: true },
      acceptStr: { type: String, required: true },
      updateFile: { type: Function, required: true },
    },
    data() {
      return {
        inputEl: null,
        labelText: `Select ${this.fileType}`,
        testImg: null,
      };
    },
    methods: {
      onChange() {
        this.labelText = this.inputEl.files[0].name;
        this.updateFile(this.inputEl.files[0]);
      },
    },
    mounted() {
      this.inputEl = this.$refs.inputEl;
    },
  };
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
