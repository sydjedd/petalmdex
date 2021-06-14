<template>
  <v-row>
    <v-col cols="12" md="4" sm="12" xs="12">
      <Profil :id="pokemon.id" :name="pokemon.name" :types="pokemon.types" />
    </v-col>

    <v-col cols="12" md="4" sm="6" xs="12">
      <Information
        :id="pokemon.id"
        :name="pokemon.name"
        :height="pokemon.height"
        :weight="pokemon.weight"
        :experience="pokemon.base_experience"
        :order="pokemon.order"
        :abilities="pokemon.abilities"
      />
    </v-col>

    <v-col cols="12" md="4" sm="6" xs="12">
      <Statistique :statistique="pokemon.stats" />
    </v-col>

    <v-col cols="12">
      <Evolution :evolution="pokemon.evolution" />
    </v-col>

    <v-col cols="12">
      <Attaque :moves="pokemon.moves" />
    </v-col>

    <v-col cols="12">
      <Sprite :sprites="pokemon.sprites" />
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
    ...mapGetters("pokemon", ["pokemon"]),
  },

  async created() {
    await this.$store.dispatch("pokemon/updatePokemon", this.$route.params.id);
    // eslint-disable-next-line
    this.$store.dispatch("common/updateTitle", this.pokemon.name[0].toUpperCase() + this.pokemon.name.slice(1).toLowerCase());
  },

  mounted() {
    this.$vuetify.goTo(0, { duration: 0 });
  },
};
</script>
