import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filters/date";
import * as firebase from "firebase"; // suggested import instead of "firebase"
import AlertComponent from "./components/Shared/Alert.vue"; // available in the hole app.
import EditMeetupDetails from "./components/Meetup/Edit/EditMeetupDetails.vue";
import EditMeetupDate from "./components/Meetup/Edit/EditMeetupDate.vue";

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertComponent); // register the imported component
Vue.component("app-edit-meetup-details", EditMeetupDetails);
Vue.component("app-edit-meetup-date", EditMeetupDate);

new Vue({
   router,
   store,
   vuetify,
   created() {
      firebase.initializeApp({
         apiKey: "AIzaSyAkZzH2wFshKxTLiWxLko9wWBFtZoWkv6M",
         authDomain: "devmeetup-1881c.firebaseapp.com",
         databaseURL: "https://devmeetup-1881c.firebaseio.com",
         projectId: "devmeetup-1881c",
         storageBucket: "gs://devmeetup-1881c.appspot.com/",
         appId: "1:86039230417:web:c123eaac9629d20c0752f0"
         // messagingSenderId: "86039230417",
      });

      firebase.auth().onAuthStateChanged(user => {
         if (user) {
            this.$store.dispatch("autoSigninAction", user);
         }
      });

      this.$store.dispatch("loadMeetupsAction");
   },
   render: h => h(App)
}).$mount("#app");
