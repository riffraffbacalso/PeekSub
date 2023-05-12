export interface Time {
  hour: number;
  minute: number;
  second: number;
  milli: number;
}

export function toSeconds(time: Time) {
  return time.hour * 3600 + time.minute * 60 + time.second + time.milli * 0.001;
}
