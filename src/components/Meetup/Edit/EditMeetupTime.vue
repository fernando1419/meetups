<template>
   <v-dialog v-model="dialog" width="350px" persistent>
      <!-- v-dialog must use a template slot -->
      <template v-slot:activator="{ on }">
         <v-btn accent v-on="on">
            Edit Time
         </v-btn>
      </template>

      <!-- v-card component -->
      <v-card>
         <v-container>

            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title> Edit Meetup Time </v-card-title>
               </v-flex>
            </v-layout>

            <v-divider />

            <v-layout row wrap>
               <v-flex xs12>
                  <v-time-picker v-model="editableTime" format="24hr" style="width: 100%" actions align-center>
                     <template>
                        <v-btn class="blue--text darken-1" text @click.native="onCloseDialog">Close</v-btn>
                        <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
                     </template>
                  </v-time-picker>
               </v-flex>
            </v-layout>

         </v-container>
      </v-card>
   </v-dialog>
</template>

<script>
export default {
   props: ['meetupProp'],
   data () {
      return {
         dialog: false,
         editableTime: null
      }
   },
   created () {
      this.initializeTime()
   },
   methods: {
      initializeTime () {
         // console.log(this.meetupProp.date)
         this.editableTime = new Date(this.meetupProp.date).toISOString().substr(11, 5) // works
      },
      onCloseDialog () {
         this.dialog = false
         this.initializeTime()
      },
      onSaveChanges () {
         const newDate = new Date(this.meetupProp.date)
         const hours = this.editableTime.match(/^(\d+)/)[1];
         const minutes = this.editableTime.match(/:(\d+)/)[1];
         newDate.setHours(hours);
         newDate.setMinutes(minutes);
         this.$store.dispatch('updateMeetupAction', {
            id: this.meetupProp.id,
            date: newDate
         })
      }
   }
}
</script>
