import * as firebase from "firebase";

export default {
   state: {
      user: null // don't start with a user in our app
   },
   mutations: {
      registerUserForMeetupMutation(state: any, payload: any) {
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
      unregisterUserFromMeetupMutation(state: any, payload: any) {
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
      createUserMutation(state, payload: any) {
         state.user = payload;
      }
   },
   actions: {
      registerUserForMeetupAction({ commit, getters }, payload: any) {
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
      unregisterUserFromMeetupAction({ commit, getters }, payload: any) {
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
      signupUserAction({ commit }, payload: any) {
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
      signinUserAction({ commit }, payload: any) {
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
      autoSigninAction({ commit }, payload: any) {
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
               const registeredMeetups = [];
               const swappedPairs = {};
               for (const key in dataPairs) {
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
      }
   },
   getters: {
      getUser(state: any) {
         return state.user; // return user from vuex store.
      }
   }
};
