<template>
  <v-card height="400" min-width="260">
    <v-card-subtitle class="text-uppercase text-center d-block">
      Informations
    </v-card-subtitle>

    <v-card-text>
      <v-simple-table >
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="text-right" width="120">ID</th>
              <td>#{{ id }}</td>
            </tr>
            <tr>
              <th class="text-right" width="120">Nom</th>
              <td>{{ name }}</td>
            </tr>
            <tr>
              <th class="text-right" width="120">Taille</th>
              <td>{{ height * 10 }} cm</td>
            </tr>
            <tr>
              <th class="text-right" width="120">Poids</th>
              <td>{{ weight / 10 }} kg</td>
            </tr>
            <tr>
              <th class="text-right" width="120">Expérience</th>
              <td>{{ experience }}</td>
            </tr>
            <tr>
              <th class="text-right" width="120">Ordre</th>
              <td>{{ order }}</td>
            </tr>
            <tr>
              <th class="text-right" width="120">Capacité(s)</th>
              <td>
                <span v-for="(element, index) in abilities" :key="index">
                  {{ element.ability.name }}
                </span>
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
  name: "Information",

  props: {
    id: Number,
    name: String,
    height: Number,
    weight: Number,
    experience: Number,
    order: Number,
    abilities: Array,
  },
};
</script>
