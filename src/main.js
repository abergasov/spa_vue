require('./helpers');
import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuex from 'vuex';
import PolarisVue from "@eastsideco/polaris-vue";
Vue.use(PolarisVue);
import '@eastsideco/polaris-vue/lib/polaris-vue.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
Vue.use(Vuex, VueAxios, axios);

const store = new Vuex.Store({
  state: {
    pending_request: false,
    request_sign: '',
    app: 'default'
  },
  getters: {
    requesting: state => {return state.pending_request},
    sign: state => {return state.request_sign},
    app: state => {return state.app},
  },

  mutations: {
    set_pending (state, payload) {
      state.pending_request = payload;
    },
    set_sign (state, payload) {
      state.request_sign = payload;
    }
  },
});

window.store = store;

import tab_index from "./vue_components/tab_index";
import tab_contact from "./vue_components/tab_contact";
import tab_instruction from "./vue_components/tab_instruction";
new Vue({
  components: {
    tab_index, tab_instruction, tab_contact
  },
  store,
  el: '#app_container',
  data: {
    app: 'default',
  },
  created: function () {
    this.getSign(() => {
      this.getCollection();
      this.getProducts();
      this.getPosts();
    });
  },
  methods: {
    getCollection: function () {
      this.getSampleData('collections', (resp) => {
        console.log('Sample collection here:', resp.data)
      });
    },
    getProducts: function () {
      this.getSampleData('products', (resp) => {
        console.log('Sample product here:', resp.data)
      });
    },
    getPosts: function () {
      this.getSampleData('posts', (resp) => {
        console.log('Sample post here:', resp.data)
      });
    },
    getSampleData: function (action, callback) {
      window.getData(action, callback);
    },

    getSign: function (onSuccess) {
      window.ajaxRequest('/get_key', {app: this.$store.getters.app}, (resp) => {
        let data = resp.data;
        if (data && data.ok) {
          debugger;
          this.$store.commit("set_sign", data.sign);
          if (typeof onSuccess === "function") {
            return onSuccess();
          }
        }
      });
    }
  }
});
