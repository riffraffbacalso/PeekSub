<script>
  import { mapWritableState } from "pinia";
  import { useVideoStore } from "../store";
  import { extractFrames } from "../util/videoFrames";

  export default {
    data() {
      return {
        inputEl: null,
        filename: "",
        testImg: null,
      };
    },
    computed: {
      ...mapWritableState(useVideoStore, ["videoSrc"]),
      labelText() {
        return this.filename === "" ? "Select Video" : this.filename;
      },
    },
    methods: {
      async onChange() {
        this.filename = this.inputEl.files[0].name;
        this.videoSrc = URL.createObjectURL(this.inputEl.files[0]);

        this.testImg = await extractFrames(this.videoSrc, "00:00:10");
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
  <img :src="testImg" width="128" height="72" v-show="testImg" />
</template>

<style>
  input[type="file"] {
    display: none;
  }

  label {
    display: inline-block;
    padding: 5px 15px;
    border-radius: 2px;
    margin: 10px;
    background-color: #3f4e4f;
    color: lightgray;
    cursor: pointer;
    font-size: 0.75rem;
  }
</style>
