import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import auth from '@/store/modules/auth';

const store = new Vuex.Store({
  modules: {
    auth
  },

  state: {
    pending_request: false,
    app: 'fb'
  },

  mutations: {
    set_pending (state, payload) {
      state.pending_request = payload;
    }
  },

  getters: {
    requesting: state => {
      return state.pending_request;
    },

    app: state => {
      return state.app;
    }
  }
});

window.store = store;
export default store;
