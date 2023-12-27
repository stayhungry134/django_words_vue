<script setup>
import {onMounted, ref, reactive, computed} from "vue";
import {useColorStore} from "~/store/counter";
import WordCard from "@/components/reading/word-card.vue";
import {hexToRgb} from "~/assets/ts/utils";

/** 请求文章*/
let article = reactive({})
let api = '/word_api/reading/article/'

function get_article() {
  fetch(api)
      .then(response => response.json())
      .then(data => {
        Object.keys(data).forEach(key => {
          article[key] = data[key]
        })
      })
      .catch(error => console.log(error))
}

onMounted(() => {
  get_article()
  console.log(article)
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
        <h2 class="h2">{{ article.title }}</h2>
      </div>
<!--      创建、阅读日期-->
      <div class="date d-flex">
        <div class="col-4">
          创建日期：<span class="text-info">{{ article.init_date }}</span>
        </div>
        <div class="col-4">
          上次阅读日期：<span class="text-info">{{ article.last_review }}</span>
        </div>
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
    <div class="col-4 ps-4">
      其他文章
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