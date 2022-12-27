<template>
<section class="formBody">
    <div class="sidenav">
         <div class="login-main-text">
            <h2>Application<br> Login Page</h2>
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
        <router-link to="/"> Do you Forgot your Password? </router-link>
       </div>
       <div class="row form-group ">
          <button class="btn btn-success col mx-2 form-control" type="Submit">
              Log In
          </button>
          <button class="btn btn-danger col form-control" type="Reset">
              Reset
          </button>
       </div>
    </form>
    <div class="row mb-2">
         <span class="mx-3"> 
            <facebook-login class="button"
                   appId="1111668039451576"
                   @login="fbLogin"
                   @logout="fbLogout"
                   @sdk-loaded="sdkLoaded">
            </facebook-login>
         </span>  
       <!--   <GoogleLogin :params="params" 
                      :onSuccess="onLoginSuccess" 
                      :onFailure="onLoginFailure"> 
                      Login With Google </GoogleLogin> -->
             <div id="signin_button"> </div>         
       </div>

    </div>
</section>
</template>
<script>
import axios from "axios";
import Cookies from 'js-cookie';    
import { firebaseConfig,googleID,fbID  } from '@/api';
//import GoogleLogin from 'vue-google-login';
import facebookLogin from 'facebook-login-vuejs';

export default {
  data() {
     return {  
               email:'',password:'',FB:undefined,
               isFBConnected:false,
               params: { client_id: googleID },
               
            };
   },
   methods:{
    setCookies(token,refreshToken){
      Cookies.set('Token',token,{ expires: 1 });
      Cookies.set('refreshToken',refreshToken);
    },
    exchangeToken(refreshToken){
       console.log(Cookies.get('Token'));
       Cookies.remove('Token', { path: '' });
       axios.post(`https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`,{
            grant_type : 'refresh_token', refresh_token : refreshToken
       }).then((res)=>{
            this.setCookies(res.data.id_token, res.data.refresh_token);
            console.log(res.data.id_token);
            Cookies.set('isAuth',true);
                this.$router.push('/');
       }).catch((error)=>{
            console.log(error)
       });
    },
    onLoginSuccess(googleUser) {
        console.log(googleUser);
    },
    onLoginFailure(error){
      console.log(error);
    },
    getUserData() {
       let token = this.FB.getAuthResponse();
       this.FB.api(`/me`, 'GET', { fields: 'id,name,email' },
        userInfo => { console.log(userInfo,fbID) }
      )
      this.loginWithFB(token.accessToken);
    },
    sdkLoaded(payload) {
      this.isFBConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isFBConnected)  this.getUserData()
    },
    fbLogin() {
      this.isFBConnected = true
      this.getUserData()
    },
    fbLogout() {
      this.isFBConnected = false;

    },
    async loginWithGoogle(accessToken){
       let userToken = Cookies.get('refreshToken');
       if(userToken){
          this.exchangeToken(userToken);
       } else {
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${firebaseConfig.apiKey}`,
                      {
                      returnSecureToken: true,  
                      requestUri: 'http://localhost',
                      postBody: `access_token=${accessToken}&providerId=google.com`,
                      returnIdpCredential: true
                        }).then((res)=>{
                            console.log(res);
                            this.setCookies(res.data.idToken, res.data.refreshToken);
                            this.$router.push('/');
                            }).catch((error)=>{ console.log(error) })
              }   
    },
     async loginWithFB(token){
       let userToken = Cookies.get('refreshToken');
       if(userToken){
          this.exchangeToken(userToken);
       } else {
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${firebaseConfig.apiKey}`,{
                      requestUri: "http://localhost",
                      postBody: `access_token=${token}&providerId=facebook.com`,
                      returnSecureToken: true,  returnIdpCredential: true
                        }).then((res)=>{
                            console.log(res);
                            this.setCookies(res.data.idToken, res.data.refreshToken);
                            this.$router.push('/');
                            }).catch((error)=>{ console.log(error) })
              }   
    },
     async login(){
       let userToken = Cookies.get('refreshToken');
       if(userToken){
          this.exchangeToken(userToken);
       } else {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,{
           email: this.email, password: this.password, returnSecureToken:true
            }).then((res)=>{
                this.setCookies(res.data.idToken, res.data.refreshToken);
                Cookies.set('isAuth',true);
                this.$router.push('/');
            }).catch((error)=>{
                console.log(error)
            });
       }
      },
      handleCredentials(response){
        console.log(response.credential);
        if(response) {
          this.loginWithGoogle(response.credential);
        }
      }
   },
    components:{ facebookLogin },
    mounted:function() {
      const google = window.google;
      google.accounts.id.initialize({
      client_id: googleID,
      cancel_on_tap_outside: false,
      callback: this.handleCredentials,
    });
     google.accounts.id.renderButton(
      document.getElementById("signin_button"),
      { theme: "outline", size: "large",text:"continue_with" } // customization attributes
    );
    (function loadFBsdk(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      console.log("loaded")
    }) (document, 'script', 'facebook-jssdk');
   },
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
    padding: 6vw; background-color: #444;
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