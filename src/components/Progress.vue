<script>
  export default {
    props: {
      currentTime: { type: Number },
      min: { type: Number },
      max: { type: Number },
    },
    computed: {
      rightStyle() {
        return `--percent-right: ${(
          100 -
          (100 * this.currentTime) / this.max
        ).toFixed(1)}%`;
      },
    },
  };
</script>

<template>
  <div class="progresss" role="progressbar" :style="rightStyle"></div>
</template>
