<template>
  <v-card :loading="loading" min-height="200" min-width="260">
    <v-card-subtitle class="text-uppercase text-center d-block">
      Evolutions
    </v-card-subtitle>

    <v-row>
      <v-col v-if="!evolves || !evolves.length">
        <v-skeleton-loader type="list-item"></v-skeleton-loader>
      </v-col>

      <v-col v-if="!evolves || !evolves.length">
        <v-skeleton-loader type="list-item"></v-skeleton-loader>
      </v-col>

      <v-col v-if="!evolves || !evolves.length">
        <v-skeleton-loader type="list-item"></v-skeleton-loader>
      </v-col>

      <v-col
        class="text-center"
        v-for="(element, index) in evolves"
        :key="index"
      >
        <div class="d-inline-block">
          <div class="text-center text-caption text-uppercase">
            #{{ element.id }} {{ element.name }}
          </div>

          <v-hover v-slot="{ hover }">
            <v-badge
              color="primary"
              icon="mdi-baby-carriage"
              offset-x="30"
              offset-y="30"
              :value="element.is_baby"
            >
              <v-avatar size="120" @click.stop="pokemonDetail(element.id)">
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute></v-overlay>
                </v-fade-transition>

                <PokemonImage :id="element.id" size="96" />
              </v-avatar>
            </v-badge>
          </v-hover>
        </div>

        <v-icon
          class="d-inline-block float-right py-12"
          v-if="index < evolves.length - 1"
          large
          color="primary"
        >
          mdi-arrow-right-thin-circle-outline
        </v-icon>
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
    loading: Boolean,
    evolution: Object,
  },

  computed: {
    evolves() {
      const baseURL = process.env.VUE_APP_API || "";
      const pattern = `${baseURL}/pokemon-species/`;
      let element = this.evolution;
      let array = [];

      while (element) {
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
      this.$router
        .push({ name: "Pokémon détail", params: { id: id } })
        .catch(() => {});
    },
  },
};
</script>
