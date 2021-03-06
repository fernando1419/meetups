/* eslint-disable */
import * as firebase from "firebase";

export default {
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
      user: null,
      loading: false,
      error: null
   },
   mutations: {
      setLoadedMeetupsMutation(state: any, payload: any) {
         state.loadedMeetups = payload;
      },
      createMeetupMutation(state: any, payload: any) {
         state.loadedMeetups.push(payload);
      },
      updateMeetupMutation(state: any, payload: any) {
         const meetup = state.loadedMeetups.find((item: any) => {
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
      createUserMutation(state: any, payload: any) {
         state.user = payload;
      }
   },
   actions: {
      loadMeetupsAction({ commit }: any) {
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
      createMeetupAction({ commit, getters }: any, payload: any) {
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
      updateMeetupAction({ commit }: any, payload: any) {
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
      }
   },
   getters: {
      getLoadedMeetups(state: any) {
         // return state.loadedMeetups.sort((meetupA: any, meetupB: any) => {
         //   return meetupA.date > meetupB.date;
         // });
         return state.loadedMeetups;
      },
      getFeaturedMeetups(state: any, getters: any) {
         // get only 5 meetups using the getLoadedMeetups
         return getters.getLoadedMeetups.slice(0, 5);
      },
      getLoadedMeetup(state: any) {
         return (meetupId: string) => {
            return state.loadedMeetups.find((meetup: any) => {
               // "loadedMeetups" is a state property not a getter.
               return meetup.id === meetupId;
            });
         };
      }
   }
};
