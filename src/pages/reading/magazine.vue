<script setup>
import {onMounted, ref, watch} from "vue";
import MagazineItem from "@/components/reading/magazine-item.vue";
import {scrollToTop} from "@/assets/ts/utils";
import ClassifyTab from "@/components/reading/classify-tab.vue";

/** 请求杂志类 */
let categories = ref([])
let current_category = ref(null)
// 请求杂志分类
const get_categories = async () => {
  let res = await fetch(`/word_api/reading/category?classify=magazine`)
      .then(response => response.json())
  categories.value = res.items
  current_category.value = categories.value[0].id
}
// 处理分类变化
watch(current_category, (category) => {
  current_page.value = 1
  get_magazines(category)
})

let magazine_pager = ref(null)
let current_page = ref(1)
// 请求杂志
const get_magazines = async (category=null, page=current_page.value) => {
  let url_api = `/word_api/reading/magazine?page=${page}`

  if (category){
    url_api += `&category_id=${category}`
  }
  magazine_pager.value = await fetch(url_api)
      .then(response => response.json())
  // magazine_pager.items.forEach(item => {
  //   magazines.value.push(item)
  // })
}

onMounted(() => {
  get_categories()
})

// 处理页面变化
const handle_page_change = (val) => {
  current_page.value = val
  scrollToTop()
}

// 页面变化请求杂志
watch(current_page, (new_val) => {
  get_magazines(current_category.value, new_val)
})

</script>

<template>
  <div class="container-xl mx-auto row my-5">
    <div class="col-xl-9 col-12">
      <div v-if="magazine_pager" class=" d-flex flex-wrap justify-content-between overflow-auto">
        <magazine-item v-for="magazine in magazine_pager.items"
                       :key="magazine.id"
                       :magazine="magazine">
        </magazine-item>
      </div>
      <div>
        <!--  分页-->
        <div v-if="magazine_pager" class="d-flex container justify-content-center">
          <el-pagination
              class="mt-3"
              v-model:current-page="current_page"
              background
              layout="total, prev, pager, next"
              :total="magazine_pager.total"
              @current-change="handle_page_change"
          />
        </div>
      </div>
    </div>
    <div v-if="categories.length" class="col-xl-3 d-none d-xl-block">
      <classify-tab :categories="categories"
                    :current_category="current_category">
      </classify-tab>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>