<template>
   <v-dialog v-model="dialog" width="350px" persistent @keydown.esc="dialog = false">
      <!-- v-dialog must use a template slot -->
      <template v-slot:activator="{ on }">
         <v-btn class="success" rounded v-on="on">
            {{ userIsRegistered ? 'Unregister' : 'Register' }}
         </v-btn>
      </template>

      <!-- v-card component -->
      <v-card>
         <v-container>

            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title v-if="userIsRegistered"> Unregister from meetup? </v-card-title>
                  <v-card-title v-else> Register for meetup? </v-card-title>
               </v-flex>
            </v-layout>

            <v-divider />

            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-text>You can always change your decision later on.</v-card-text>
               </v-flex>
            </v-layout>

            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-actions>
                     <v-btn class="red--text darken-1" text @click="dialog = false">Cancel</v-btn>
                     <v-btn class="green--text darken-1" text @click="onAgree()">Confirm</v-btn>
                  </v-card-actions>
               </v-flex>
            </v-layout>

         </v-container>
      </v-card>
   </v-dialog>
</template>

<script>
export default {
   props: ['meetupIdProp'],
   data () {
      return {
         dialog: false
      }
   },
   computed: {
      userIsRegistered () {
         return this.$store.getters.getUser.registeredMeetups.findIndex( meetupId => {
            return meetupId === this.meetupIdProp
         }) >= 0 // if positive user is registered.
      }
   },
   methods: {
      onAgree () {
         // console.log(this.userIsRegistered)
         if (this.userIsRegistered) {
            this.$store.dispatch('unregisterUserFromMeetupAction', this.meetupIdProp)
         } else {
            this.$store.dispatch('registerUserForMeetupAction', this.meetupIdProp)
         }
      }
   }
}
</script>
