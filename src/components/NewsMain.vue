<template>
  <div class="fluid  mx-1">
    <h3> This is a news app. </h3>
      <div class="d-flex flex-row mt-4">
          <div class="d-inline-flex flex-sm-wrap">
             
           <NewsItem v-for="(article,index) in articles" :key="index" 
             :title="article.title.slice(0,72)"
             :description="article.description.slice(0,84)"
             :imageURL = "article.urlToImage"
             :newsURL = "article.url"
             :source=article.source.name
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
import NewsItem from './NewsItem.vue';
export default {
    name: "NewsApp",
    components: { NewsItem },
    data() {
      return { query:'all', articles:[] };
    },
    methods: {
  async fetchArticles(){
       const response = await axios.get(`${baseURL}?q=${this.query}&${api_KEY}`, 
       { headers: { 'Content-Type': 'multipart/form-data;' } } );
       this.articles = response.data.articles
       console.log(this.articles)   
      }    
  },
  mounted(){ this.fetchArticles(); }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
