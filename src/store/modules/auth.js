export default {
  namespaced: true,

  state: {
    request_sign: ''
  },

  mutations: {
    SET_SIGN (state, payload) {
      state.request_sign = payload;
    }
  },

  actions: {
    SET_SIGN (context, callback = () => {
    }) {
      const app = {
        app: context.rootGetters.app
      };

      function __onSuccess ({ data }) {
        if (data && data.ok) {
          context.commit('SET_SIGN', data.sign);

          window.info('Successfully sign in');

          callback();
        }

        if (data.error) {
          window.error('Error during a sign in');
        }
      }

      window.ajaxRequest('/get_key', app, __onSuccess);
    }
  },

  getters: {
    SIGN: state => {
      return state.request_sign;
    }
  }
};
