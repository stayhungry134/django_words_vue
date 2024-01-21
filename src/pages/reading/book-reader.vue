<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from "vue-router";

/** 书籍相关 */
let book = ref(null)
let book_id = ref(null)
let current_chapter = ref(null)
let chapter = ref(null)
// 获取书籍
const get_book = async () => {
  book.value = await fetch(`/word_api/reading/book/?id=${book_id.value}`)
      .then(response => response.json())
  current_chapter.value = book.value.chapters.filter(chapter => chapter['is_finished']='false')[0].id
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
  console.log(new_val)
  get_chapter(new_val)
})

</script>

<template>
  <div v-if="book" class="container-xl row mx-auto">
    <ul class="catalog list-group  col-xl-3 d-none d-xl-block">
      <li v-for="chapter in book.chapters"
          :key="chapter.id"
          class="list-group-item list-group-item-action"
          :class="{'active': current_chapter === chapter.id}"
          @click="current_chapter=chapter.id">
        {{ chapter.index + 1 }}.{{ chapter.title_cn }}
      </li>
    </ul>
    <div v-if="chapter" class="content col-xl-7 col-12">
      <div class="title mb-4">
        <div class="h3 text-center">{{ chapter.title_en }}</div>
        <div class="text-center">{{ chapter.title_cn }}</div>
      </div>
<!--      章节内容-->
      <div class="content">
        <div v-for="paragraph in chapter.content.content"
             class="paragraph d-flex flex-wrap my-3">
          <template v-if="paragraph.type === 'text'">
            <div class="d-flex flex-wrap" v-for="sentence in paragraph.sentences">
              <span v-for="word in sentence" class="word">{{ word }}&nbsp;</span>
            </div>
          </template>
          <template v-if="paragraph['type'] === 'image'">
            <img class="content-img mx-auto" :src="paragraph['img_url']" alt="">
          </template>
        </div>
      </div>
    </div>
    <div class="col-xl-2 d-none d-xl-block">
      <div class="h3">书籍</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.catalog{
  .list-group-item{
    cursor: pointer;
  }
}
.content{
  font-family: 'Source Serif Pro', serif;
  font-size: 20px;

  .word{
    cursor: pointer;
  }
  .content-img{
    max-width: 220px;
  }
}
</style>