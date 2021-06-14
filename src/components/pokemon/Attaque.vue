<template>
  <v-card :loading="loading" min-width="260">
    <v-card-subtitle class="text-uppercase text-center d-block">
      Attaques
    </v-card-subtitle>

    <v-card-text>
      <v-skeleton-loader
        v-if="!moves || !moves.length"
        type="table-row@6"
      ></v-skeleton-loader>

      <v-row>
        <v-col
          v-for="(element, index) in moves"
          :key="index"
          cols="4"
          md="1"
          sm="2"
          xs="3"
        >
          {{ element.move.name }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Attaque",

  // TODO Affichage en tableau plus couleur
  props: {
    loading: Boolean,
    moves: Array,
  },
};
</script>
