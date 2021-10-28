import pokemonService from "@/services/pokemon";

export default {
  namespaced: true,

  state: {
    // TODO Tableau pokemon trop gros pour le localstorage
    //pokemon: JSON.parse(localStorage.getItem("pokemon") || "[]"),
    pokemon: [],
    pokemonCurrent: localStorage.getItem("pokemonCurrent") || null,
    // TODO Sortir le loading du store, rien à faire ici
    pokemonLoading: false,
    filter: localStorage.getItem("filter") || "",
    page: Number(localStorage.getItem("page")) || 1,
    limit: Number(localStorage.getItem("limit")) || 1,
  },

  getters: {
    pokemon(state) {
      return state.pokemon;
    },
    // TODO Garder les filtres dans le store ou alors dans le commposant?
    pokemonFilter(state) {
      return state.pokemon.filter(
        (element) =>
          element.id.indexOf(state.filter) !== -1 ||
          element.name.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1
      );
    },
    pokemonFilterSlice(state) {
      const start = 0 + (state.page - 1) * state.limit;
      const end = start + state.limit;
      return state.pokemon
        .filter(
          (element) =>
            element.id.indexOf(state.filter) !== -1 ||
            element.name.toLowerCase().indexOf(state.filter.toLowerCase()) !==
              -1
        )
        .slice(start, end);
    },
    pokemonDetail(state) {
      return state.pokemon[state.pokemonCurrent].detail;
    },
    pokemonLoading(state) {
      return state.pokemonLoading;
    },
    totalPages(state) {
      return Math.ceil(
        state.pokemon.filter(
          (element) =>
            element.id.indexOf(state.filter) !== -1 ||
            element.name.toLowerCase().indexOf(state.filter.toLowerCase()) !==
              -1
        ).length / state.limit
      );
    },
  },

  mutations: {
    UPDATE_POKEMON(state, newValue) {
      state.pokemon = newValue;
      // TODO Tableau pokemon trop gros pour le localstorage
      //localStorage.setItem("pokemon", JSON.stringify(state.pokemon));
      // TODO Mise en cache des details des pokemons visible sur la page? ou pas?
    },
    UPDATE_POKEMON_CURRENT(state, newValue) {
      state.pokemonCurrent = Number(newValue) || null;
      localStorage.setItem("pokemonCurrent", state.pokemonCurrent);
    },
    UPDATE_POKEMON_DETAIL(state, newValue) {
      state.pokemon[newValue.id].detail = newValue;
      // TODO Tableau pokemon trop gros pour le localstorage
      //localStorage.setItem("pokemon", JSON.stringify(state.pokemon));
    },
    SET_POKEMON_LOADING(state, newValue) {
      state.pokemonLoading = newValue || false;
    },
    SET_FILTER(state, newValue) {
      state.page = 1;
      state.filter = newValue || "";
      localStorage.setItem("filter", state.filter);
    },
    SET_PAGE(state, newValue) {
      state.page = newValue || 1;
      localStorage.setItem("page", state.page);
    },
    SET_LIMIT(state, newValue) {
      if ((state.page - 1) * state.limit > state.pokemon.length) {
        state.page = 1;
      }
      state.limit = newValue || 1;
      localStorage.setItem("limit", state.limit);
    },
  },

  actions: {
    async updatePokemon({ state, commit }) {
      if (!state.pokemon.length) {
        const data = await pokemonService.getAll();
        if (!data) {
          return false;
        }
        commit("UPDATE_POKEMON", data);
      }
    },
    async updatePokemonDetail({ state, commit, dispatch }, id) {
      dispatch("pokemon/setPokemonLoading", true);
      await commit("UPDATE_POKEMON_CURRENT", id);
      if (!Object.keys(state.pokemon[id].detail).length) {
        const data = await pokemonService.getById(id);
        if (!data) {
          return false;
        }
        commit("UPDATE_POKEMON_DETAIL", data);
      }
      dispatch("pokemon/setPokemonLoading", false);
    },
    async setPokemonLoading({ commit }, newValue) {
      commit("SET_POKEMON_LOADING", newValue);
    },
    async setFilter({ commit }, newValue) {
      commit("SET_FILTER", newValue);
    },
    async setPage({ commit }, newValue) {
      commit("SET_PAGE", newValue);
    },
    async setLimit({ commit }, newValue) {
      commit("SET_LIMIT", newValue);
    },
  },
};
