<template>
   <v-dialog v-model="dialog" width="350px">
      <!-- v-dialog must use a template slot -->
      <template v-slot:activator="{ on }">
         <v-btn fab accent v-on="on">
            <v-icon>edit</v-icon>
         </v-btn>
      </template>

      <!-- v-card component -->
      <v-card>
         <v-container>
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title> Edit Meetup </v-card-title>
               </v-flex>
            </v-layout>
            <v-divider />
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-text>
                     <v-text-field id="title" v-model="editedTitle" name="title" label="Title" :rules="rules.required" />
                     <v-textarea v-model="editedDescription" name="description" label="Description" hint="Tell us about the meetup" rows="3"
                                 :rules="rules.required"
                     />
                  </v-card-text>
               </v-flex>
            </v-layout>
            <v-divider />
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-actions>
                     <v-btn text class="blue--text darken-1" @click="dialog = false"> Close </v-btn>
                     <v-btn text class="blue--text darken-1" @click="onSaveChanges"> Save </v-btn>
                  </v-card-actions>
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
         editedTitle: this.meetupProp.title,
         editedDescription: this.meetupProp.description,
         rules: {
            required: [value => !!value || "This field is required."]
         }
      }
   },
   methods: {
      onSaveChanges () {
         if (this.editedTitle.trim() == '' || this.editedDescription.trim() == '') {
            return;
         }
         this.dialog = false
         this.$store.dispatch('updateMeetupAction', {
            id: this.meetupProp.id,
            title: this.editedTitle,
            description: this.editedDescription
         })
      }
   }
}
</script>
