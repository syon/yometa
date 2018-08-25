<template>
  <div id="app">
    <VueFullScreenFileDrop @drop="onDrop">
      <div>Some custom content</div>
    </VueFullScreenFileDrop>

    <template v-for="(a, i) in audios">
      <div :key="i">
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <td>{{ a.file.name }}</td>
            </tr>
            <tr>
              <th>size</th>
              <td>{{ a.file.size }}</td>
            </tr>
            <tr>
              <th>type</th>
              <td>{{ a.file.type }}</td>
            </tr>
            <tr>
              <th>lastModified</th>
              <td>{{ a.file.lastModified }}</td>
            </tr>
            <tr>
              <th>lastModifiedDate</th>
              <td>{{ a.file.lastModifiedDate }}</td>
            </tr>
            <tr>
              <th>duration</th>
              <td>{{ a.duration }}</td>
            </tr>
            <template v-if="a.header">
              <tr>
                <th>bitrate</th>
                <td>{{ a.header.bitrate }}</td>
              </tr>
              <tr>
                <th>samplingRate</th>
                <td>{{ a.header.samplingRate }}</td>
              </tr>
              <tr>
                <th>channelMode</th>
                <td>{{ a.header.channelMode }}</td>
              </tr>
              <tr>
                <th>mpegAudioVersion</th>
                <td>{{ a.header.mpegAudioVersion }}</td>
              </tr>
              <tr>
                <th>layerDescription</th>
                <td>{{ a.header.layerDescription }}</td>
              </tr>
            </template>
            <template v-if="a.tag">
              <tr>
                <th>type</th>
                <td>{{ a.tag.type }}</td>
              </tr>
              <tr>
                <th>version</th>
                <td>{{ a.tag.version }}</td>
              </tr>
              <tr>
                <th>title</th>
                <td>{{ a.tag.tags.title }}</td>
              </tr>
              <tr>
                <th>album</th>
                <td>{{ a.tag.tags.album }}</td>
              </tr>
              <tr>
                <th>genre</th>
                <td>{{ a.tag.tags.genre }}</td>
              </tr>
              <tr>
                <th>artist</th>
                <td>{{ a.tag.tags.artist }}</td>
              </tr>
              <tr>
                <th>track</th>
                <td>{{ a.tag.tags.track }}</td>
              </tr>
              <tr>
                <th>TPOS</th>
                <td>
                  <span v-if="a.tag.tags.TPOS">{{ a.tag.tags.TPOS.data }}</span>
                </td>
              </tr>
              <tr>
                <th>TPE2</th>
                <td>
                  <span v-if="a.tag.tags.TPE2">{{ a.tag.tags.TPE2.data }}</span>
                </td>
              </tr>
              <tr>
                <th>TDRC</th>
                <td>
                  <span v-if="a.tag.tags.TDRC">{{ a.tag.tags.TDRC.data }}</span>
                </td>
              </tr>
              <tr>
                <th>TCOM</th>
                <td>
                  <span v-if="a.tag.tags.TCOM">{{ a.tag.tags.TCOM.data }}</span>
                </td>
              </tr>
              <tr>
                <th>TBPM</th>
                <td>
                  <span v-if="a.tag.tags.TBPM">{{ a.tag.tags.TBPM.data }}</span>
                </td>
              </tr>
              <tr>
                <th>GRP1</th>
                <td>
                  <span v-if="a.tag.tags.GRP1">{{ a.tag.tags.GRP1.data }}</span>
                </td>
              </tr>
              <tr>
                <th>TSSE</th>
                <td>
                  <span v-if="a.tag.tags.TSSE">{{ a.tag.tags.TSSE.data }}</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <hr>
      </div>
    </template>

    <a id="download" href="#" download="theFile.mp3" @click="handleDownload">ダウンロード[0]</a>
    <button @click="show">show</button>
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
      Object.keys(files).forEach(x => {
        this.files.push(files[x]);
        const a = new audio(files[x]);
        a.extract();
        this.audios.push(a.info);
      });
    },
    show() {
      this.audios = this.audios.filter(a => a.ready);
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
