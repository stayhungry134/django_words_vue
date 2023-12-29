<script setup>

</script>

<template>
  <div class="container d-flex justify-content-around mx-auto row">
      <div class="card col-3 m-5 p-0" @click="$router.push('/word/')">
          <img src="../../assets/image/word.jpg" class="card-img-top" alt="...">
          <div class="card-body h2 text-center">
              单词
          </div>
      </div>
      <div class="card col-3 m-5 p-0"  @click="$router.push('/reading/')">
        <img src="../../assets/image/article.jpg" class="card-img-top" alt=". ..">
        <div class="card-body h2 text-center">
            读
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
.card{
  box-shadow: #ccc 2px 2px 8px;
  cursor: pointer;
  img{

  }
}
.card:hover{
  box-shadow: #aaa 2px 2px 8px;
}
</style>