import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import NavBar from './components/NavBar.vue'
//import GAuth from 'vue-google-oauth2'
//import GoogleAPIs from 'vue-googleapis'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './api.js'
export const eventBus = new Vue();
Vue.component('nav-bar',NavBar);
/* Vue.use(GoogleAPIs,{
  clientId:'806504513558-ps6m1dl0s5eqfvt5pvb7d12qs2ie2pcs.apps.googleusercontent.com',
  scope:'profile email',
}); */
initializeApp(firebaseConfig)
Vue.config.productionTip = false
  new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')