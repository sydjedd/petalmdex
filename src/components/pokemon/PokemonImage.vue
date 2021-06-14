<template>
  <div>
    <v-img
      :src="finalUrl"
      lazy-src="data:image/png;base64,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"
      :aspect-ratio="1"
      :height="size"
      contain
    ></v-img>
  </div>
</template>

<script>
export default {
  name: "PokemonImage",

  props: {
    id: String,
    url: String,
    size: String,
  },

  computed: {
    finalUrl() {
      // TODO Ameliorer la gestion des id url null / vide
      /* eslint-disable */
      let url =
        (this.url || this.url === '') ? this.url :
        (this.id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png` : null)
      ;
      /* eslint-enable */
      return url;
    },
  },
};
</script>
