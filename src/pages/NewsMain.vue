<template>
<div class="fluid mx-1" id="styleDiv">
  <h3 class="pt-3 myH3"> 
    <span> {{ filteredArticles.length }} news articles found </span> 
  </h3>
   <section class="card-group">
        <div class="d-flex flex-rows mt-4" >  
      <div class="d-inline-flex flex-columns flex-sm-wrap">
      <NewsItem 
          v-for="(article,index) in filteredArticles" :key="index" 
          :title="article.title | sliceText(60)"
          :description="article.description | sliceText(84)"
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
import axios from "axios";
import { baseURL  } from '../api';
import { eventBus } from "@/main.js";
import NewsItem from '../components/NewsItem.vue';
export default {
    name: "NewsApp",
    components: { NewsItem },
    data() {
      return {  
        searchText:'',articles:[],sources:[],showArticles:[] 
        };
    },
    filters:{
     sliceText : function (value,len) {
      return value.slice(0,len);
     }
    },
  methods: {
    async fetchArticles(){
        await axios.get(`${baseURL}/data.json`,{
           headers: { 'Access-Control-Allow-Origin': '*' }
        }).then((res) => { this.articles = res.data})
          .catch((error) => console.log(error))
        
        this.articles = this.articles.sort(
        (itemA,itemB) =>  Number(new Date(itemB.publishedAt)) - Number(new Date(itemA.publishedAt))
       )
       this.articles.forEach( article => {
           this.sources.push(article.source.name.split('.')[0])
           this.isImgURl(article.urlToImage).then(res => {
            if(!res){
              article.urlToImage = ''
            }
           })
        });
        this.fetchSources();
      },
      isImgURl(url){
        const img = new Image()
        img.src = url
        return new Promise((resolve) => {
          img.onerror = () => resolve(false);
          img.onload = () => resolve(true);
        });
      },
  fetchSources(){
       const uniqueVals = (value,indexOf,self) => {
          return self.indexOf(value) === indexOf;
        }
        this.sources = this.sources.filter(uniqueVals)
        eventBus.$emit('addSources',this.sources);
      },
  selectCategory(){
      eventBus.$on("Select",(data) => {
        this.searchText = data;
        });
    },
    searchItems(){
      eventBus.$on("search",(data) => {
        this.searchText = data;
        });
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
  mounted(){ 
    this.searchItems();
    this.fetchArticles(); 
    this.selectCategory();
    }
}
</script>

<style scoped>
.myH3 { margin: 40px 0 0; }
#styleDiv { display: block; width:auto;}
.articles { width: 30%; }
</style>