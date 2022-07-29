<template>
  <div class="card mb-4 shadow-lg p-3 mb-5 bg-white rounded">
      <img :src="imageURL" 
      class="card-img-top" 
      alt="" 
      style="width:16rem;"/>
      
          <div class="card-body">
              <h5 class="card-title"> {{ title }}
              <span class="position-absolute top-0 start-80 
                translate-middle badge rounded-pill bg-danger"> {{ source }}
                </span>
              </h5>
              <p class="card-text">{{ description }}... </p>
              <p class="card-text">
                 <small class='text-muted'> 
                By {{ !author?"Unknown":author }} author on {{ new Date(time).toGMTString() }} </small> 
              </p>
              <a :href=newsURL class="btn btn-primary">Go somewhere</a>
       </div>
  </div>
</template>
<script>
export default {
    name:'NewsItem',
    props:['imageURL','newsURL','title','source','description','author','time']
}
</script>
<style>
</style>