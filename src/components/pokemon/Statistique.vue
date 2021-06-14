<template>
  <v-card height="410" min-width="260">
    <v-card-subtitle class="text-uppercase text-center d-block">
      Statistiques
    </v-card-subtitle>

    <v-card-text>
      <v-skeleton-loader
        v-if="!statistique"
        type="list-item, divider, list-item, divider, list-item, divider, list-item, divider, list-item, divider, list-item"
      ></v-skeleton-loader>

      <v-simple-table v-if="statistique">
        <template v-slot:default>
          <tbody>
            <tr v-for="(element, index) in statistique" :key="index">
              <th class="text-right" width="130">
                {{ ref[element.stat.name].label }}
              </th>
              <td>
                <v-progress-linear
                  :value="element.base_stat"
                  :color="ref[element.stat.name].color"
                  height="15"
                  rounded
                >
                  <span class="white--text d-block">
                    {{ element.base_stat }}
                  </span>
                </v-progress-linear>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Statistique",

  // TODO utiliser Internationalization (i18n)
  data() {
    return {
      ref: {
        hp: {
          color: "blue",
          label: "Vie",
        },
        attack: {
          color: "red",
          label: "Attaque",
        },
        defense: {
          color: "green",
          label: "Défense",
        },
        "special-attack": {
          color: "teal",
          label: "Attaque spéciale",
        },
        "special-defense": {
          color: "deep-orange",
          label: "Défense spéciale",
        },
        speed: {
          color: "yellow",
          label: "Vitesse",
        },
      },
    };
  },

  props: {
    statistique: Array,
  },
};
</script>
