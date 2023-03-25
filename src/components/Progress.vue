<script>
  export default {
    props: {
      currentTime: { type: Number },
      min: { type: Number },
      max: { type: Number },
    },
    computed: {
      widthStyle() {
        return `width: ${((this.currentTime * 100) / this.max).toFixed(1)}%`;
      },
    },
    mounted() {
      // console.log("p", this.max);
    },
  };
</script>

<template>
  <div class="progress bg-secondary" role="progressbar">
    <div class="progress-bar bg-secondary-subtle" :style="widthStyle"></div>
  </div>
</template>
