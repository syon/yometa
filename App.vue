<template>
  <div id="app">
    <VueFullScreenFileDrop @drop="onDrop">
      <div>Some custom content</div>
    </VueFullScreenFileDrop>

    <template v-for="(f, i) in audios">
      <div :key="i">
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <td>{{ f.file.name }}</td>
            </tr>
            <tr>
              <th>size</th>
              <td>{{ f.file.size }}</td>
            </tr>
            <tr>
              <th>type</th>
              <td>{{ f.file.type }}</td>
            </tr>
            <tr>
              <th>lastModified</th>
              <td>{{ f.file.lastModified }}</td>
            </tr>
            <tr>
              <th>lastModifiedDate</th>
              <td>{{ f.file.lastModifiedDate }}</td>
            </tr>
          </tbody>
        </table>
        <hr>
      </div>
    </template>

    <a id="download" href="#" download="theFile.mp3" @click="handleDownload">ダウンロード[0]</a>
  </div>
</template>

<script>
import VueFullScreenFileDrop from "vue-full-screen-file-drop";
import "vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css";

import audio from './lib/audio'

/* eslint-disable */
export default {
  name: "app",
  components: {
    VueFullScreenFileDrop
  },
  data: function() {
    return {
      files: [],
      audios: [],
    };
  },
  methods: {
    onDrop(formData, files) {
      console.log(formData); // Can be posted to server
      console.log(files); // Can get access to things like file name and size
      console.log("---------------");
      Object.keys(files).forEach(x => {
        this.files.push(files[x]);
        const a = new audio(files[x]);
        a.extract();
        this.audios.push(a.info);
      });
    },
    handleDownload() {
      var file = this.files[0];
      var elem = document.getElementById("download");
      elem.download = file.name;
      elem.href = window.URL.createObjectURL(file);
    }
  }
};
</script>
