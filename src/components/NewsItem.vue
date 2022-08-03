<template>
<a :href=newsURL> 
  <div class="card mb-4 shadow-lg p-3 mb-5 bg-white rounded">
      <img :src="imageURL" 
           class="card-img-top" 
           alt="" 
           style="width:17rem;"/>
    
    <div class="card-body">
      <h5 class="card-title"> {{ title }}  
        <span class="position-relative absolute-top top-0 start-90
                translate-middle badge rounded-pill bg-danger"> {{ source.split('.')[0] }}
                </span>
              </h5>
              <p class="card-text">{{ description }}... </p>
              <p class="card-text">
                 <small class='text-muted'> 
                By {{ !author?"Unknown":author }} author on {{ new Date(time).toGMTString() }} </small> 
              </p>
              
       </div>
  </div>
</a>
              
  
  
</template>
<script>
export default {
    name:'NewsItem',
    props:['imageURL','newsURL','title','source','description','author','time']
}
</script>
<style scoped>
a { color: #000; text-decoration: none;}

</style>