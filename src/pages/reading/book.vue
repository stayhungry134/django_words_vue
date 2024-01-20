<script setup>
import {onMounted, ref, watch} from "vue";
import BookItem from "@/components/reading/book-item.vue";
import ClassifyTab from "@/components/reading/classify-tab.vue";
import {scrollToTop} from "@/assets/ts/utils";

/** 书籍相关 */
let categories = ref([])
let current_category = ref(null)
// 请求书籍分类
const get_categories = async () => {
  let res = await fetch(`/word_api/reading/category?classify=book`)
      .then(response => response.json())
  categories.value = res.items
  current_category.value = categories.value[0].id
}

// 处理分类变化
watch(current_category, (category) => {
  current_page.value = 1
  get_books(category)
})

let book_pager = ref(null)
let current_page = ref(1)
// 请求书籍
const get_books = async (category=null, page=current_page.value) => {
  book_pager.value = await fetch(`/word_api/reading/books?category=${category}&page=${page}`)
      .then(response => response.json())
}
onMounted(() => {
  get_categories()
})

// 处理页面变化
const handle_page_change = (val) => {
  current_page.value = val
  scrollToTop()
}

// 页面变化请求书籍
watch(current_page, (new_val) => {
  get_books(current_category.value, new_val)
})
</script>

<template>

  <div class="container-xl mx-auto row">
    <div class="col-xl-10 col-12">
      <div v-if="book_pager" class=" d-flex flex-wrap justify-content-between overflow-auto">
        <book-item v-for="book in book_pager.items"
                       :key="book.id"
                       :book="book">
        </book-item>
      </div>
      <div>
        <!--  分页-->
        <div v-if="book_pager" class="d-flex container justify-content-center">
          <el-pagination
              class="mt-3"
              v-model:current-page="current_page"
              background
              layout="total, prev, pager, next"
              :total="book_pager.total"
              @current-change="handle_page_change"
          />
        </div>
      </div>
    </div>
    <div v-if="categories.length" class="col-xl-2 d-none d-xl-block">
      <classify-tab :categories="categories"
                    :current_category="current_category">
      </classify-tab>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>