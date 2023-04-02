import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => ({
    vidEl: null,
    isPaused: null,
    currentTime: null,
    duration: null,
  }),
  actions: {
    playPause() {
      if (this.videoEl.paused) this.videoEl.play();
      else this.videoEl.pause();
      this.isPaused = !this.isPaused;
    },
    seek(time) {
      this.videoEl.currentTime = time;
      this.currentTime = time;
    },
  },
});
