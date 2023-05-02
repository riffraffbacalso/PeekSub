import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => ({
    videoFile: null,
    videoEl: null,
    isLoop: false,
    isPaused: true,
    currentTime: 0,
    duration: 0,
  }),
  getters: {
    videoSrc() {
      return URL.createObjectURL(this.videoFile);
    },
    videoUploaded() {
      return this.videoFile !== null;
    },
  },
  actions: {
    hiddenPause() {
      this.videoEl.pause();
    },
    hiddenPlay() {
      if (!this.isPaused) this.videoEl.play();
    },
    playPause() {
      if (this.videoEl.paused) this.videoEl.play();
      else this.videoEl.pause();
      this.isPaused = !this.isPaused;
    },
    toggleLoop() {
      this.videoEl.loop = !this.videoEl.loop;
      this.isLoop = !this.isLoop;
    },
    seek(time) {
      this.videoEl.currentTime = time;
      this.currentTime = time;
    },
  },
});

export const useSubtitleStore = defineStore("subtitle", {
  state: () => ({
    subtitleFile: null,
  }),
});
