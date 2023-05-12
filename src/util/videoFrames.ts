import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { toSeconds, Time } from "../util/time";

function writeSelectString(times: Time[]) {
  let selectString = `select='`;
  let timeStrings = times.slice(0, 5).map((time) => {
    let seconds = toSeconds(time) || 0.01;
    return `lt(prev_pts*TB,${seconds})*gte(pts*TB,${seconds})`;
  });
  let addedTimeStrings = timeStrings
    .flatMap((timeString) => ["+", timeString])
    .slice(1);
  addedTimeStrings.forEach((addedTimesString) => {
    selectString += addedTimesString;
  });
  selectString += `',scale=128:-1`;
  return selectString;
}

export async function extractFrames(file: File, times: Time[]) {
  const ffmpeg = createFFmpeg({ log: false });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "video.mp4", await fetchFile(file));
  if (times.length == 1) {
    await ffmpeg.run(
      "-ss",
      String(toSeconds(times[0])),
      "-i",
      "video.mp4",
      "-frames:v",
      "1",
      "-vf",
      "scale=128:-1",
      "frame-1.jpg"
    );
  } else {
    const selectString = writeSelectString(times);
    await ffmpeg.run(
      "-i",
      "video.mp4",
      "-vf",
      selectString,
      "-vsync",
      "drop",
      "frame-%d.jpg"
    );
  }
  console.log(ffmpeg.FS("readdir", "."));
  const files = Array.from({ length: times.length }, (_, i) => i).map((i) =>
    ffmpeg.FS("readFile", `frame-${i + 1}.jpg`)
  );
  ffmpeg.exit();
  return files.map((file) =>
    URL.createObjectURL(new Blob([file.buffer], { type: "image/jpg" }))
  );
}
