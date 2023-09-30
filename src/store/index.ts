import { createStore } from 'vuex';
import breadcrumb from './modules/breadcrumb';

export default createStore({
  state: () => ({
    loading: false,
    showAddQR: false,
    readerStock: null,
    readerHistory: null,
  }),
  getters: {},
  mutations: {
    LOADING(state: any, payload: boolean) {
      state.loading = payload;
    },
    TOGGLE_SHOWADDQR(state: any, payload: boolean) {
      state.showAddQR = payload;
    },
    SAVE_READERSTOCK(state: any, payload: any) {
      state.readerStock = payload;
    },
    SAVE_READERHISTORY(state: any, payload: any) {
      state.readerHistory = payload;
    },
  },
  actions: {},
  modules: {
    breadcrumb,
  },
});
