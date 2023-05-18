import { ComponentPublicInstance as CPI } from "vue";
import { defineStore } from "pinia";
import { SRTBlock } from "./util/subtitleParse";

export const useVideoStore = defineStore("video", {
  state: () => ({
    videoFile: null as File | null,
    videoEl: null as CPI<HTMLVideoElement> | null,
    isLoop: false as boolean,
    isPaused: true as boolean,
    currentTime: 0 as number,
    duration: 0 as number,
    thumbnails: [] as string[],
  }),
  getters: {
    videoSrc(state) {
      if (state.videoFile) {
        return URL.createObjectURL(state.videoFile);
      }
    },
    videoUploaded(state) {
      return state.videoFile !== null;
    },
  },
  actions: {
    hiddenPause() {
      if (this.videoEl) {
        this.videoEl.pause();
      }
    },
    hiddenPlay() {
      if (this.videoEl) {
        if (!this.isPaused) this.videoEl.play();
      }
    },
    playPause() {
      if (this.videoEl) {
        if (this.videoEl.paused) this.videoEl.play();
        else this.videoEl.pause();
        this.isPaused = !this.isPaused;
      }
    },
    toggleLoop() {
      if (this.videoEl) {
        this.videoEl.loop = !this.videoEl.loop;
        this.isLoop = !this.isLoop;
      }
    },
    seek(time: number) {
      if (this.videoEl) {
        this.videoEl.currentTime = time;
        this.currentTime = time;
      }
    },
  },
});

export const useSubtitleStore = defineStore("subtitle", {
  state: () => ({
    subtitleFile: null as File | null,
    srtBlocks: [] as SRTBlock[],
    selectedBlock: null as number | null,
  }),
});
