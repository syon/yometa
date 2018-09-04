<template>
  <div id="app">
    <p v-if="files.length === 0">Drop MP3 file here.</p>

    <VueFullScreenFileDrop @drop="onDrop">
      <div>Some custom content</div>
    </VueFullScreenFileDrop>

    <template v-for="(a, i) in audios">
      <div :key="i">
        <audio-item :item="a"></audio-item>
        <hr>
      </div>
    </template>

    <!-- <a id="download" href="#" download="theFile.mp3" @click="handleDownload">ダウンロード[0]</a> -->
  </div>
</template>

<script>
import VueFullScreenFileDrop from "vue-full-screen-file-drop";
import "vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css";

import AudioItem from "./components/AudioItem";
import audio from "./lib/audio";

/* eslint-disable */
export default {
  name: "app",
  components: {
    VueFullScreenFileDrop,
    AudioItem
  },
  data: function() {
    return {
      files: [],
      audios: []
    };
  },
  methods: {
    onDrop(formData, files) {
      Object.keys(files).forEach(x => {
        this.files.push(files[x]);
        const a = new audio(files[x]);
        a.extract().then((info) => {
          this.audios.push(info);
        });
      });
    },
    // handleDownload() {
    //   var file = this.files[0];
    //   var elem = document.getElementById("download");
    //   elem.download = file.name;
    //   elem.href = window.URL.createObjectURL(file);
    // },
  }
};
</script>
