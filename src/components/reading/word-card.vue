<script setup>
import {defineProps, ref, watch} from 'vue'
import { get_youdao_translate } from "@/assets/ts/utils";

const props = defineProps({
    word: String,
})

// 获取单词的释义
let dirty = ref(true)
const translate = ref({})
watch(() => props.word, async (new_word) => {
  let res = await get_youdao_translate(3, new_word)
  if (res && res.data){
    translate.value = res.data.entries
    dirty.value = false
  }
})

</script>

<template>
  <div v-if="!dirty" class="card word-card">
    <div class="card-header d-flex justify-content-between">
      <div>{{ word }}</div>
      <div class="pronunciation d-flex">
        <span>英 <i class="iconfont icon-fayin"></i></span>
        <span>美 <i class="iconfont icon-fayin"></i></span>
      </div>
    </div>
    <div class="card-body p-0">
      <ul class="list-group list-group-flush">
        <li v-for="item in translate"
            class="list-group-item">
          <div class="web-word">{{ item.entry }}</div>
          <div>{{ item.explain }}</div>
        </li>
      </ul>
    </div>
    <div class="card-footer">
      <div class="btn btn-primary float-end">添加</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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