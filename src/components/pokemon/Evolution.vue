<template>
  <v-card min-height="200" min-width="260">
    <v-card-subtitle class="text-uppercase text-center d-block">
      Evolutions
    </v-card-subtitle>

    <v-row>
      <v-col
        v-for="(element, index) in evolves"
        :key="index"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            absolute
            elevation="0"
            @click.stop="pokemonDetail(element.id)"
          >
            <v-fade-transition>
              <v-overlay
                v-if="hover"
                absolute
              ></v-overlay>
            </v-fade-transition>

            <span class="d-block text-center text-caption text-uppercase">
              #{{ element.id }} {{ element.name }}
              <v-icon
                v-if="element.is_baby"
                small
                color="primary"
              >mdi-baby-carriage</v-icon>
            </span>

            <PokemonImage :id="element.id" size="96" />
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import PokemonImage from "@/components/pokemon/PokemonImage";

export default {
  name: "Evolution",

  components: {
    PokemonImage,
  },

  props: {
    evolution: Object,
  },

  computed: {
    evolves() {
        const baseURL = process.env.VUE_APP_API || "";
        const pattern = `${baseURL}/pokemon-species/`;
        let element = this.evolution;
        let array = [];

        while(element) {
          array.push({
            is_baby: element.is_baby,
            name: element.species.name,
            id: element.species.url.replace(/\/$/i, "").replace(pattern, ""),
          });
          element = element.evolves_to[0];
        }
        return array;
    },
  },

  methods: {
    async pokemonDetail(id) {
      this.$store.dispatch("pokemon/removePokemon");
      await this.$store.dispatch("pokemon/updatePokemon", id);
    },
  },

};
</script>
