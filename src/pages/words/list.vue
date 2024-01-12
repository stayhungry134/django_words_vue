<script setup>
import {computed, onMounted, ref} from "vue";
import { useColorStore } from "@/store/counter";
import { hexToRgb, scrollToTop } from "@/assets/ts/utils";

// 获取今天的日期并格式化
const today = new Date().toDateString()

/** 主题颜色 */
const color = useColorStore();
const word_bg = computed(() => {
  return hexToRgb(color.theme_color, 0.2)
})

/** 请求单词 */
let words = ref(null)
let current_page = ref(1)
let page_size = ref(20)
let total_count = ref(0)
let api = '/word_api/word/remind/'
function get_words() {
  fetch(`${api}?page=${current_page.value}&page_size=${page_size.value}`)
      // .then(response => console.log(response.json()))
      .then(response => response.json())
      .then(data => {
        words.value = data.items;
        total_count = data.total;
      })
      .catch(error => console.log(error))
}

onMounted(() => {
  get_words()
})

/** 改变页面 */
// 改变每页大小
function handle_size_change(val) {
  page_size.value = val
  get_words()
}
// 跳转页面
function handle_current_change(val) {
  current_page.value = val
  get_words()
  // 滑动到顶部
  scrollToTop()
}

/**播放音频*/
// 音频标签
const audio_ref = ref(null)
function play_audio(type, word) {
  const url = 'http://dict.youdao.com/dictvoice?'
  audio_ref.value.src = `${url}type=${type}&audio=${word}`
  audio_ref.value.play();
}

/** 切换词典*/
let current_dict = ref('youdao')

</script>

<template>
<!--  单词列表-->
  <div class="container main" :style="{borderColor: color.theme_color}">
    <div class="header-title">
      <h1 class="text-center">单词列表 - <span :style="{color: color.theme_color}">快速浏览</span></h1>
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
          <div class="col-1 fst-italic">No.</div>
          <div class="col-4 fst-italic">Word</div>
          <div class="col-7 fst-italic">Meaning</div>
        </div>
      </div>
    </div>
    <!--    表格体-->
    <div>
      <div class="table-body">
        <div class="word-list w-100 h-100 align-items-stretch d-flex flex-wrap">
          <div class="word-item w-50"  v-for="(record, index) in words"
               :key="record.id">
            <div class="row"
                 :style="index % 4 < 2? '': `background-color: ${word_bg}`">
              <div class="col-1 num d-flex justify-content-center align-items-center"
                   :style="{color: color.theme_color}">
                {{ index + 1 }}
              </div>
              <div class="col-4 word d-flex justify-content-center align-items-center"
                   :style="{color: color.theme_color}">
                {{ record.word.word }}
              </div>
              <div class="col-7 d-flex flex-column justify-content-center meaning">
                <template v-if="current_dict==='youdao'">
                  <div v-for="trans in record.word.meaning"
                       class="text-muted d-flex mt-1">
                    <span class="me-2">{{ trans.pos }}</span>
                    <span>{{ trans.tran }}</span>
                  </div>
                </template>
                <template v-if="current_dict==='collins'">
                  <div v-for="trans in record.word.collins"
                       class="text-muted d-flex mt-1">
                    <span class="me-1 flex-shrink-0 color-77"
                          v-if="trans.tran_entry[0].pos_entry"
                          :title="trans.tran_entry[0].pos_entry.pos_tips">{{ trans.tran_entry[0].pos_entry.pos }}</span>
                    <span v-html="trans.tran_entry[0].tran"></span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audio_ref" class="hidden" src=""></audio>
  </div>
<!--切换按钮，中文释义或者柯林斯词典-->
  <div class="change-meaning position-fixed">
    <div class="all-center h-50"
         :class="{'selected-dict': current_dict==='youdao'}"
         @click="current_dict='youdao'">有道词典</div>
    <div class="collins all-center h-50"
         :class="{'selected-dict': current_dict==='collins'}"
         @click="current_dict='collins'">柯林斯词典</div>
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

    > div {
      height: 100%;
      line-height: 74px;
      border-right: #77bbaf solid 2px;
      font-size: 22px;

      div:not(:last-child) {
        border-right: #77bbaf dotted 2px;
      }
    }
  }
  .body-parent{
    margin-left: -12rpx;
  }

  .table-body {
    > .word-list {

      .word-item:nth-child(2n){
        padding-left: 12px;
      }

      .word-item:nth-child(2n+1) {
        border-right: #77bbaf solid 2px;
        padding-right: 12px;
      }

      .row {
        height: 100%;
        border-bottom: #77bbaf dotted 2px;

        > div:not(:last-child) {
          border-right: #77bbaf dotted 2px;
        }
      }
      .row:last-child {
        border-bottom: none;
      }
      .row:nth-child(2n){
        .meaning{
          box-sizing: content-box;
        }
      }

      .col {
        overflow: hidden;
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
  .color-77{
    color: #77bbaf;

  }
}

.change-meaning{
  right: 20px;
  top: 100px;
  width: 150px;
  height: 100px;
  border-radius: 10px;
  border: 2px solid #77bbaf;
  cursor: pointer;
  .collins{
    border-top: 2px solid #77bbaf;
  }
  .selected-dict{
    background-color: #77bbaf;
    color: white;
  }
}
</style>