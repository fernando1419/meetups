import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filters/date";
import * as firebase from "firebase/app"; // suggested import instead of "firebase"

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAkZzH2wFshKxTLiWxLko9wWBFtZoWkv6M",
      authDomain: "devmeetup-1881c.firebaseapp.com",
      databaseURL: "https://devmeetup-1881c.firebaseio.com",
      projectId: "devmeetup-1881c",
      storageBucket: "devmeetup-1881c.appspot.com",
      appId: "1:86039230417:web:c123eaac9629d20c0752f0"
      // messagingSenderId: "86039230417",
    });
  }
}).$mount("#app");
