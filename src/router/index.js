import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import PokemonList from "@/views/PokemonList.vue";
import Pokemon from "@/views/Pokemon.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    /* eslint-disable prettier/prettier */
    { path: "/pokemon", name: "Liste des Pokémons", component: PokemonList, meta: {}, },
    { path: "/pokemon/:id", name: 'Pokémon détail', component: Pokemon, meta: {} },
    { path: "*", name: "Redirection accueil", redirect: "/pokemon", meta: {}, },
    /* eslint-enable prettier/prettier */
  ],
});

router.afterEach((to) => {
  store.dispatch("common/setCurrentRoute", to.path);
});

export default router;
