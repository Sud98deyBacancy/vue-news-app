import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsMain from '../pages/NewsMain.vue'

Vue.use(VueRouter)
const routes = [
    {
        path:'/',name:'NewsMain',component:NewsMain,
    },
    
]
export default new VueRouter({
    mode:'history',routes
})

