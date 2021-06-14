export default {
  namespaced: true,

  state: {
    // TODO supprimer name et desciption du fichier .env
    appName: process.env.VUE_APP_NAME,
    appDescription: process.env.VUE_APP_DESCRIPTION,
    currentRoute: localStorage.getItem("currentRoute") || "/PokemonList",
    title: "",
  },

  mutations: {
    UPDATE_TITLE(state, newValue) {
      state.title = newValue;
    },
    UPDATE_CURRENT_ROUTE(state, newValue) {
      localStorage.setItem("currentRoute", newValue);
      state.currentRoute = newValue;
    },
  },

  actions: {
    updateTitle({ commit }, newValue) {
      commit("UPDATE_TITLE", newValue);
    },
    updateCurrentRoute({ commit }, newValue) {
      commit("UPDATE_CURRENT_ROUTE", newValue);
    },
  },
};
