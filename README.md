# spa_vue

## Quick
```
git clone git@github.com:abergasov/spa_vue.git && cd spa_vue && npm install && npm run dev
```

## Installation
```shell script
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Documentation
[Flexbox documentation](http://flexboxgrid.com/)

[Components documentation](https://demo.polaris-vue.eastsideco.io/)

## Structure
src/main.js - точка входа аппы

src/helpers.js - дополнительные методы, обертка для запросов на сервер

src/styles.scss - общие стили для spa


Для отслеживания запросов используется "pending_request" в хранилище Vuex.
Блокировать элементы на отрисовке можно так:
```
:disabled="this.$store.getters.requesting"
```

Во время отправления запросов на API сервер через обертку, переменная автоматически меняет свой статус
```
/**
 * @param URL string
 * @param payload
 * @param onSuccess
 * @param useBodyFormData if true - request will send as form, else as json
 * @returns {boolean}
 */
window.ajaxRequest(string '/contact', object params, callable, useBodyFormData);
```
