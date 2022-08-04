<template>
<div class="fluid mx-1">
  <div  class= "mx-4 input-group justify-content-around mt-2 position-absolute fixed-top bg-light">
    <NavBar :items="sources" @Select="selectCategory"></NavBar> 
    
    <div class= "w-50 pr-5 p-2">
      <input style=" align-self: center;"
             class="form-control nav-item" 
             type="text" v-model="searchText" 
             placeholder="Search news items..." aria-label="Search">
    </div>
  </div>
  <h3 class="pt-3"> 
    <span> {{ filteredArticles.length }} news reports found </span> 
  </h3>
  <div class="d-flex flex-row mt-4" >          
    <div class="d-inline-flex flex-sm-wrap" id="app-news">
      <NewsItem
          v-for="(article,index) in filteredArticles" :key="index" 
          :title="article.title.slice(0,60)"
          :description="article.description.slice(0,85)"
          :imageURL = "article.urlToImage"
          :newsURL = "article.url"
          :source="article.source.name"
          :author=article.author
          :time="article.publishedAt" 
          class="mx-3"   
          style="width: 30%;" /> 
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { baseURL,api_KEY } from '../api';
import NavBar from "../components/NavBar.vue";
import NewsItem from '../components/NewsItem.vue';
export default {
    name: "NewsApp",
    components: { NewsItem, NavBar },
    data() {
      return {  
        searchText:'',articles:[],sources:[] 
        };
    },
  methods: {
   async fetchArticles(){
       const response = await axios.get(`${baseURL}?q=all&${api_KEY}`, 
         { headers: { 'Content-Type': 'multipart/form-data;' } } );
        this.articles = response.data.articles;
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
      if(this.query && (this.query.searchText === '' || this.query.searchText === 'all')){
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 { margin: 40px 0 0; }
</style>