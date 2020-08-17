<template>
  <v-container>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        class="text-center text-sm-right pa-2"
      >
        <v-btn
          large
          to="/meetups"
          class="primary"
        >
          Explore Meetups
        </v-btn>
      </v-flex>
      <v-flex
        xs12
        sm6
        class="text-center text-sm-left pa-2"
      >
        <v-btn
          large
          to="/meetup/new"
          class="primary"
        >
          Organize Meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
      class="mt-2"
    >
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
      class="mt-2"
    >
      <v-flex
        xs12
        class="align-center justify-center d-flex"
      >
        <p>Join our meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.getFeaturedMeetups;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
  .title {
    /* position: relative; */
    /* bottom: 50px; */
    background-color: rgba(0, 0, 0, 0.3);
    color:white;
    font-size: 2em;
    /* padding: 10px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
