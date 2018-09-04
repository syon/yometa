<template>
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
          <th>artwork</th>
          <td>
            <img :src="getImageUrl(a)">
            <span>{{ getImageFormat(a) }}</span>
          </td>
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
        <tr>
          <th>JSON</th>
          <td>
            <pre style="height:100px;overflow:auto;">{{ JSON.stringify(a, null, 2) }}</pre>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["item"],
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
