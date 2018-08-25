import debug from "debug";
import jsmediatags from "jsmediatags";
import getMP3Duration from "get-mp3-duration";
import mp3Parser from "mp3-parser";

const dg = debug("audio");

export default class Audio {
  constructor(file) {
    this.file = file;
    this.info = { file: file, ready: false };
  }

  getInfo() {
    return this.info;
  }

  extract() {
    this.reader = new FileReader();
    this.reader.addEventListener("load", this.onFileLoad.bind(this), false);
    this.reader.readAsArrayBuffer(this.file);
  }

  onFileLoad() {
    const self = this;
    const data = self.reader.result;
    // eslint-disable-next-line
    const buf = new Buffer(data);
    this.getMediaTags(buf).then(tag => {
      self.info.ready = true;
      self.info.tag = tag;
      self.info.header = this.getHeader(data);
      self.info.duration = getMP3Duration(buf);
    });
  }

  getMediaTags(buf) {
    return new Promise((rv, rj) => {
      jsmediatags.read(buf, {
        onSuccess: tag => {
          rv(tag); // JSON.stringify(tag, null, 2);
        },
        onError: error => {
          rj(error);
          dg(error.type, error.info);
        }
      });
    });
  }

  getHeader(data) {
    const mp3Tags = mp3Parser.readTags(new DataView(data));
    const obj = mp3Tags.find(x => x.header.samplingRate);
    return obj.header;
  }
}
