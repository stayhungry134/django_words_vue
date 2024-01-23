<script setup>
import {defineProps, ref, watch} from 'vue'

const props = defineProps({
    word: String,
})

const translate = async (word) => {
  const response = await fetch(`/word_api/word/?word=${word}`)
  return await response.json()
}

/** 获取单词的释义*/
const translation = ref()
watch(() => props.word, async (new_word) => {
  let res = await translate(new_word)
  console.log(res)
  if (res){
    translation.value = res
  }
})

/** 点击发音*/
const audio_ref = ref(null)
// 点击按钮播放音频
function play_audio(type, word) {
  const url = 'http://dict.youdao.com/dictvoice?'
  audio_ref.value.src = `${url}type=${type}&audio=${word}`
  audio_ref.value.play();
}

</script>

<template>
  <div @mouseleave="$emit('hide_card')" class="card word-card">
    <div class="card-header d-flex justify-content-between">
      <div>{{ word }}</div>
      <div class="pronunciation d-flex">
        <span @click="play_audio(1, word)">英 <i class="iconfont icon-fayin"></i></span>
        <span @click="play_audio(2, word)">美 <i class="iconfont icon-fayin"></i></span>
      </div>
    </div>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush">
        <li v-for="item in translation"
            class="list-group-item d-flex">
          <div class="pos me-2">{{ item.pos }}</div>
          <div>{{ item.tran }}</div>
        </li>
      </ul>
    </div>
    <audio ref="audio_ref" class="hidden" src=""></audio>
  </div>
</template>

<style scoped lang="scss">
.word-card {
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
  .pos{
    font-size: 1.2em;
    color: #28bea0;
  }
}
</style>