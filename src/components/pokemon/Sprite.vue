<template>
  <v-card class="pb-4">
    <v-card-subtitle class="text-uppercase text-center d-block">
      Sprites de face
    </v-card-subtitle>

    <v-row no-gutters align="center">
      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Défaut</span>
        <PokemonImage :url="sprites ? sprites['front_default'] : ''" size="96" />
      </v-col>

      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Brillant</span>
        <PokemonImage :url="sprites ? sprites['front_shiny'] : ''" size="96" />
      </v-col>

      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Femelle</span>
        <PokemonImage :url="sprites ? sprites['front_female'] : ''" size="96" />
      </v-col>

      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Femelle brillant</span>
        <PokemonImage :url="sprites ? sprites['front_shiny_female'] : ''" size="96" />
      </v-col>
    </v-row>

    <v-card-subtitle class="text-uppercase text-center d-block">
      Sprites de dos
    </v-card-subtitle>

    <v-row no-gutters align="center">
      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Défaut</span>
        <PokemonImage :url="sprites ? sprites['back_default'] : ''" size="96" />
      </v-col>

      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Brillant</span>
        <PokemonImage :url="sprites ? sprites['back_shiny'] : ''" size="96" />
      </v-col>

      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Femelle</span>
        <PokemonImage :url="sprites ? sprites['back_female'] : ''" size="96" />
      </v-col>

      <v-col cols="6" md="3" sm="3" xs="6">
        <span class="d-block text-center text-caption text-uppercase">Femelle brillant</span>
        <PokemonImage :url="sprites ? sprites['back_shiny_female'] : ''" size="96" />
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
  .image {
    width: 150px;
  }
</style>

<script>
import PokemonImage from "@/components/pokemon/PokemonImage";

export default {
  name: "Sprites",

  components: {
    PokemonImage,
  },

  props: {
    sprites: Object,
  },
};
</script>
