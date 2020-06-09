export function pad(value, upto, replaceWith) {
  replaceWith = replaceWith || '0';
  return String(value).padStart(upto, replaceWith);
}
export class Timer {
  id = NaN;
  hr = 0;
  minute = 0;
  sec = 0;
  constructor(time) {
    this.time = time;
  }
  calcTime() {
    const mili = new Date() - new Date(this.time);
    const secs = mili / 1000;
    this.hr = Math.max(0, Math.trunc(secs / 3600));
    this.minute = Math.max(0, Math.trunc((secs - (this.hr * 3600)) / 60));
    this.sec = Math.max(0, Math.trunc(secs - ((this.hr * 3600) + (this.minute * 60))));
  }
  start(callback) {
    this.calcTime();

    Promise.resolve().then(() => {
      this.id = setInterval(() => {
        this.calcTime();
        if (callback instanceof Function) { callback(this.hr, this.minute, this.sec); }
      }, 1000);
    });
  }
  stop() {
    clearInterval(this.id);
  }
  toString() {
    return `${this.hr}:${this.minute}:${this.sec}`;
  }
}
export function getNow() {
  const date = new Date();
  const dateTimeStr = `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}T${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}`;
  return dateTimeStr;
}