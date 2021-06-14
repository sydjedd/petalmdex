<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-img
        src="https://www.petalmd.com/hubfs/_PetalMD_Sept2018/Logos/logo-PetalMD.svg"
        class="mx-10 my-3"
      ></v-img>

      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ this.$store.state.common.appName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <!-- eslint-disable-next-line -->
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.link" link router>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dense dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid fill-heigh>
        <router-view :key="$route.path"></router-view>
      </v-container>
    </v-main>

    <!-- v-footer app></v-footer -->
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: true,
      items: [
        /* eslint-disable prettier/prettier */
        { title: "Liste des Pokémons", icon: "mdi-view-list", link: "/Pokemon" },
        /* eslint-enable prettier/prettier */
      ],
    };
  },

  computed: {
    title() {
      return this.$store.state.common.title;
    },
  },
};
</script>
