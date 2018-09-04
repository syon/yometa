<template>
  <div class="audio">
    <div class="audio-left">
      <img :src="getImageUrl(a)">
      <span>{{ getImageFormat(a) }}</span>
      <pre style="height:100px;overflow:auto;">{{ JSON.stringify(a, null, 2) }}</pre>
    </div>
    <div class="audio-right">
      <div class="audio-meta">
        <section>
          <div class="cellgroup">
            <attr-cell label="name" :val="a.file.name"></attr-cell>
            <attr-cell label="size" :val="a.file.size"></attr-cell>
            <attr-cell label="type" :val="a.file.type"></attr-cell>
            <attr-cell label="lastModified" :val="a.file.lastModified"></attr-cell>
            <attr-cell label="lastModifiedDate" :val="a.file.lastModifiedDate"></attr-cell>
          </div>
        </section>
        <section>
          <div class="cellgroup">
            <attr-cell label="duration" :val="a.duration"></attr-cell>
            <template v-if="a.header">
              <attr-cell label="bitrate" :val="a.header.bitrate"></attr-cell>
              <attr-cell label="samplingRate" :val="a.header.samplingRate"></attr-cell>
              <attr-cell label="channelMode" :val="a.header.channelMode"></attr-cell>
              <attr-cell label="mpegAudioVersion" :val="a.header.mpegAudioVersion"></attr-cell>
              <attr-cell label="layerDescription" :val="a.header.layerDescription"></attr-cell>
            </template>
          </div>
        </section>
      </div>
      <div class="audio-tags">
        <div class="cellgroup">
          <template v-if="a.tag">
            <attr-cell label="type" :val="a.tag.type"></attr-cell>
            <attr-cell label="version" :val="a.tag.version"></attr-cell>
            <attr-cell label="title" :val="a.tag.tags.title"></attr-cell>
            <attr-cell label="album" :val="a.tag.tags.album"></attr-cell>
            <attr-cell label="genre" :val="a.tag.tags.genre"></attr-cell>
            <attr-cell label="artist" :val="a.tag.tags.artist"></attr-cell>
            <attr-cell label="track" :val="a.tag.tags.track"></attr-cell>
            <attr-cell label="TPOS" :val="a.tag.tags.TPOS.data" v-if="a.tag.tags.TPOS"></attr-cell>
            <attr-cell label="TPE2" :val="a.tag.tags.TPE2.data" v-if="a.tag.tags.TPE2"></attr-cell>
            <attr-cell label="TDRC" :val="a.tag.tags.TDRC.data" v-if="a.tag.tags.TDRC"></attr-cell>
            <attr-cell label="TCOM" :val="a.tag.tags.TCOM.data" v-if="a.tag.tags.TCOM"></attr-cell>
            <attr-cell label="TBPM" :val="a.tag.tags.TBPM.data" v-if="a.tag.tags.TBPM"></attr-cell>
            <attr-cell label="GRP1" :val="a.tag.tags.GRP1.data" v-if="a.tag.tags.GRP1"></attr-cell>
            <attr-cell label="TSSE" :val="a.tag.tags.TSSE.data" v-if="a.tag.tags.TSSE"></attr-cell>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AttrCell from "./AttrCell"

export default {
  props: ["item"],
  components: {
    AttrCell,
  },
  computed: {
    a() {
      return this.item;
    }
  },
  methods: {
    getImageUrl(item) {
      if (!(item && item.tag.tags.APIC)) return null;
      const apic = item.tag.tags.APIC;
      var bytes = new Uint8Array(apic.data.data);
      var binaryData = "";
      for (var i = 0, len = bytes.byteLength; i < len; i++) {
        binaryData += String.fromCharCode(bytes[i]);
      }
      return `data:${apic.data.format};base64,${window.btoa(binaryData)}`;
    },
    getImageFormat(item) {
      if (!(item && item.tag.tags.APIC)) return null;
      return item.tag.tags.APIC.data.format;
    }
  }
};
</script>

<style>
.audio {
  display: flex;
}
.audio-left {
  width: 250px;
}
.audio-right {
  flex: 1;
  display: flex;
}
.cellgroup {
  display: flex;
  flex-direction: column;
}
.attrcell {
  display: flex;
}
.attrcell .cell-label {
  width: 150px;
  font-size: 14px;
  text-align: right;
}
.attrcell .cell-val {
  max-width: 300px;
  font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace;
}
</style>
