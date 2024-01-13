<script setup>
import {onMounted, ref, watch} from "vue";
import MagazineItem from "@/components/reading/magazine-item.vue";

/** 请求杂志类 */
let categories = ref([])
let current_category = ref(null)
// 请求杂志分类
const get_categories = async () => {
  let res = await fetch(`/word_api/reading/category?classify=magazine`)
      .then(response => response.json())
  categories.value = res.items
  current_category.value = categories.value[0].id
  console.log(current_category.value)
}
watch(current_category, (new_val) => {
  magazines.value = []
  get_magazines(new_val)
})

let magazines = ref([])
let magazine_pager = ref(null)
// 请求杂志
const get_magazines = async (category=null) => {
  let url_api = `/word_api/reading/magazine?category_id=${category}`
  if (category === null){
    url_api = `/word_api/reading/magazine`
  }
  magazine_pager = await fetch(url_api)
      .then(response => response.json())
  magazine_pager.items.forEach(item => {
    magazines.value.push(item)
  })
}

onMounted(() => {
  get_categories()
  get_magazines()
})


</script>

<template>
  <div class="container row">
    <div class="col-xl-9 col-12 d-flex flex-wrap justify-content-between">
      <magazine-item v-for="magazine in magazines"
                     :key="magazine.id"
                     :magazine="magazine">
      </magazine-item>
    </div>
    <div v-if="categories.length" class="col-xl-3 d-none d-xl-block">
      <div class="h3">分类</div>
      <div>
        <nav class="nav flex-column">
          <div v-for="category in categories"
               :key="category.id"
               class="category-item my-2 ps-2"
               @click="current_category = category.id"
               :class="{'active': current_category === category.id}">
            {{ category.name }}
          </div>
        </nav>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.category-item{
  cursor: pointer;
  color: #303133;
}
.category-item.active{
  color: #409eff;
  border-left: 2px solid #409eff;
}
</style>