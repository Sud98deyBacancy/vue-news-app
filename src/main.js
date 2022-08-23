import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import NavBar from './components/NavBar.vue'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './api.js'

export const eventBus = new Vue();
Vue.component('nav-bar',NavBar);
initializeApp(firebaseConfig)
Vue.config.productionTip = false
  new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')