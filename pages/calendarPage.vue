<template>
  <v-row class="fill-height">
    <v-col>
      <Calendar :items="items"/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({}),
  //Fetching Guests data from the api 
  async asyncData({ $axios }) {
    let guests = await $axios.$get(`/exam.guests?limit=100`);
    const { items } = guests;

    return {items} ;
  },
  methods: {},
};
</script>
