import pokemonService from "@/services/pokemon";

export default {
  namespaced: true,

  state: {
    pokemonList: [],
    pokemon: {},
    filter: localStorage.getItem("filter") || "",
    page: Number(localStorage.getItem("page")) || 1,
    limit: Number(localStorage.getItem("limit")) || 1,
  },

  getters: {
    pokemonList(state) {
      return state.pokemonList;
    },
    pokemonListFilter(state) {
      return state.pokemonList.filter(
        (pokemon) =>
          pokemon.id.indexOf(state.filter) !== -1 ||
          pokemon.name.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1
      );
    },
    pokemonListFilterSlice(state) {
      const start = 0 + (state.page - 1) * state.limit;
      const end = start + state.limit;
      return state.pokemonList
        .filter(
          (pokemon) =>
            pokemon.id.indexOf(state.filter) !== -1 ||
            pokemon.name.toLowerCase().indexOf(state.filter.toLowerCase()) !==
              -1
        )
        .slice(start, end);
    },
    pokemon(state) {
      return state.pokemon;
    },
    totalPages(state) {
      return Math.ceil(
        state.pokemonList.filter(
          (pokemon) =>
            pokemon.id.indexOf(state.filter) !== -1 ||
            pokemon.name.toLowerCase().indexOf(state.filter.toLowerCase()) !==
              -1
        ).length / state.limit
      );
    },
  },

  mutations: {
    UPDATE_POKEMON_LIST(state, newValue) {
      state.pokemonList = newValue;
      localStorage.setItem("pokemonList", newValue);
    },
    UPDATE_POKEMON(state, newValue) {
      state.pokemon = newValue;
      localStorage.setItem("pokemon", state.pokemon);
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
      if ((state.page - 1) * state.limit > state.pokemonList.length) {
        state.page = 1;
      }
      state.limit = newValue || 1;
      localStorage.setItem("limit", state.limit);
    },
  },

  actions: {
    async updatePokemonList({ state, commit }) {
      if (!state.pokemonList.length) {
        const data = await pokemonService.getAll();
        if (!data) {
          return false;
        }
        commit("UPDATE_POKEMON_LIST", data);
      }
    },
    async updatePokemon({ commit }, id) {
      const data = await pokemonService.getById(id);
      if (!data) {
        return false;
      }
      commit("UPDATE_POKEMON", data);
    },
    async removePokemon({ commit }) {
      commit("UPDATE_POKEMON", {});
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
