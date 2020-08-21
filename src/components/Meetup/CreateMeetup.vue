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
              <v-file-input
                v-model="image"
                label="File input"
                dense
                append-icon="mdi-camera"
                accept="image/*"
                small-chips
                show-size
                loading="true"
                @change="onFilePicked"
              />
            </v-flex>
          </v-layout>
          <v-layout
            v-show="imageUrl"
            row
          >
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <img
                :src="imageUrl"
                height="140px"
                width="200px"
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
              Choose a Date & Time
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <v-date-picker
                v-model="date"
              />
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex
              xs12
              sm6
              offset-sm3
            >
              <v-time-picker
                v-model="time"
                format="24hr"
              />
              <!-- <p> {{ time }} </p> -->
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
              <!-- {{ submittableDateTime }} -->
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
      imageUrl: null, // 'https://giraldodetodounpoco.files.wordpress.com/2014/02/meetup.png',
      image: null,
      description: '',
      date: new Date().toISOString().substr(0, 10), // e.g. 2020-08-18
      time: new Date().toISOString().substr(11, 5), // e.g. 01:23

    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
             this.location !== '' &&
             this.imageUrl !== '' &&
             this.description !== ''
    },
    submittableDateTime() {
      const date = new Date(this.date)
      date.setDate(date.getDate() + 1) // workaround, always getting 1 day before after picking.
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.setHours())
        date.setMinutes(this.time.setMinutes())
      }
      // console.log(date)
      return date;
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
        image: this.image,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetupAction', formMeetupData)
      this.$router.push('/meetups')
    },
    onFilePicked (e) {
      // console.log(e)
      this.imageUrl = null;

      if (e !== null && e !== undefined) {
        const filename = e.name;
        const reader = new FileReader();
          // console.log(reader)
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file');
        }
        reader.onload = () => {
          this.imageUrl = reader.result;
          // console.log(this.imageUrl)
        }
        reader.readAsDataURL(e) // this line displays the "image preview"
        this.image = e;
      }
    }
  }
}
</script>

<style>

</style>
