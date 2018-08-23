<template>
  <div id="app">
    <VueFullScreenFileDrop @drop="onDrop">
      <div>Some custom content</div>
    </VueFullScreenFileDrop>

    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>size</th>
          <th>type</th>
          <th>lastModified</th>
          <th>lastModifiedDate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(f, i) in files" :key="i">
          <td>{{ f.name }}</td>
          <td>{{ f.size }}</td>
          <td>{{ f.type }}</td>
          <td>{{ f.lastModified }}</td>
          <td>{{ f.lastModifiedDate }}</td>
        </tr>
      </tbody>
    </table>

    <a id="download" href="#" download="theFile.mp3" @click="handleDownload">ダウンロード[0]</a>
    <button @click="readFile">readFile</button>
    <hr>
    <pre>{{ output }}</pre>
  </div>
</template>

<script>
import NodeID3 from "node-id3";
import VueFullScreenFileDrop from "vue-full-screen-file-drop";
import "vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css";

/* eslint-disable */
export default {
  name: "app",
  components: {
    VueFullScreenFileDrop
  },
  data: function() {
    return {
      files: [],
      output: "",
    };
  },
  methods: {
    onDrop(formData, files) {
      console.log(formData); // Can be posted to server
      console.log(files); // Can get access to things like file name and size
      console.log("---------------");
      Object.keys(files).forEach(x => {
        this.files.push(files[x]);
      });
    },
    readFile() {
      var file = this.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', () => { this.onFileLoad(reader) }, false);
      reader.readAsArrayBuffer(file);
    },
    onFileLoad(reader) {
      var buf = reader.result;
      const tags = NodeID3.read(new Buffer(buf));
      this.output = JSON.stringify(tags, null, 2);
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
