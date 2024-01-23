<script setup>
import {onMounted, ref, reactive, watch} from 'vue'
import {useRoute} from "vue-router";
import WordCard from "@/components/reading/word-card.vue";
import {ElMessage} from "element-plus";

/** 书籍相关 */
let book = ref(null)
let book_id = ref(null)
let current_chapter = ref(null)
let chapter = ref(null)
// 获取书籍
const get_book = async () => {
  book.value = await fetch(`/word_api/reading/book/?id=${book_id.value}`)
      .then(response => response.json())
  current_chapter.value = book.value.chapters.filter(chapter => chapter['is_finished'] === false)[0].id
}
// 获取章节
const get_chapter = async (chapter_id) => {
  chapter.value = await fetch(`/word_api/reading/book/chapter/?id=${chapter_id}`)
      .then(response => response.json())
}

onMounted(() => {
  // 获取书籍id
  const route = useRoute()
  book_id.value = route.query.id
  get_book()
})

watch(current_chapter, (new_val) => {
  get_chapter(new_val)
})
// 提交章节
const submit_chapter = async (chapter_id) => {
  let response = await fetch('/word_api/reading/book/chapter/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chapter_id: chapter_id,
    })
  }).then(response => response.json())
  if (response.msg === 'success'){
    ElMessage({
      message: '恭喜你完成这篇文章的阅读',
      type: 'success'
    })
    await get_book()
  }
}

/** 点击单词显示单词卡片 */
// 获取当前文章的位置
const content = ref(null)
let content_position = {
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
  let content_rect = content.value.getBoundingClientRect()
  content_position = {
    top: content_rect.top,
    left: content_rect.left,
  }
  // 获取点击单词的位置
  let word_rect = e.target.getBoundingClientRect()
  let top = word_rect.top - content_position.top + word_rect.height + 10
  let left = word_rect.left - content_position.left + word_rect.width / 2 - 150
  // 配置单词卡片
  word_card.word = word
  word_card.style.top = `${top}px`
  word_card.style.left = `${left}px`
  word_card.show = true
}

/** 书籍信息相关(右边侧边栏) */
let show_description = ref(false)


</script>

<template>
  <div v-if="book">
    <el-container class="reader">
      <el-aside width="300px">
        <div class="catalog position-fixed">
          <ul class="list-group">
            <li v-for="chapter in book.chapters"
                :key="chapter.id"
                class="chapter list-group-item list-group-item-action d-flex justify-content-between"
                :class="{'list-group-item-success': current_chapter === chapter.id}"
                @click="current_chapter=chapter.id">
              <el-tooltip :content="chapter.title_cn"
                          placement="top">
                <div class="chapter-title text-truncate"
                     :class="{'chapter-finished': chapter.is_finished}">
                  <div class="text-truncate">
                    {{ chapter.index + 1 }}.{{ chapter.title_cn }}
                  </div>
                  <div class="chapter-title-en">
                    {{ chapter.title_en }}
                  </div>
                </div>
              </el-tooltip>
              <div class="chapter-length flex-shrink-0 ms-2">
                <div>
                  {{ chapter.length }} 词
                </div>
                <div v-if="chapter.is_finished">已阅读</div>
              </div>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-main style="background-color: #f9f9f9">
        <div v-if="chapter" ref="content" class="reader-main position-relative">
          <div class="title mb-4">
            <div class="h3 text-center">{{ chapter.title_en }}</div>
            <div class="text-center">{{ chapter.title_cn }}</div>
          </div>
          <!--      章节内容-->
          <div class="content ">
            <div v-for="paragraph in chapter.content.content"
                 class="paragraph d-flex flex-wrap my-3">
              <template v-if="paragraph.type === 'text'">
                <div class="d-flex flex-wrap" v-for="sentence in paragraph.sentences">
                  <template v-for="word in sentence">
              <span class="word"
                    @click="show_word_card($event, word)">{{ word }}</span>&ensp;
                  </template>
                </div>
              </template>
              <template v-if="paragraph['type'] === 'image'">
                <img class="content-img mx-auto" :src="paragraph['img_url']" alt="">
              </template>
            </div>
          </div>
          <!--      完成阅读-->
          <div class="complete-reading d-flex justify-content-center my-5">
            <el-button type="primary" @click="submit_chapter(chapter.id)">完成阅读</el-button>
          </div>
          <!--      单词卡片-->
          <word-card class="position-absolute"
                     @hide_card="word_card.show = false"
                     v-show="word_card.show"
                     :style="word_card.style"
                     :word="word_card.word"></word-card>
        </div>
      </el-main>
      <el-aside width="200px">
        <div class="book px-0 position-fixed">
          <div class="back-desktop px-3" @click="$router.push('/reading/book')"><i class="iconfont icon-fanhui d-inline-block me-3"></i>返回书桌</div>
          <div class="book-info mx-auto w-75">
            <img class="cover mt-5" :src="book.cover" alt="book.name">
            <div class="text-truncate fw-bold">{{ book.title_cn }}</div>
            <div class="author text-truncate">{{ book.author }}</div>
          </div>
