<template>
  <div id="app" class="container is-fluid">
    <div class="notification" v-if="Object.keys($store.state.items).length === 0" style="margin:15px;">
      <p>Drop MP3 file here.</p>
    </div>

    <VueFullScreenFileDrop @drop="onDrop">
      <div>Some custom content</div>
    </VueFullScreenFileDrop>

    <div v-if="Object.keys($store.state.items).length > 0">
      <div class="buttons has-addons is-right" style="margin:1em;">
        <span class="button is-small" :class="modeButtonClass('list')" @click="switchMode('list')">リスト</span>
        <span class="button is-small" :class="modeButtonClass('detail')" @click="switchMode('detail')">詳細</span>
      </div>
      <template v-if="mode === 'list'">
        <b-table :data="$store.getters.gListData" :columns="columns"></b-table>
      </template>
      <template v-else-if="mode === 'detail'">
        <template v-for="(a, i) in $store.state.items">
          <div :key="i">
            <audio-item :item="a"></audio-item>
            <hr>
          </div>
        </template>
      </template>
    </div>

    <!-- <a id="download" href="#" download="theFile.mp3" @click="handleDownload">ダウンロード[0]</a> -->
  </div>
</template>

<script>
import VueFullScreenFileDrop from "vue-full-screen-file-drop";
import "vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css";

import audio from "./lib/audio";
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
      mode: "list",
      audios: [],
      columns: audio.columns,
    };
  },
  methods: {
    onDrop(formData, files) {
      Object.keys(files).forEach(x => {
        const file = files[x];
        this.$store.dispatch("readFile", { file });
      });
    },
    switchMode(mode) {
      this.mode = mode;
    },
    modeButtonClass(mode) {
      const bool = this.mode === mode;
      return { "is-primary": bool, "is-selected": bool };
    }
    // handleDownload() {
    //   var file = this.files[0];
    //   var elem = document.getElementById("download");
    //   elem.download = file.name;
    //   elem.href = window.URL.createObjectURL(file);
    // },
  }
};
</script>

<style lang="stylus">
.b-table
  .table thead th
    font-size 0.8rem
</style>
