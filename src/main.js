require('./helpers');
import Vue from 'vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import PolarisVue from "@eastsideco/polaris-vue";
import '@eastsideco/polaris-vue/lib/polaris-vue.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';

Vue.use(PolarisVue);
Vue.use(VueAxios, axios);

import store from '@/store';
import { mapActions } from 'vuex';

import tab_index from "./components/tab_index";
import tab_contact from "./components/tab_contact";
import tab_instruction from "./components/tab_instruction";

new Vue({
  el: '#app_container',
  store,

  data: {
    app: 'default',
  },

  components: {
    tab_index, tab_instruction, tab_contact
  },

  created () {
    this.SET_SIGN(() => {
      this.getCollection();
      this.getProducts();
      this.getPosts();
    });
  },

  methods: {
    ...mapActions('auth', ['SET_SIGN']),

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
    }
  }
});
