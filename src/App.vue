<template>
  <div id="app">
    <p v-if="audios.length === 0">Drop MP3 file here.</p>

    <VueFullScreenFileDrop @drop="onDrop">
      <div>Some custom content</div>
    </VueFullScreenFileDrop>

    <template v-for="(a, i) in $store.state.items">
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

/* eslint-disable */
export default {
  name: "app",
  components: {
    VueFullScreenFileDrop,
    AudioItem
  },
  data: function() {
    return {
      audios: []
    };
  },
  methods: {
    onDrop(formData, files) {
      Object.keys(files).forEach(x => {
        const file = files[x];
        this.$store.dispatch("readFile", { file });
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
