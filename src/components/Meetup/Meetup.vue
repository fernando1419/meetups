<template>
   <v-container>
      <v-layout v-if="loadingProperty" row wrap>
         <v-flex xs12 class="text-center">
            <v-progress-circular indeterminate class="primary--text" :width="17" :size="70" />
         </v-flex>
      </v-layout>

      <v-layout v-else row wrap>
         <v-flex xs12>
            <v-card>
               <v-card-title>
                  <h6 class="primary--text"> {{ meetup.title }} </h6>
                  <template v-if="userIsCreator">
                     <v-spacer />
                     <app-edit-meetup-details :meetup-prop="meetup" />
                  </template>
               </v-card-title>
               <v-img class="white--text align-end" height="350px" :src="meetup.imageUrl" />
               <v-card-text>
                  <div class="info--text"> {{ meetup.date | date }} - {{ meetup.location }} </div>
                  <div>
                     <app-edit-meetup-date v-if="userIsCreator" :meetup-prop="meetup" />
                  </div>
                  <div> {{ meetup.description }} </div>
               </v-card-text>

               <v-card-actions>
                  <v-spacer />
                  <v-btn class="primary"> Register </v-btn>
               </v-card-actions>
            </v-card>
         </v-flex>
      </v-layout>
   </v-container>
</template>


<script>
export default {
   props: ['id'],
   computed: {
      meetup() {
         return this.$store.getters.getLoadedMeetup(this.id)
      },
      userIsAuthenticated() {
         return this.$store.getters.getUser !==  null && this.$store.getters.getUser !== undefined
      },
      userIsCreator() {
         if (! this.userIsAuthenticated) {
            return false
         }
         return this.$store.getters.getUser.id === this.meetup.userId
      },
      loadingProperty() {
         return this.$store.getters.getLoading;
      }
   }
}
</script>
