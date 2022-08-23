<template>
  <nav class=" navbar navbar-expand-lg fluid
        position-absolute fixed-top navbar-light bg-info justify-content-around">
    <a class="navbar-brand" href="#"> {{ title }}</a>
    <button class="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mx-auto ">
        <li class="nav-item" v-for="(route,id) in routes" :key="id">
          <button class="nav-link btn-info border-0" 
                  v-if="route.name === 'LogOut'"
                  @click="logOut" > {{ route.name }}</button>
          <router-link  
            v-else class="nav-link" 
            :to="route.path" > {{ route.name }} </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" 
             href="#" 
             id="navbarDropdownMenuLink" 
             data-toggle="dropdown"
             aria-haspopup="true" 
             aria-expanded="false"> {{ selectedItem }}
          </a>
          <div class="dropdown-menu bg-info" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" 
                href="#" 
                v-for="(item, id) in items" 
                :key="id" 
                @click="selectItem(item)"> {{ item}}
              </a>
            </div>
        </li>
      </ul>   
          <form class="form-inline my-lg-0 my-2">
          <input class="form-control mr-sm-2" 
             type="text" 
             @input="searchItem($event)" 
             placeholder="Search news items..." 
             aria-label="Search"/>
            </form> 
         
      
    </div>
  </nav>
</template>
<script>
import { eventBus } from '../main.js';
import { getAuth,signOut } from "firebase/auth";
import Cookies from 'js-cookie';
export default {
  name: 'NavBar',
  data() {
    return { 
          selectedItem: 'Categories',items:[],
          routes:[
            {name:'LogIn',path:'/login'},
            {name:'Home' , path:'/' },
            {name:'About',path:'/' },
            {name:'LogOut'},
            ]//List of defined routes 
          };
  },
  methods: {
    selectItem(val) {
      this.selectedItem = val;
      eventBus.$emit('Select', val);
    },
    searchItem(e){
     eventBus.$emit('search',e.target.value)
    },
    logOut(){
    signOut(getAuth()).then(()=>{
       alert('LogOut Successful');
       Cookies.set('isAuth',false);
        this.$router.push('/login');
      }).catch((error)=> {
        alert(error.message);
        this.$router.push('/');
      })
    }
  },
  props: ['title'],
  mounted(){
    eventBus.$on('addSources',(data) => {
      this.items = data;
      eventBus.$off('addSources');
    })
  }
}
</script>
<style scoped>
.searchBox { text-align: right;}
</style>