import axios from 'axios';
window.empty = function (mixed_var) {
  if (typeof mixed_var === 'undefined' || mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false) {
    return true;
  }
  if (typeof mixed_var === 'object') {
    return Object.keys(mixed_var).length === 0
  }
  return false;
};

window.setToken = function () {
  let headers = {};
  if (window.store) {
    headers = {
      headers: {
        'Authorization': window.store.getters.sign,
      }
    };
  }
  return headers;
};

  window.sendErrToDev = function (response) {
    axios.post('/catch/send_exeption', response, window.setToken())
      .then(response => (console.log('JS error report successful.', response)))
      .catch(error => console.info('JS error report submission failed!', error));
  };

/**
 * @param URL string
 * @param payload
 * @param onSuccess
 * @param useBodyFormData if true - request will send as form, else as json
 * @returns {boolean}
 */
window.ajaxRequest = function (URL, payload, onSuccess, useBodyFormData) {
  if (empty(URL)) {
    return false;
  }
  URL = 'https://proxy.belformag.ru' + URL;
  if (useBodyFormData === true) {
    let bodyFormData = new FormData();
    for (let i in payload) {
      if (!payload.hasOwnProperty(i)) {
        continue;
      }
      bodyFormData.append(i, payload[i]);
    }
    payload = bodyFormData;
  }

  if (window.store) {
    window.store.commit("set_pending", true);
  }

  axios.post(URL, payload, window.setToken())
    .then(response => {
      if (window.store) {
        window.store.commit("set_pending", false);
      }
      if (typeof onSuccess === "function") {
        return onSuccess(response);
      }
      return null;
    })
    .catch(error => window.sendErrToDev(error));
};

window.getData = function (dataType, onSuccess) {
  let url = null;
  switch (dataType) {
    case 'products':
      url = '/random_products';
      break;
    case 'collections':
      url = '/random_collections';
      break;
    case 'posts':
      url = '/random_post_list';
      break;
  }
  let app = 'default';
  if (window.store) {
    app = window.store.getters.app;
  }
  window.ajaxRequest(url, {app: app}, onSuccess);
};
