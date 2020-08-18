import Vue from "vue";
import Vuex, { mapGetters } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: "alksdjfaldfj",
        title: "Meetup in New York",
        imageUrl:
          "https://www.brinksresiliencetraining.com/wp-content/uploads/2019/10/New-York-City.jpg",
        date: new Date(),
        location: "New York City",
        description: "Meetup at New York City"
      },
      {
        id: "bakldfjlajflasdf",
        title: "Meetup in Paris",
        imageUrl:
          "https://es.oui.sncf/assets/vocabularies/locality/visuals/Paris_destination_1.jpg",
        date: new Date(),
        location: "Paris City",
        description: "Meetup at Paris City"
      },
      {
        id: "cakjdflajflalfjasldf",
        title: "Meetup in Russia",
        imageUrl:
          "https://static3lonelyplanetes.cdnstatics.com/sites/default/files/styles/max_1300x1300/public/blog/rusia_moscu_puertaresurreccion_plazaroja_shutterstockrf_493315507_marco_rubino_shutterstock.jpg?itok=wXAriIgg",
        date: new Date(),
        location: "Russia City",
        description: "Meetup at Russia City"
      }
    ],
    user: {
      id: "ulksdfjlasfjalsfjlasf",
      registeredMeetups: ["aksdfjalfjalskfda"]
    }
  },
  mutations: {
    createMeetupMutation(state, payload) {
      return state.loadedMeetups.push(payload);
    }
  },
  actions: {
    createMeetupAction({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: "akldjfñlajfalñsdfjalñsd"
      };
      // reach out to firebase and store it...
      commit("createMeetupMutation", meetup);
    }
  },
  getters: {
    getLoadedMeetups(state: any) {
      return state.loadedMeetups.sort((meetupA: any, meetupB: any) => {
        return meetupA.date > meetupB.date;
      });
    },
    getFeaturedMeetups(state: any, getters) {
      // get only 5 meetups using the getLoadedMeetups
      return getters.getLoadedMeetups.slice(0, 5);
    },
    getLoadedMeetup(state: any) {
      return (meetupId: any) => {
        return state.loadedMeetups.find((meetup: any) => {
          // "loadedMeetups" is a state property not a getter.
          return meetup.id === meetupId;
        });
      };
    }
  }
  // modules: {}
});
