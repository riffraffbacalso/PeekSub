import { Time } from "./time";

export interface SRTBlock {
  id: number;
  startTime: Time;
  endTime: Time;
  subtitles: string[];
}

const numReg = /\d+/g;

export function parseBlock(srtLines: string[]) {
  let id = +srtLines[0] - 1;
  let matches = [...srtLines[1].matchAll(numReg)];
  let startTime: Time = {
    hour: +matches[0][0],
    minute: +matches[1][0],
    second: +matches[2][0],
    milli: +matches[3][0],
  };
  let endTime: Time = {
    hour: +matches[4][0],
    minute: +matches[5][0],
    second: +matches[6][0],
    milli: +matches[7][0],
  };
  let subtitles = srtLines.slice(2, -1);
  let srtBlock: SRTBlock = { id, startTime, endTime, subtitles };
  return srtBlock;
}

export function parseSrt(srt: string[]) {
  let parsed = [];
  let iStart = 0;
  for (let i = 0; i < srt.length; i++) {
    if (srt[i] === "" && i !== iStart) {
      parsed.push(parseBlock(srt.slice(iStart, i + 1)));
      iStart = i + 1;
    } else {
      continue;
    }
  }
  return parsed;
}
