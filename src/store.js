import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => ({
    videoEl: null,
    isLoop: false,
    isPaused: true,
    currentTime: null,
    duration: null,
  }),
  actions: {
    playPause() {
      if (this.videoEl.paused) this.videoEl.play();
      else this.videoEl.pause();
      this.isPaused = !this.isPaused;
    },
    toggleLoop() {
      this.videoEl.loop = !this.videoEl.loop
      this.isLoop = !this.isLoop;
    },
    seek(time) {
      this.videoEl.currentTime = time;
      this.currentTime = time;
    },
  },
});
