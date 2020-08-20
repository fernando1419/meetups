import store from "../store";

export default (to: any, from: any, next: any) => {
  if (store.getters.getUser) {
    // user is logged in
    next();
  } else {
    next("/signin");
  }
};
