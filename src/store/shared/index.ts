export default {
   state: {
      loading: false,
      error: null
   },
   mutations: {
      setLoadingMutation(state: any, payload: any) {
         state.loading = payload;
      },
      setErrorMutation(state: any, payload: any) {
         state.error = payload;
      },
      clearErrorMutation(state: any) {
         state.error = null;
      }
   },
   actions: {
      clearErrorAction({ commit }) {
         commit("clearErrorMutation");
      }
   },
   getters: {
      getLoading(state: any) {
         return state.loading;
      },
      getError(state: any) {
         return state.error;
      }
   }
};
