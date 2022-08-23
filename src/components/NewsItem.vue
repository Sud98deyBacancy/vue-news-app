<template>
<div class="card mb-3 shadow-lg p-0  
           bg-white rounded" >
<a :href=newsURL> 
<img :src="imageURL" 
          class="pt-3 card-img-top w-80" 
          alt="" />
    
    <div class="card-body">
      <h5 class="card-title"> {{ title }}  
        <span class="position-relative absolute-top top-0 start-90
                translate-middle badge rounded-pill bg-danger"> {{ source.split('.')[0] }}
        </span>
      </h5>
      <p class="card-text">{{ description }}... </p>
    </div>
    <div class="card-footer">
        <small class='text-info'> 
          By {{ !author?"Unknown":author }} author on {{ new Date(time).toGMTString() }} 
        </small> 
      </div>
  </a>
</div>

</template>
<script>
export default {
    name:'NewsItem',
    props:{
      imageURL:String,
      newsURL: String,
      title: { type: String, required: true},
      source: { type: String, required:true},
      description: { type:String, required: true},
      author:String,
      time: String 
    }
}
</script>
<style scoped>
a { color: #000; text-decoration: none;}
</style>