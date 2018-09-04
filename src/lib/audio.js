import debug from "debug";
import jsmediatags from "jsmediatags";
import getMP3Duration from "get-mp3-duration";
import mp3Parser from "mp3-parser";

const dg = debug("audio");

export default class Audio {
  constructor(fileBuffer) {
    this.fileBuffer = fileBuffer;
    const file = this.makeFileMeta(fileBuffer);
    this.info = { file: file, ready: false };
  }

  makeFileMeta(fileBuffer) {
    const { name, size, type, lastModified, lastModifiedDate } = fileBuffer;
    const file = { name, size, type, lastModified, lastModifiedDate };
    return file;
  }

  getInfo() {
    return this.info;
  }

  extract() {
    return new Promise(rv => {
      this.reader = new FileReader();
      this.reader.addEventListener(
        "load",
        this.onFileLoad.bind(this, rv),
        false
      );
      this.reader.readAsArrayBuffer(this.fileBuffer);
    });
  }

  onFileLoad(rv) {
    const self = this;
    const data = self.reader.result;
    // eslint-disable-next-line
    const buf = new Buffer(data);
    this.getMediaTags(buf).then(tag => {
      self.info.ready = true;
      self.info.tag = tag;
      self.info.header = this.getHeader(data);
      self.info.duration = getMP3Duration(buf);
      rv(self.info);
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
