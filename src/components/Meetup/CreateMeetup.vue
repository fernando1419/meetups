<template>
  <v-container>
    <v-layout row>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h4>
          Create a new Meetup
        </h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <v-text-field
                id="title"
                v-model="title"
                name="title"
                label="Title"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <v-text-field
                id="location"
                v-model="location"
                name="location"
                label="Location"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <v-text-field
                id="image-url"
                v-model="imageUrl"
                name="imageUrl"
                label="Image URL"
                required
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <img
                :src="imageUrl"
                height="100px"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <v-textarea
                v-model="description"
                name="description"
                label="Description"
                hint="Tell us about the meetup"
                rows="3"
              />
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit"
              >
                Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: 'https://giraldodetodounpoco.files.wordpress.com/2014/02/meetup.png',
      description: '',
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
    }
  },
  methods: {
    onCreateMeetup() {
      if (! this.formIsValid) {
        return;
      }
      const formMeetupData = {
        title: this.title,
        location: this.location,
        description: this.description,
        imageUrl: this.imageUrl,
        date: new Date()
      }
      this.$store.dispatch('createMeetupAction', formMeetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>

<style>

</style>
