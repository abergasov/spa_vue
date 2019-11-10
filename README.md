# spa_vue

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
window.ajaxRequest(string '/contact', object params, callable);
```
