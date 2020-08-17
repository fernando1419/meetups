<template>
  <v-container>
    <v-layout
      v-for="meetup in meetups"
      :key="meetup.id"
      row
      wrap
      class="mb-2"
    >
      <v-flex
        xs12
        sm10
        md8
        offset-sm1
        offset-md2
      >
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex
                xs5
                sm4
                md3
                pl-2
              >
                <v-img
                  class="white--text align-end pl-2"
                  height="130px"
                  width="200px"
                  :src="meetup.imageUrl"
                >
                  <!-- <v-card-title>{{ meetup.title }}</v-card-title> -->
                </v-img>
              </v-flex>
              <v-flex
                xs7
                sm8
                md9
              >
                <v-card-title primary-title>
                  <div>
                    <h5 class="mb-0">
                      {{ meetup.title }}
                    </h5>
                    <div>{{ meetup.date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    text
                    :to="'/meetups/' + meetup.id "
                  >
                    <v-icon
                      left
                      light
                    >
                      arrow_forward
                    </v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.getLoadedMeetups; // call getter as a property without parentesis.
    }
  }
}
</script>

<style>

</style>
