<template>
  <v-card min-width="260">
    <v-card-subtitle class="text-uppercase text-center d-block">
      Attaques
    </v-card-subtitle>

    <v-card-text>
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
    moves: Array,
  },
};
</script>
