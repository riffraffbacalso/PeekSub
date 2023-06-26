import { ComponentPublicInstance as CPI } from "vue";
import { defineStore } from "pinia";
import { SRTBlock, renderSrtFormat } from "./util/subtitleParse";

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
      return URL.createObjectURL(state.videoFile!);
    },
    videoUploaded(state) {
      return state.videoFile !== null;
    },
  },
  actions: {
    hiddenPause() {
      this.videoEl!.pause();
    },
    hiddenPlay() {
      if (!this.isPaused) this.videoEl!.play();
    },
    playPause() {
      if (this.videoEl!.paused) this.videoEl!.play();
      else this.videoEl!.pause();
      this.isPaused = !this.isPaused;
    },
    toggleLoop() {
      this.videoEl!.loop = !this.videoEl!.loop;
      this.isLoop = !this.isLoop;
    },
    seek(time: number) {
      this.videoEl!.currentTime = time;
      this.currentTime = time;
    },
  },
});

export const useSubtitleStore = defineStore("subtitle", {
  state: () => ({
    subtitleFile: null as File | null,
    srtBlocks: [] as SRTBlock[],
    selectedBlock: null as number | null,
  }),
  getters: {
    rawSubtitle(state) {
      return state.srtBlocks[state.selectedBlock!]?.subtitle || "";
    },
    renderedSubtitle(): string {
      return renderSrtFormat(this.rawSubtitle);
    },
  },
});
