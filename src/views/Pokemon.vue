<template>
  <v-row>
    <v-col cols="12" md="4" sm="12" xs="12">
      <Profil
        :loading="pokemonLoading"
        :id="pokemonDetail.id"
        :name="pokemonDetail.name"
        :types="pokemonDetail.types"
      />
    </v-col>

    <v-col cols="12" md="4" sm="6" xs="12">
      <Information
        :loading="pokemonLoading"
        :id="pokemonDetail.id"
        :name="pokemonDetail.name"
        :height="pokemonDetail.height"
        :weight="pokemonDetail.weight"
        :experience="pokemonDetail.base_experience"
        :order="pokemonDetail.order"
        :abilities="pokemonDetail.abilities"
      />
    </v-col>

    <v-col cols="12" md="4" sm="6" xs="12">
      <Statistique
        :loading="pokemonLoading"
        :statistique="pokemonDetail.stats"
      />
    </v-col>

    <v-col cols="12">
      <Evolution
        :loading="pokemonLoading"
        :evolution="pokemonDetail.evolution"
      />
    </v-col>

    <v-col cols="12">
      <Attaque :loading="pokemonLoading" :moves="pokemonDetail.moves" />
    </v-col>

    <v-col cols="12">
      <Sprite :loading="pokemonLoading" :sprites="pokemonDetail.sprites" />
    </v-col>
  </v-row>
</template>

<script>
import Profil from "@/components/pokemon/Profil";
import Information from "@/components/pokemon/Information";
import Statistique from "@/components/pokemon/Statistique";
import Evolution from "@/components/pokemon/Evolution";
import Attaque from "@/components/pokemon/Attaque";
import Sprite from "@/components/pokemon/Sprite";
import { mapGetters } from "vuex";

export default {
  name: "Pokemon",

  components: {
    Profil,
    Information,
    Statistique,
    Attaque,
    Evolution,
    Sprite,
  },

  computed: {
    ...mapGetters("pokemon", ["pokemonDetail", "pokemonLoading"]),
  },

  async created() {
    /* eslint-disable */
    await this.$store.dispatch("pokemon/updatePokemonDetail", this.$route.params.id);
    this.$store.dispatch("common/setTitle", this.pokemonDetail.name[0].toUpperCase() + this.pokemonDetail.name.slice(1).toLowerCase());
    /* eslint-enable */
  },

  mounted() {
    this.$vuetify.goTo(0, { duration: 0 });
  },
};
</script>
