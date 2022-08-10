<template>
<div class="fluid mx-1" id="styleDiv">
  <div  class= "mx-4 input-group justify-content-around mt-2 position-absolute fixed-top bg-light">
    <NavBar :items="sources" @Select="selectCategory"></NavBar> 
    
    <div class= "w-50 pr-5 p-2">
      <input class="form-control nav-item searchBox" 
             type="text" 
             v-model="searchText" 
             placeholder="Search news items..." 
             aria-label="Search"/>
    </div>
  </div>
  <h3 class="pt-3 myH3"> 
    <span> {{ filteredArticles.length }} news articles found </span> 
  </h3>
   <section class="card-group">
        <div class="d-flex flex-rows mt-4" >  
      <div class="d-inline-flex flex-columns flex-sm-wrap">
      <NewsItem 
          v-for="(article,index) in filteredArticles" :key="index" 
          :title="article.title.slice(0,60)"
          :description="article.description.slice(0,85)"
          :imageURL = "article.urlToImage"
          :newsURL = "article.url"   
          :source="article.source.name"
          :author=article.author
          :time="article.publishedAt" 
          class="articles mx-3"   
           /> 
    </div>
  </div>
   </section>
   
</div>
</template>

<script>
//import axios from "axios";
//import { baseURL,api_KEY } from '../api';
import NavBar from "../components/NavBar.vue";
import NewsItem from '../components/NewsItem.vue';
import DB from '../DB.json';
export default {
    name: "NewsApp",
    components: { NewsItem, NavBar },
    data() {
      return {  
        searchText:'',articles:[],sources:[],showArticles:[] 
        };
    },
  methods: {
    fetchArticles(){
        this.articles = DB.data;
        this.articles = this.articles.sort(
        (itemA,itemB) =>  Number(new Date(itemB.publishedAt)) - Number(new Date(itemA.publishedAt))
       )
       this.articles.forEach( article => {
           this.sources.push(article.source.name.split('.')[0])
        });
        this.fetchSources();
    },
  fetchSources(){
       const uniqueVals = (value,indexOf,self) => {
          return self.indexOf(value) === indexOf;
        }
        this.sources = this.sources.filter(uniqueVals)
    },
  selectCategory(val){
      this.searchText = val;
    },          
  },
 computed: {
    filteredArticles(){
      if(this.searchText === '' || this.searchText === 'all'){
        return this.articles
      } else{
        const result = this.articles.filter((article) => 
        article.source.name?.includes(this.searchText.trim()) || 
        article.title?.includes(this.searchText.trim())   
        );
        return result
      }
    },
  },
  mounted(){ this.fetchArticles();  }
}
</script>

<style scoped>
.myH3 { margin: 40px 0 0; }
#styleDiv { display: inline-block; width:auto;}
.searchBox {align-self: center; }
.articles { width: 30%; }
</style>