<template>
  <div ref="div">
    <v-toolbar flat color="transparent">
      <v-text-field
        v-model="filter"
        append-icon="mdi-magnify"
        label="Pikachu, 25..."
        single-line
        hide-details
        clearable
      ></v-text-field>

      <v-spacer></v-spacer>

      <div class="text-center">
        <span>
          {{ (page - 1) * limit + 1 }} à
          {{
            page * limit > pokemonListFilter.length
              ? pokemonListFilter.length
              : page * limit
          }}
          sur {{ pokemonListFilter.length }} Pokémons
        </span>

        <br />

        <span v-if="pokemonListFilter.length < pokemonList.length">
          filtrés sur {{ pokemonList.length }}
        </span>
      </div>

      <v-spacer></v-spacer>

      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="7"
      ></v-pagination>
    </v-toolbar>

    <v-progress-linear
      v-if="pokemonList.length <= 0"
      indeterminate
      rounded
      height="4"
      class="mt-2"
    ></v-progress-linear>

    <v-alert
      v-if="pokemonListFilterSlice.length <= 0 && pokemonList.length > 0"
      dense
      border="left"
      type="info"
      class="mt-2"
    >
      Aucun Pokémon n'a été trouvé...
    </v-alert>

    <v-row
      v-if="totalPages > 0"
      v-resize="onResize"
      no-gutters
      align="center"
      justify="center"
    >
      <v-col v-for="pokemon in pokemonListFilterSlice" :key="pokemon.id">
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 24 : 2"
            class="ma-2 pa-2"
            height="170"
            width="160"
            @click.stop="pokemonDetail(pokemon.id)"
          >
            <v-fade-transition>
              <v-overlay v-if="hover" absolute></v-overlay>
            </v-fade-transition>

            <span class="d-block text-overline text-center">
              #{{ pokemon.id }}
            </span>

            <PokemonImage :id="pokemon.id" size="96" />

            <span
              class="d-block text-overline text-center text-truncate"
              :title="pokemon.name"
            >
              {{ pokemon.name }}
            </span>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PokemonImage from "@/components/pokemon/PokemonImage";
import { mapGetters } from "vuex";

export default {
  name: "PokemonList",

  components: {
    PokemonImage,
  },

  computed: {
    // TODO Importer les filtres du store ou alors ici?
    ...mapGetters("pokemon", [
      "pokemonList",
      "pokemonListFilter",
      "pokemonListFilterSlice",
      "totalPages",
    ]),
    /* eslint-disable */
    filter: {
      get() { return this.$store.state.pokemon.filter; },
      set(newValue) { return this.$store.dispatch("pokemon/setFilter", newValue); },
    },
    page: {
      get() { return this.$store.state.pokemon.page; },
      set(newValue) { return this.$store.dispatch("pokemon/setPage", newValue); },
    },
    limit: {
      get() { return this.$store.state.pokemon.limit; },
      set(newValue) { return this.$store.dispatch("pokemon/setLimit", newValue); },
    },
    /* eslint-enable */
  },

  methods: {
    onResize() {
      this.limit =
        Math.floor(this.$refs.div.clientWidth / 176) *
        Math.ceil((document.documentElement.clientHeight - 112) / 186);
    },
    async pokemonDetail(id) {
      // TODO mieux gerer les url vide dans image sans vider le pokemon courant
      this.$store.dispatch("pokemon/removePokemon");
      this.$router.push(`/pokemon/${id}`);
    },
  },

  async created() {
    this.$store.dispatch("pokemon/updatePokemonList");
    this.$store.dispatch("common/updateTitle", "Liste des Pokémons");
  },

  mounted() {
    this.onResize();
  },
};
</script>
