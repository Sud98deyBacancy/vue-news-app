<template>
  <div id="app">
    <nav-bar title="News Items"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
//import NewsMain from './pages/NewsMain.vue'
export default {
    name: 'App',
    //components: { NewsMain }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
html,body {
  display: flex;
  margin: 0; 
  height: 100%;
  width: 100%; 
  }
</style>