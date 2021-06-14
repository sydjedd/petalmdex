import Vue from "vue";
import Vuex from "vuex";

import common from "./modules/common";
import pokemon from "./modules/pokemon";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common,
    pokemon,
  },
  strict: process.env.NODE_ENV !== "production",
});