<!--          显示书籍简介-->
          <div class="book-btn text-center" @mouseenter="show_description=true" @mouseleave="show_description=false"><i class="iconfont icon-shuji fw-bold me-2"></i>书籍信息</div>
          <div v-if="show_description" class="book-info-card position-absolute top-0 start-0">
            <div class="book-title-en">{{ book.title_en }}</div>
            <div class="book-title-cn">{{ book.title_cn }}</div>
            <div class="book-author">{{ book.author }}</div>
            <div class="book-description">{{ book.description }}</div>
          </div>
        </div>
      </el-aside>
    </el-container>

  </div>
</template>

<style scoped lang="scss">
.reader {
  padding: 0 200px;

  &-main {
    padding: 50px 60px;
  }
}

.catalog {
  top: 50px;
  width: 300px;
  height: calc(100vh - 50px);
  padding: 40px 0;
  overflow: auto;

  .list-group-item {
    cursor: pointer;
  }

  .chapter {
    &-title {
    }

    &-title-en {
      font-size: 12px;
    }

    &-length {
      font-family: Roboto, serif;
      font-size: 13px;
      color: #999999;
    }

    &-finished {
      color: #999999;
    }
  }
}

/* 滚动条样式 */
.catalog::-webkit-scrollbar {
  width: 4px; /* 滚动条宽度 */
}

.catalog::-webkit-scrollbar-thumb {
  background-color: #888; /* 滚动条手柄颜色 */
}

.catalog::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 滚动条轨道颜色 */
}

.content {
  font-family: 'Source Serif Pro', serif;
  font-size: 20px;

  .word {
    cursor: pointer;
  }

  .word:hover {
    background: #26b598;
    color: #fff;
    border-radius: 4px;
  }

  .content-img {
    max-width: 220px;
  }
}

.book {
  top: 50px;
  right: 200px;
  width: 200px;
  height: calc(100vh - 50px);
  background-color: #f2f2f2;
  padding-top: 40px;

  .back-desktop {
    font-size: 18px;
    cursor: pointer;
  }

  .back-desktop:hover {
    color: #209e85;
  }

  .icon-fanhui {
    font-size: 20px;
    transform: rotateY(180deg);
  }

  .book-info {
    .cover {
      border-radius: 6px;
    }

    .author {
      font-size: 12px;
    }
  }

  .book {

    &-btn{
      margin-top: 70px;
      cursor: pointer;
    }

    &-btn:hover {
      color: #209e85;
    }

    &-info-card {
      width: 300px;
      transition: .5s;
      height: calc(100vh - 50px);
      background-color: #ffffff;
      padding: 41px 22px;
      transform: translate(-100%);
      z-index: 1;
      box-shadow: -2px 0px 20px #eee;
      font-family: PingFangSC-Regular, MicrosoftYaHei, serif;
      overflow: auto;
    }

    &-title-en{
      font-family: Charter, serif;
      font-size: 22px;
    }
    &-title-cn{
      font-size: 22px;
    }
    &-author{
      font-size: 14px;
      color: #999;
    }
    &-description{
      margin-top: 40px;
      padding-top: 20px;
      font-size: 14px;
      border-top: 1px solid #dddddd;
    }
  }
}
</style>