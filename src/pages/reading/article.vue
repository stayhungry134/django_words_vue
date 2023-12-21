<script setup>
import {onMounted, reactive, ref} from "vue";
let article = reactive({})
let api = '/word_api/ebbinghaus/article/3/'
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

</script>

<template>
  <div class="article container row mt-5 mx-auto">
    <div class="col-8">
      <div class="title">
        <h2 class="h2">{{ article.title }}</h2>
      </div>
      <div class="date d-flex">
        <div class="col-4">
          创建日期：<span class="text-info">{{ article.init_date }}</span>
        </div>
        <div class="col-4">
          上次阅读日期：<span class="text-info">{{ article.last_review }}</span>
        </div>
      </div>
      <div class="content">
        <div class="content d-flex flex-wrap my-4" v-for="paragraph in article.content">
          <template v-for="word in paragraph">
            <span v-if="word.slice(0, 2) === '__'" class="word today-word">{{ word.slice(2, ) }}</span>
            <span v-else class="word">{{ word }}</span>
            &nbsp;
          </template>
        </div>
      </div>

      <div class="card word-card">
        <div class="card-header d-flex justify-content-between">
          <div>bloc</div>
          <div class="pronunciation d-flex">
            <span>美 <i class="iconfont icon-fayin"></i></span>
            <span>英 <i class="iconfont icon-fayin"></i></span>
          </div>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="web-word">Vision</div>
              <div>视觉,愿景,视力</div>
            </li>
            <li class="list-group-item ">
              <div class="web-word">Dolby Vision</div>
              <div>杜比视界,杜比视觉,杜比视频高动态技术,杜比影像</div>
            </li>
            <li class="list-group-item">
              <div class="web-word">Peripheral vision</div>
              <div>外围视觉,周边视觉,周围视觉,边缘视觉</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-4 ps-4">
      其他文章
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title{
  font-family: HelveticaNeue-Medium,serif;
}
.article {
  position: relative;
  .date{}
  .content{
    font-size: 20px;
    .word{
      cursor: pointer;
    }
    .word:hover{
      background: #26b598;
      color: #fff;
      border-radius: 4px;
    }
    .today-word{
      color: #ea7a6d;
    }
  }
}
.word-card {
  position: absolute;
  z-index: 3;
  width: 450px;
  -webkit-box-shadow: 0 2px 10px 0 rgba(170, 170, 170, 0.5);
  box-shadow: 0 2px 10px 0 rgba(170, 170, 170, 0.5);

  .card-header{
    font-size: 1.5em;
    background-color: #ddd;
    .pronunciation{
      span{
        border-radius: 15px;
        display: block;
        height: 30px;
        width: 70px;
        cursor: pointer;
        background: #cccccc;
        padding: 3px 10px;
        margin: 0 10px;
        text-align: center;
        font-size: 16px;
        color: black;
      }
      span:hover{
        background: #28bea0;
        color: #fff;
      }
    }
  }
  .web-word{
    font-size: 1.2em;
    color: #28bea0;
  }
}
</style>