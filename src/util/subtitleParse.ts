import { Time } from "./time";

export interface SRTBlock {
  id: number;
  startTime: Time;
  endTime: Time;
  subtitle: string;
}

const numReg = /\d+/g;
const htmlReg = /(<)(?!\/?[bui]|\/font|font color="\w{3,9}")\/?[^>]*(>)/g;

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
  let subtitle = srtLines.slice(2, -1).join("\n");
  let srtBlock: SRTBlock = { id, startTime, endTime, subtitle };
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

export function renderSrtFormat(raw: string) {
  return raw.replace(
    htmlReg,
    (match, ..._) => "&lt" + match.slice(1, -1) + "&gt"
  );
}
