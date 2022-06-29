<template>
  <v-row justify="center" align="center">
    <v-card class="logo mb-4 py-4 d-flex justify-center"> </v-card>
    <v-card class="pa-5 ma-3 mt-5">
      <v-card-title class="headline text-h4">
        Welcomes to Kais Bitar's test app!
      </v-card-title>
      <v-card-text>
        Thank you for reviewing my test app! I used Nuxtjs and Vuetify, both are
        Vuejs libraries that provide an array of tools. Please click continue to
        see calendar
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" nuxt to="/calendarPage"> Continue </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {},
  mounted() {},
};
</script>
