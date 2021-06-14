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
    SET_TITLE(state, newValue) {
      state.title = newValue;
    },
    SET_CURRENT_ROUTE(state, newValue) {
      localStorage.setItem("currentRoute", newValue);
      state.currentRoute = newValue;
    },
  },

  actions: {
    setTitle({ commit }, newValue) {
      commit("SET_TITLE", newValue);
    },
    setCurrentRoute({ commit }, newValue) {
      commit("SET_CURRENT_ROUTE", newValue);
    },
  },
};
