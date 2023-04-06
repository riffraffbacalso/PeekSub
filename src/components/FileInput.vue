<script>
  import { mapWritableState } from "pinia";
  import { useVideoStore } from "../store";

  export default {
    data() {
      return {
        inputEl: null,
        filename: "",
      };
    },
    computed: {
      ...mapWritableState(useVideoStore, ["videoSrc"]),
      labelText() {
        return this.filename === "" ? "Select Video" : this.filename;
      },
    },
    methods: {
      onChange() {
        this.filename = this.inputEl.files[0].name;
        this.videoSrc = URL.createObjectURL(this.inputEl.files[0]);
      },
    },
    mounted() {
      this.isMounted = true;
      this.inputEl = this.$refs.inputEl;
    },
  };
</script>

<template>
  <label>
    {{ labelText }}
    <input ref="inputEl" type="file" accept="video/*" @change="onChange" />
  </label>
</template>
