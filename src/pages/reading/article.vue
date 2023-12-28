<script setup>
import {onMounted, ref, reactive, computed, watch} from "vue";
import {useColorStore} from "~/store/counter";
import WordCard from "@/components/reading/word-card.vue";
import {useRoute} from "vue-router";
import ArticleItem from "@/components/reading/article-item.vue";

/** 请求文章*/
// 请求文章列表
let article = reactive({})
let page_size = ref(10)
let current_page = ref(1)
const articles_page = ref(null)
// 请求文章列表
function get_article_list() {
  fetch(`/word_api/reading/articles/?page=${current_page.value}&page_size=${page_size.value}`)
      .then(response => response.json())
      .then(data => {
        articles_page.value = data
      })
      .catch(error => console.log(error))
}
// 改变每页大小
function handle_current_change(val) {
  current_page.value = val
  get_article_list()
}

// 请求文章
let article_id = ref(null)
// 获取路由
const route = useRoute()
function get_article(article_id=null) {
  let url = '/word_api/reading/article/'
  if (article_id)
    url += `?id=${article_id}`
  fetch(url)
      .then(response => response.json())
      .then(data => {
        Object.keys(data).forEach(key => {
          article[key] = data[key]
        })
      })
      .catch(error => console.log(error))
}

onMounted(() => {
  // 获取路由中的id
  if (route.query.id)
    article_id.value = route.query.id
  // 请求文章列表
  get_article_list()
  // 请求文章
  get_article()
})

// 监听article_id的变化
watch(article_id, (new_article_id) => {
  get_article(new_article_id)
})


/** 点击单词显示单词卡片 */

// 获取当前文章的位置
const current_article = ref(null)
let current_article_position = {
  top: 0,
  left: 0,
}
// 单词卡片
const word_card = reactive({
  word: '',
  style: {
    top: '0px',
    left: '0px'
  },
  show: false,
})
const show_word_card = (e, word) => {
  // 获取当前文章的位置
  let article_rect = current_article.value.getBoundingClientRect()
  current_article_position = {
    top: article_rect.top,
    left: article_rect.left,
  }
  // 获取点击单词的位置
  let word_rect = e.target.getBoundingClientRect()
  let top = word_rect.top - current_article_position.top + word_rect.height + 10
  let left = word_rect.left - current_article_position.left + word_rect.width / 2 - 150
  // 配置单词卡片
  word_card.word = word
  word_card.style.top = `${top}px`
  word_card.style.left = `${left}px`
  word_card.show = true
}

</script>

<template>
  <div class="article container row mt-5 mx-auto">
    <!--    当前文章-->
    <div ref="current_article" class="col-8  position-relative">
<!--      文章标题-->
      <div class="title">
        <h1 class="h1">{{ article.title_en }}</h1>
        <h4 class="h4">{{ article.title_cn }}</h4>
      </div>
<!--      创建、阅读日期-->
      <div class="date d-flex">
        <div class="col-5">
          创建日期：<span class="text-info">{{ article.create_time }}</span>
        </div>
        <div class="col-5">
          上次阅读日期：<span class="text-info">{{ article.last_review }}</span>
        </div>
        <div class="col-2">
          单词数：<span class="text-info">{{ article.length }}</span>
        </div>
      </div>
<!--      文章图片-->
      <div class="image text-center">
        <img :src="article.image" alt="">
      </div>
<!--      文章内容-->
      <div class="content">
        <div class="content d-flex flex-wrap my-4"
             v-for="paragraph in article.content">
          <template v-for="word in paragraph">
            <span class="word"
                  @click="show_word_card($event, word)">{{ word }}</span>
            &nbsp;
          </template>
        </div>
      </div>
<!--      完成阅读-->
      <div class="complete-reading d-flex justify-content-center my-5">
        <el-button type="primary">完成阅读</el-button>
      </div>
<!--      单词卡片-->
      <word-card class="position-absolute"
                 @hide_card="word_card.show = false"
                 v-show="word_card.show"
                 :style="word_card.style"
                 :word="word_card.word"></word-card>
    </div>
    <!--    其他文章-->
    <div v-if="articles_page" class="col-4 ps-4">
      <h2 class="h2">其他文章</h2>
      <div class="article_list">
        <div v-for="article in articles_page.articles"
             :key="article.id"
             @click="article_id= article.id"
             class="mb-2">
          <article-item :article="article"></article-item>
        </div>
      </div>

      <!--  分页-->
      <div class="d-flex container justify-content-end">
        <el-pagination
            class="mt-3"
            v-model:current-page="current_page"
            background
            layout="total, prev, pager, next"
            :total="articles_page.total"
            page-count="5"
            @current-change="handle_current_change"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-family: HelveticaNeue-Medium, serif;
}

.article {
  padding-bottom: 100px;

  .date {
  }

  .content {
    font-size: 20px;

    .word {
      cursor: pointer;
    }

    .word:hover {
      background: #26b598;
      color: #fff;
      border-radius: 4px;
    }

    .today-word {
      color: #ea7a6d;
    }
  }
}
</style>