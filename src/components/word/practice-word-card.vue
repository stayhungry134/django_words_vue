<script setup>
import {onMounted, ref, watch, defineEmits} from "vue";

// 导入打字的声音
import keydown_audio from '@/assets/audio/keyboard/keyboard_audio.mp3'
import beep_audio from '@/assets/audio/keyboard/beep.wav'

/** 属性模块*/
// props
let props = defineProps({
  // 单词
  word: {
    type: Object,
  },
  // 是否为默写模式
  is_typing: {
    type: Boolean,
    default: true
  },
  // 是否显示释义
  is_meaning: {
    type: Boolean,
    default: true
  },
  // 英音或美音
  accent: {
    type: String,
    default: 'us'
  },
})

/** 单词*/
// 用户输入
let user_input = ref('')
// 错误输入
let error_input = ref('')
// 剩余字符
let remain = ref('')


/** 拼写模块*/
// 进入之后，全局监听键盘事件
onMounted(async () => {
  window.addEventListener('keydown', handle_keydown)
  remain.value = props.word.word
})

// 处理键盘事件
let handle_keydown = (e) => {
  play_keyboard_audio()
  if (remain.value.length === 0){
    // d 表示下一个
    if (e.key === 'd' || e.code === 'Space'){
      memory_word()
    }
    // p 表示发音
    if (e.key === 'p'){
      play_word_audio()
    }
    // s 表示重新拼写
    if (e.key === 's'){
      respell_word()
    }
    return
  }
  if (e.key.match(/^[a-zA-Z,\-']$/)) {
    if (e.key === remain.value[0]){
      user_input.value += e.key
      remain.value = remain.value.slice(1)
    }
    // 如果拼错，就重置单词
    else{
      handle_input_error(e.key)
      play_word_audio()
      play_error_audio()
      reset_word()
    }
  }
}

// 处理用户输入错误
const handle_input_error = (key) => {
  let tem_remain = remain.value
  remain.value = remain.value.slice(1)
  error_input.value = key
  setTimeout(() => {
    error_input.value = ''
  }, 500)
  remain.value = tem_remain
}

// 重新拼写单词
const respell_word = () => {
  user_input.value = ''
  remain.value = props.word.word
}

const emit = defineEmits(['reset_word',  'memory_word'])

// 重置单词
const reset_word = () => {
  emit('reset_word', props.word.word)
}

// 记忆单词
const memory_word = () => {
  emit('memory_word', props.word.word)
}

/** 发音模块*/
// 音频标签

// 单词切换时，播放音频，清空用户输入
watch(() => props.word, () => {
  respell_word()
  play_word_audio()
})

// 点击按钮播放音频
let word_timer = null
function play_word_audio() {
  let type = 2
  if (props.accent === 'uk'){
    type = 1
  }
  const src = `https://dict.youdao.com/dictvoice?type=${type}&audio=${props.word.word}`
  if (word_timer){
    clearTimeout(word_timer)
  }
  word_timer = setTimeout(() => {
    const audio = new Audio(src)
    audio.play();
    clearTimeout(word_timer)
  }, 500)
}


/** 键盘敲击模块*/
const play_keyboard_audio = () => {
  const audio = new Audio(keydown_audio)
  audio.play()
}

const play_error_audio = () => {
  const audio = new Audio(beep_audio)
  audio.play()
}


</script>

<template>
  <div v-if="word" class="typing all-center flex-column py-5">
<!--    释义-->
    <div class="meaning"
         :class="{'disappear': !is_meaning}">
      <div v-for="trans in word.meaning"
           class="text-muted d-flex mt-1">
        <span class="me-2">{{ trans.pos }}</span>
        <span>{{ trans.tran }}</span>
      </div>
    </div>
<!--    单词-->
    <div class="word position-relative">
      <div v-if="!is_typing" class="d-flex animate__animated" :class="{animate__headShake: error_input.length}">
        <span class="spell">{{ user_input }}</span>
        <span class="error">{{ error_input }}</span>
        <span>{{ remain }}</span>
      </div>
      <div v-else class="d-flex animate__animated" :class="{animate__headShake: error_input.length}">
        <span class="spell">{{ user_input }}</span>
        <span class="error">{{ error_input }}</span>
        <span>{{ '_'.repeat(remain.length - error_input.length) }}</span>
      </div>
<!--      发音-->
      <div class="">
        <i class="iconfont icon-laba-xianxing position-absolute end-0 top-50"
           @click="play_word_audio"></i>
      </div>
    </div>
<!--    音标-->
    <div class="phonetic">[{{ word.us_phone }}]</div>
  </div>
</template>

<style scoped lang="scss">
.typing{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 20px;
  .meaning{
    transition: .3s;
    color: #2e2e2e;
  }
  .disappear{
    opacity: 0;
    transform: translateY(-100%);
  }
  //单词
  .word{
    font-size: 48px;
    color: #5b5b5b;
    letter-spacing: 0.5rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
    .icon-laba-xianxing{
      font-size: 2rem;
      cursor: pointer;
      transform: translate(120%, -50%);
    }
    .spell{
      color: #209e85;
    }
    .error {
      color: #f55d5e;
    }
  }
  .phonetic{
    font-size: 20px;
    margin-left: -30px;
    transition: all .3s;
  }
}
</style>