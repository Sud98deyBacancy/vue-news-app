import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsMain from '../pages/NewsMain.vue'


Vue.use(VueRouter)
const routes = [
    { path:'/',name:'NewsMain',component:NewsMain  },
    { path:'/login',name:'LogIn', component: () => import('../pages/FireBaseLogin.vue') },
    { path:'/signin',name:'SignIn',component: () => import('../pages/LogIn.vue')},
    

    
]
export default new VueRouter({
    mode:'history',routes
})

