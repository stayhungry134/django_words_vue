<script setup>
import { onMounted, ref } from "vue";

/** 单词*/
let word = ref('cancel')
// 用户输入
let user_input = ref('')
// 剩余字符
let remain = ref(word.value)

/** 拼写模块*/
// 进入之后，全局监听键盘事件
onMounted(() => {
  window.addEventListener('keydown', handle_keydown)
})

let handle_keydown = (e) => {
  // 如果用户输入的是字母
  if (e.key.match(/[a-zA-Z]/)) {
    if (e.key === remain.value[0]){
      user_input.value += e.key
      remain.value = remain.value.slice(1)
    }
    if (remain.value.length === 0){
      // d 表示下一个
      if (e.key === 'd'){
        console.log('下一个')
      }
      // p 表示发音
      if (e.key === 'p'){
        console.log('发音')
      }
      // s 表示重新拼写
      if (e.key === 's'){
        console.log('重新拼写')
        reset_word()
      }
    }
  }
}

// 重置单词
let reset_word = () => {
  user_input.value = ''
  remain.value = word.value
}

</script>

<template>
  <div class="typing all-center flex-column bg-info">
<!--    释义-->
    <div class="meaning">
      <div class="d-flex">
        <div>vt.</div>
        <div>取消、抵消、偿还</div>
      </div>
      <div class="d-flex">
        <div>vt.</div>
        <div>取消、抵消、偿还</div>
      </div>
      <div class="d-flex">
        <div>vt.</div>
        <div>取消、抵消、偿还</div>
      </div>
    </div>
<!--    单词-->
    <div class="word position-relative">
      <div v-if="1">
        <span class="spell">{{ user_input }}</span>
        <span>{{ remain }}</span>
      </div>
      <div v-else class="d-flex">
        <span class="spell">{{ user_input }}</span>
        <span>{{ '_'.repeat(remain.length) }}</span>
      </div>
<!--      发音-->
      <i class="iconfont icon-laba-xianxing fs-2"></i>
    </div>
<!--    音标-->
    <div class="phonetic">[ˈkænsəl]</div>
  </div>
</template>

<style scoped lang="scss">
.typing{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 20px;
  .meaning{
    color: #2e2e2e;
  }
  .word{
    font-size: 48px;
    color: #5b5b5b;
    letter-spacing: 0.5rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
    .spell{
      color: #209e85;
    }
  }
  .phonetic{
    font-size: 20px;
    margin-left: -30px;
    transition: all .3s;
  }
}
</style>