<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import { useColorStore } from "~/store/counter";
import { hexToRgb } from "~/assets/ts/utils";

let words = ref(null)
// 获取今天的日期并格式化
const today = new Date().toDateString()
// 音频标签
const audio_ref = ref(null)
// 当前页面
let current_page = ref(1)
let page_size = ref(20)
let total_count = ref(0)
let api = '/word_api/ebbinghaus/words/'

// 主题颜色
const color = useColorStore();
const word_bg = computed(() => {
  return hexToRgb(color.theme_color, 0.2)
})

// 请求单词
function get_words() {

  fetch(`${api}?page=${current_page.value}&page_size=${page_size.value}`)
      // .then(response => console.log(response.json()))
      .then(response => response.json())
      .then(data => {
        words.value = data.words;
        total_count = data.total_count;
      })
      .catch(error => console.log(error))
}

onMounted(() => {
  get_words()
})

// 提交表单
function submit_form() {
  console.log(words.value)
  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(words.value)
  }).then(() => get_words())
}
// 改变每页大小
function handle_size_change(val) {
  page_size.value = val
  get_words()
}
// 跳转页面
function handle_current_change(val) {
  current_page.value = val
  get_words()
}

// 点击按钮播放音频
function play_audio(type, word) {
    const url = 'http://dict.youdao.com/dictvoice?'
    audio_ref.value.src = `${url}type=${type}&audio=${word}`
    audio_ref.value.play();
}

</script>

<template>
  <div class="container main" :style="{borderColor: color.theme_color}">
      <div class="header-title">
          <h1 class="text-center">单词列表 - <span :style="{color: color.theme_color}">艾宾浩斯抗遗忘</span></h1>
          <div class="float-end today">
              <span class="fst-italic" :style="{color: color.theme_color}">Date:</span>
              {{ today }}
          </div>
      </div>
      <div class="clearfix"></div>
<!--    表格头部-->
      <div class="row table-header" :style="{backgroundColor: color.theme_color}">
          <div class="col-6">
              <div class="row">
                  <div class="col-1 fst-italic">No.</div>
                  <div class="col-4 fst-italic">Word</div>
                  <div class="col-7 fst-italic">Meaning</div>
              </div>
          </div>
          <div class="col-6">
              <div class="row">
                  <div class="col-12 text-center">Review</div>
                  <div class="col">D1</div>
                  <div class="col">D2</div>
                  <div class="col">D4</div>
                  <div class="col">D7</div>
                  <div class="col">D15</div>
                  <div class="col">D30</div>
                  <div class="col">D60</div>
                  <div class="col">D90</div>
                  <div class="col">180</div>
                  <div class="col">美音</div>
                  <div class="col">英音</div>
              </div>
          </div>
      </div>
<!--    表格体-->
      <div>
          <div class="table-body">
              <div class="row h-100" v-for="(word, word_key, index) in words"
                   :key="word_key"
                   :style="index % 2 === 1? `background-color: ${word_bg}`: ''">
                  <div class="col-6">
                      <div class="row h-100">
                          <div class="col-1 num d-flex justify-content-center align-items-center"
                               :style="{color: color.theme_color}">
                            {{ index + 1 }}
                          </div>
                          <div class="col-4 word d-flex justify-content-center align-items-center"
                               :style="{color: color.theme_color}">
                            {{ word_key }}
                          </div>
                          <div class="col-7 meaning">
                            <span class="d-block text-muted" v-for="definition in word.definition" v-html="definition"></span>
                          </div>
                      </div>
                  </div>
                  <div class="col-6">
                      <div class="row h-100">
                          <div class="col h-100" v-for="(review_time, review_index) in word.review_times" :key="review_index">
                              <div class="check-learn h-100">
                                  <input type="checkbox" v-model="word.review_times[review_index]"  :checked="review_time" class="form-check-input">
                              </div>
                          </div>
                          <div class="col h-100">
                              <div class="check-learn">
                                  <i class="iconfont icon-fayin"
                                     :style="{color: color.theme_color}"
                                     @click="play_audio(0, word_key)"></i>
                              </div>
                          </div>
                          <div class="col h-100">
                              <div class="check-learn">
                                  <i class="iconfont icon-fayin"
                                     :style="{color: color.theme_color}"
                                     @click="play_audio(1, word_key)"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <audio ref="audio_ref" class="hidden" src=""></audio>
  </div>
<!--  提交按钮-->
  <div class="submit container">
    <button @click="submit_form" class=" col-1 offset-11 btn btn-info text-white">提 交</button>
  </div>
<!--  分页-->
  <div class="d-flex container justify-content-end">
    <el-pagination
        class="mt-3"
        v-model:current-page="current_page"
        :page-sizes="[20, 30, 40, 50]"
        v-model:page-size="page_size"
        background
        layout="total, sizes, prev, pager, next"
        :total="total_count"
        page-count="5"
        @size-change="handle_size_change"
        @current-change="handle_current_change"
    />
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.main {
  margin: 30px auto;
  min-width: 1200px;
  border: solid 3px;

  .header-title {
    margin: 30px auto;

    h1 {
      font-weight: bold;

    }

    .today {
      margin: 10px auto;
      font-size: 18px;
      span {
        font-size: 23px;
      }
    }
  }

  .table-header {
    font-weight: bold;
    height: 80px;
    align-items: center;
    border-top: #77bbaf solid 2px;
    border-bottom: #77bbaf solid 2px;
    font-style: italic;

    > div:first-child {
      height: 100%;
      line-height: 74px;
      border-right: #77bbaf solid 2px;
      font-size: 22px;

      div:not(:last-child) {
        border-right: #77bbaf dotted 2px;
      }
    }

    > div:last-child {
      height: 100%;
      color: #62cebb;

      .row {
        height: 100%;

        div {
          height: 50%;
          line-height: 36px;
        }
      }

      .col-12 {
        border-bottom: #77bbaf solid 2px;
      }

      .col {
        overflow: hidden;
      }

      .col:not(:last-child) {
        border-right: #77bbaf solid 2px;
      }
    }
  }

  .table-body {
    > .row {
      border-bottom: #77bbaf dotted 2px;

      > div:first-child {
        height: 100%;
        border-right: #77bbaf solid 2px;
      }

      .row {
        height: 100%;

        > div:not(:last-child) {
          border-right: #77bbaf dotted 2px;
        }
      }

      .col {
        overflow: hidden;
      }

      .check-learn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        input {
          width: 30px;
          height: 30px;
        }

        .icon-fayin {
          font-size: 25px;
          font-weight: bold;
          color: #77bbaf;
          cursor: pointer;
        }
      }

      > div > div {
        min-height: 50px;
      }
    }

    > .row:last-child {
      border-bottom: none;
    }

    .num, .word {
      color: #77bbaf;
      line-height: 50px;
      font-size: 22px;
    }

    .meaning {
      font-size: 16px;
    }
  }
}
</style>