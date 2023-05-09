import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export async function extractFrames(file: File, time: number) {
  console.log(file, time);
  const ffmpeg = createFFmpeg({ log: false });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "test.mp4", await fetchFile(file));
  await ffmpeg.run(
    "-ss",
    String(time),
    "-i",
    "test.mp4",
    "-frames:v",
    "1",
    "-vf",
    "scale=128:-1",
    "test.jpg"
  );
  const frameData = ffmpeg.FS("readFile", "test.jpg");
  return URL.createObjectURL(
    new Blob([frameData.buffer], { type: "image/jpg" })
  );
}
