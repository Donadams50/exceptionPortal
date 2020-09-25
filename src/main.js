import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from 'axios';
import 'material-design-icons-iconfont/dist/material-design-icons.css'


// const token = localStorage.getItem('token')
// if (token) {
//   Axios.defaults.headers.common['Authorization'] = token
// }

Axios.defaults.baseURL = "http://134.122.105.58:8081"
//Axios.defaults.baseURL = "https://asteroid.astrapay.com.ng"
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
