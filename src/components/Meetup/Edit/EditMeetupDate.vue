<template>
   <v-dialog v-model="dialog" width="350px">
      <!-- v-dialog must use a template slot -->
      <template v-slot:activator="{ on }">
         <v-btn accent v-on="on">
            Edit Date
         </v-btn>
      </template>

      <!-- v-card component -->
      <v-card>
         <v-container>

            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title> Edit Meetup Date </v-card-title>
               </v-flex>
            </v-layout>

            <v-divider />

            <v-layout row wrap>
               <v-flex xs12>
                  <v-date-picker v-model="editableDate" style="width: 100%" actions>
                     <template>
                        <v-btn class="blue--text darken-1" text @click.native="onCloseDialog">Close</v-btn>
                        <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
                     </template>
                  </v-date-picker>
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
         editableDate: null
      }
   },
   created () {
      this.initializeDate()
   },
   methods: {
      initializeDate () {
         // console.log(this.meetupProp.date)
         this.editableDate = new Date(this.meetupProp.date).toISOString().substr(0, 10)
      },
      onCloseDialog () {
         this.dialog = false
         this.initializeDate()
      },
      onSaveChanges () {
         const newDate = new Date(this.meetupProp.date)
         const newDay = new Date(this.editableDate).getUTCDate()
         const newMonth = new Date(this.editableDate).getUTCMonth()
         const newYear = new Date(this.editableDate).getUTCFullYear()
         newDate.setUTCDate(newDay)
         newDate.setUTCMonth(newMonth)
         newDate.setUTCFullYear(newYear)
         this.$store.dispatch('updateMeetupAction', {
            id: this.meetupProp.id,
            date: newDate
         })
      }
   }
}
</script>
