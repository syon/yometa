import Vue from "vue";
import Vuex from "vuex";
import Debug from "debug";

import audio from "./lib/audio";

Vue.use(Vuex);
const dg = Debug("app:store");

export default new Vuex.Store({
  state: {
    items: {}
  },
  getters: {
    gListData(state) {
      const list = [];
      Object.keys(state.items).forEach(x => {
        const m = state.items[x];
        list.push(audio.makeListable(m));
      });
      return list;
    }
  },
  mutations: {
    addItem(state, payload) {
      dg("mutations::addItem", payload);
      const { info } = payload;
      Vue.set(state.items, info.id, info);
    }
  },
  actions: {
    async readFile({ commit }, payload) {
      dg("actions::readFile", payload);
      const { file } = payload;
      const a = new audio(file);
      const info = await a.extract();
      commit("addItem", { info });
    }
  }
});
