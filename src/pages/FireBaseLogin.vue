<template>
<section class="formBody">
    <div class="sidenav">
         <div class="login-main-text">
            <h2>FireBase<br> Login Page</h2>
            <p>Login from here to access.</p>
         </div>
        </div>
     <div class="main"> 
      <form @submit.prevent="login">
       <div class="row mb-2">
           <input type="Email"  
                class="form-control" 
                v-model="email"
                placeholder="Enter Email ID" /> 
        </div>
        <div class="row  mb-2">
         <input type="Password" 
                class="form-control" 
                v-model="password"
                placeholder="Enter Password" />   
       </div>
       <div class="row mb-2 mx-auto">
        <router-link to="/signin"> Click here login without Firebase Account. </router-link>
        <router-link to="/"> Do you Forgot your Password? Click here </router-link>
       </div>
       <div class="row form-group ">
          <button class="btn btn-primary col mx-2 form-control" type="Submit">
              Log In
          </button>
          <button class="btn btn-warning col form-control" type="Reset">
              Reset
          </button>
       </div>
    </form>
    </div>
</section>
</template>
<script>
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
     return {  email:'',password:''  };
   },
   methods:{
     login(){
            signInWithEmailAndPassword(getAuth(),this.email,this.password)
                .then((response)=> { 
                    console.log(response);
                     this.$router.push('/') 
                })
                .catch(error => alert(error.message));

    },
   }
}
</script>
<style scoped>
.formBody{
    font-family: 'Poppins', sans-serif;
	height:max-content; position: absolute; 
    width: 50%; padding: 2rem; 
	margin-left: 27vw;  margin-top:11vw;
    border: #000 solid 1px; 
    border-radius: 0.3cm;   
}
.main-head{
    height: 150px; background: #FFF;
}
.sidenav {
    height: max-content; overflow-x: hidden;
    margin-top: 10vw;   margin-left: 5vw;
    padding: 6vw; background-color: #000;
    border-radius: 0.3cm;   
}
.main {    padding: 0px 10px;  }

@media screen and (max-height: 450px) { 
    .sidenav {padding-top: 15px;}
}
@media screen and (max-width: 450px) {
    .login-form{ margin-top: 10%; }
}

@media screen and (min-width: 768px){
    .main{  margin-left: 40%;  }
    .sidenav{
        width: 40%; z-index: 1;
        position: fixed;
        top: 0; left: 0;
    }
   .login-form{  margin-top: 80%; }
}
.login-main-text {
    margin-top: 20%; padding: 55px; color: #fff;
}
.login-main-text h2{  font-weight: 300; }

</style>