/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

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
      user: null, // don't start with a user in our app
      loading: false,
      error: null
   },
   mutations: {
      registerUserForMeetupMutation(state, payload) {
         const id = payload.id;
         const userState = state.user;
         if (userState === null || typeof userState === undefined) {
            return;
         }

         if (
            userState.registeredMeetups.findIndex(
               (meetup: any) => meetup.id === id
            ) >= 0
         ) {
            return;
         }

         userState.registeredMeetups.push(id);
         userState.fbKeys[id] = payload.fbKey;
      },
      unregisterUserFromMeetupMutation(state, payload) {
         const userState = state.user;
         if (userState === null || typeof userState === undefined) {
            return;
         }
         const registeredMeetups = userState.registeredMeetups;
         registeredMeetups.splice(
            registeredMeetups.findIndex((meetup: any) => meetup.id === payload),
            1
         );
         Reflect.deleteProperty(userState.fbKeys, payload);
      },
      setLoadedMeetupsMutation(state, payload) {
         state.loadedMeetups = payload;
      },
      createMeetupMutation(state, payload) {
         state.loadedMeetups.push(payload);
      },
      updateMeetupMutation(state, payload) {
         const meetup = state.loadedMeetups.find(item => {
            return item.id === payload.id;
         });
         // eslint me hinchaba los huevos con "el objeto podría ser indefinido", por eso pregunto si es null or undefined.
         if (meetup == null || typeof meetup === undefined) {
            console.log('Object "meetup" is null or undefined');
            return;
         }
         if (payload.title) {
            meetup.title = payload.title;
         }
         if (payload.description) {
            meetup.description = payload.description;
         }
         if (payload.date) {
            meetup.date = payload.date;
         }
      },
      createUserMutation(state, payload) {
         state.user = payload;
      },
      setLoadingMutation(state, payload) {
         state.loading = payload;
      },
      setErrorMutation(state, payload) {
         state.error = payload;
      },
      clearErrorMutation(state) {
         state.error = null;
      }
   },
   actions: {
      registerUserForMeetupAction({ commit, getters }, payload) {
         commit("setLoadingMutation", true);
         const user = getters.getUser;
         firebase
            .database()
            .ref("/users/" + user.id)
            .child("/registrations/")
            .push(payload)
            .then(response => {
               commit("setLoadingMutation", false);
               commit("registerUserForMeetupMutation", {
                  id: payload,
                  fbKey: response.key
               });
            })
            .catch(error => {
               commit("setLoadingMutation", false);
               console.log(error);
            });
      },
      unregisterUserFromMeetupAction({ commit, getters }, payload) {
         commit("setLoadingMutation", true);
         const user = getters.getUser;
         if (!user.fbKeys) {
            return;
         }
         const fbKey = user.fbKeys[payload];
         firebase
            .database()
            .ref("/users/" + user.id + "/registrations/")
            .child(fbKey)
            .remove()
            .then(() => {
               commit("setLoadingMutation", false);
               commit("unregisterUserFromMeetupMutation", payload);
            })
            .catch(error => {
               console.log(error);
               commit("setLoadingMutation", false);
            });
      },
      loadMeetupsAction({ commit }) {
         commit("setLoadingMutation", true);
         firebase
            .database()
            .ref("meetupDB")
            .once("value")
            .then(response => {
               const meetups = [];
               const obj = response.val();
               for (const key in obj) {
                  meetups.push({
                     id: key,
                     title: obj[key].title,
                     description: obj[key].description,
                     imageUrl: obj[key].imageUrl,
                     date: obj[key].date,
                     userId: obj[key].userId
                  });
               }
               commit("setLoadedMeetupsMutation", meetups);
               commit("setLoadingMutation", false);
            })
            .catch(error => {
               console.log(error);
               commit("setLoadingMutation", false);
            });
      },
      createMeetupAction({ commit, getters }, payload) {
         const meetup = {
            title: payload.title,
            location: payload.location,
            // imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date.toISOString(),
            userId: getters.getUser.id
            // id: "akldjfñlajfalñsdfjalñsd"
         };
         // reach out to firebase and store it...
         let key: any;
         let uploadTask: any;
         firebase
            .database()
            .ref("meetupDB")
            .push(meetup)
            .then(response => {
               // console.log("response: ", response);
               // console.log("key: ", response.key); // id
               key = response.key;
               return key;
            })
            .then(key => {
               const filename = payload.image.name;
               const extension = filename.slice(filename.lastIndexOf("."));
               uploadTask = firebase
                  .storage()
                  .ref("meetupDB/" + key + extension)
                  .put(payload.image);
               return uploadTask;
            })
            .then(uploadTask => {
               uploadTask.ref.getDownloadURL().then((downloadURL: any) => {
                  firebase
                     .database()
                     .ref("meetupDB")
                     .child(key)
                     .update({ imageUrl: downloadURL })
                     .then(() => {
                        commit("createMeetupMutation", {
                           ...meetup,
                           imageUrl: downloadURL,
                           id: key
                        });
                     });
               });
            })
            .catch((error: any) => {
               console.log(error);
            });
      },
      updateMeetupAction({ commit }, payload) {
         commit("setLoadingMutation", true);
         const updateObj = {} as any; // define an empty object in typescript
         if (payload.title) {
            updateObj.title = payload.title;
         }
         if (payload.description) {
            updateObj.description = payload.description;
         }
         if (payload.date) {
            updateObj.date = payload.date;
         }
         firebase
            .database()
            .ref("meetupDB")
            .child(payload.id)
            .update(updateObj)
            .then(() => {
               commit("updateMeetupMutation", payload);
               commit("setLoadingMutation", false);
            })
            .catch(error => {
               console.log(error);
               commit("setLoadingMutation", false);
            });
      },
      signupUserAction({ commit }, payload) {
         commit("setLoadingMutation", true);
         commit("clearErrorMutation");
         firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
               commit("setLoadingMutation", false);
               const newUserData = {
                  id: response.user?.uid,
                  registeredMeetups: [],
                  fbKeys: {}
               };
               commit("createUserMutation", newUserData);
            })
            .catch((error: firebase.FirebaseError) => {
               commit("setLoadingMutation", false);
               commit("setErrorMutation", error);
               console.log(error);
            });
      },
      signinUserAction({ commit }, payload) {
         commit("setLoadingMutation", true);
         commit("clearErrorMutation");
         firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
               commit("setLoadingMutation", false);
               const newUserData = {
                  id: response.user?.uid,
                  registeredMeetups: [],
                  fbKeys: {}
               };
               commit("createUserMutation", newUserData);
            })
            .catch(error => {
               commit("setLoadingMutation", false);
               commit("setErrorMutation", error);
               console.log(error);
            });
      },
      autoSigninAction({ commit }, payload) {
         // this payload is got from firebase.
         commit("createUserMutation", {
            id: payload.uid,
            registeredMeetups: [],
            fbKeys: {}
         });
      },
      fetchUserDataAction({ commit, getters }) {
         commit("setLoadingMutation", true);
         firebase
            .database()
            .ref("/users/" + getters.getUser.id + "/registrations/")
            .once("value")
            .then(data => {
               const dataPairs = data.val();
               // console.log(dataPairs);
               let registeredMeetups = [];
               let swappedPairs = {};
               for (let key in dataPairs) {
                  registeredMeetups.push(dataPairs[key]);
                  swappedPairs[dataPairs[key]] = key;
               }
               // console.log(registeredMeetups);
               // console.log(swappedPairs);
               const updatedUser = {
                  id: getters.getUser.id,
                  registeredMeetups: registeredMeetups,
                  fbKeys: swappedPairs
               };
               commit("setLoadingMutation", false);
               commit("createUserMutation", updatedUser);
            })
            .catch(error => {
               console.log(error);
               commit("setLoadingMutation", false);
            });
      },
      signoutAction({ commit }) {
         firebase.auth().signOut(); // removes from localstorage
         commit("createUserMutation", null); // in store
      },
      clearErrorAction({ commit }) {
         commit("clearErrorMutation");
      }
   },
   getters: {
      getLoadedMeetups(state) {
         // return state.loadedMeetups.sort((meetupA: any, meetupB: any) => {
         //   return meetupA.date > meetupB.date;
         // });
         return state.loadedMeetups;
      },
      getFeaturedMeetups(state, getters) {
         // get only 5 meetups using the getLoadedMeetups
         return getters.getLoadedMeetups.slice(0, 5);
      },
      getLoadedMeetup(state) {
         return (meetupId: string) => {
            return state.loadedMeetups.find(meetup => {
               // "loadedMeetups" is a state property not a getter.
               return meetup.id === meetupId;
            });
         };
      },
      getUser(state) {
         return state.user; // return user from vuex store.
      },
      getLoading(state) {
         return state.loading;
      },
      getError(state) {
         return state.error;
      }
   }
   // modules: {}
});
