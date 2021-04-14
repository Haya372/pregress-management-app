<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-tabs v-model="tab">
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#progress">進行中</v-tab>
        <v-tab href="#holding">保留</v-tab>
        <v-tab href="#finished">終了済み</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="progress">
          <v-card flat>
            <Home state="0" />
          </v-card>
        </v-tab-item>

        <v-tab-item value="holding">
          <v-card flat>
            <Home state="1" />
          </v-card>
        </v-tab-item>

        <v-tab-item value="finished">
          <v-card flat>
            <Home state="2" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'App',

  components: {
    Home
  },

  data: function(){
    return {
      tab: null
    }
  }
}
</script>
