<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  sentence: String,
})

let trans = ref('')
// 翻译句子
const translate = async (sentence) => {
  let data = {
    q: sentence,
    from: 'en',
    to: 'zh-CHS',
  }
  let res = await fetch('https://aidemo.youdao.com/trans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data),
  }).then(response => response.json())
  if (res && res.translation)
    trans.value = res.translation[0]
}
watch(() => props.sentence, async (new_sentence) => {
  await translate(new_sentence)
})

</script>

<template>
  <div class="trans-card card">
    <div class="card-body">
      {{ trans }}</div>
  </div>
</template>

<style scoped lang="scss">
.trans-card{
  z-index: 3;
  background-color: white;
  -webkit-box-shadow: 0 2px 10px 0 rgba(170, 170, 170, 0.5);
  box-shadow: 0 2px 10px 0 rgba(170, 170, 170, 0.5);
}
</style>