<script>
  export default {
    data() {
      return {
        paused: { type: Boolean },
      };
    },
    methods: {
      playPause() {
        this.paused != this.paused;
      },
    },
    mounted() {
      let vid = this.$refs.vid;
      console.log("video.paused:", vid.paused);
      console.log(vid);
    },
  };
</script>

<template>
  <div class="container-fluid position-relative">
    <video
      ref="vid"
      class="object-fit-md-contain border w-100 h-100"
      width="1280"
      height="720"
      autoplay
      loop
      muted
    >
      <source src="../assets/rocks.mp4" type="video/mp4" />
    </video>
    <p
      :class="[
        'position-absolute',
        'bottom-0',
        'start-50',
        'translate-middle-x',
        'text-center',
        'fs-4',
        'text-light',
      ]"
    >
      It's interesting, the ghosts
    </p>
  </div>
</template>
