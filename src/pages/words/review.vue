<script setup>
import PracticeWordCard from "@/components/word/practice-word-card.vue";
import { onMounted, ref, unref } from "vue";
import { ElMessage } from "element-plus";

/** 菜单模块*/
// 获取今天的日期并格式化
const today = new Date().toLocaleDateString()
// 点击折叠菜单
let menu_fold = ref(false)
const fold_menu = () =>{
  menu_fold.value = !menu_fold.value
}
// 是否为默写模式
let is_typing = ref(false)
const change_typing = () => {
  is_typing.value = !is_typing.value
}
// 是否显示释义
let is_meaning = ref(true)
const change_meaning = () => {
  is_meaning.value = !is_meaning.value
}
// 发音选项
let pronounce_btn = ref()
let pronounce_pop = ref()
let pronounce = ref('us')
// 选择发音
const show_pronounce_choice = () => {
  unref(pronounce_pop)?.popperRef?.delayHide?.()
}


/** 单词模块*/
let word_pager = ref(null)
let word_list = ref([])
// 现在记忆的单词
let now_word = ref(null)

// 单词记忆次数映射(3次之后就提交)
const word_memory_map = ref({})
// 获取单词单词
const get_word = async () => {
  const response = await fetch('/word_api/word/remind/')
  word_pager.value = await response.json()
  word_pager.value.items.forEach(item => {
    word_list.value.push(item)
    word_memory_map.value[item.word.word] = 0
  })
}
onMounted(async () => {
  await get_word()
  now_word.value = word_list.value[0].word
})

// 下一个单词
const next_word = () =>{
  // 随机一个单词作为现在的单词
  if (word_list.value.length === 0){
    now_word.value = null
  }
  now_word.value = word_list.value[Math.floor(Math.random() * word_list.value.length)].word
  // 如果单词是第一次记忆，就显示原单词
  if (word_memory_map.value[now_word.value.word] === 0){
    is_typing.value = false
  }
  else {
    is_typing.value = true
  }
  // 如果小于5个还有下一页的话就获取单词
  if (word_list.value.length <= 5 && word_pager.value.has_next){
    get_word()
  }
}
// 记忆单词
const memory_word = (word) => {
  // 记忆次数加一
  word_memory_map.value[word] += 1
  // 如果记忆次数大于3次，就提交，并移除该单词
  if (word_memory_map.value[word] >= 3){
    submit_word(word)
    // 移除该单词
    word_list.value = word_list.value.filter(item => item.word.word !== word)
  }
  // 记忆下一个单词
  next_word()
}
// 提交记忆单词
const submit_word = async (word) => {
  const response = await fetch('/word_api/word/remind/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // 设置请求头为 JSON 类型
    },
    body: JSON.stringify({
      word_list: [word],
    })
  })
  let data = await response.json()
  if (data && data.msg === 'success'){
    ElMessage.success(`${word} 已完成记忆`)
  }
}
// 重置单词
const reset_word = (word) => {
  word_memory_map.value[word] = 0
}

</script>

<template>
  <div class="practice container my-5">
    <div class="word-tab w-75 mx-auto d-flex justify-content-between align-items-center px-4">
      <div>{{ today }}</div>

      <div class="d-flex">
        <div class="icon-folder"
             :class="{ 'menu-folded': menu_fold }">
          <!--        icon-yanjing_xianshi-->
          <el-tooltip content="是否为默写模式">
            <i class="iconfont"
               :class="is_typing ? 'icon-yanjing-yincang' : 'icon-yanjing_xianshi'"
               @click="change_typing"></i>
          </el-tooltip>
          <el-tooltip content="是否显示释义">
            <i class="iconfont"
               :class="is_meaning? 'icon-caozuo-fanyi-full': 'icon-fanyi'"
               @click="change_meaning"></i>
          </el-tooltip>
          <el-tooltip content="发音选项">
            <i ref="pronounce_btn"
               @click="show_pronounce_choice"
               class="iconfont icon-laba-xianxing"></i>
          </el-tooltip>
          <el-popover
              ref="popover_ref"
              :virtual-ref="pronounce_btn"
              trigger="click"
              title="音效设置"
              virtual-triggering
          >
            <div class="d-flex">
              <div class="label">发音口音</div>
              <el-select v-model="pronounce">
                <el-option label="美音" value="us"/>
                <el-option label="英音" value="uk"/>
              </el-select>
            </div>
          </el-popover>
        </div>
        <div>
          <el-tooltip content="设置">
            <i class="iconfont icon-31shezhi"></i>
          </el-tooltip>
          <i class="iconfont icon-shouqicaidan"
             @click="fold_menu"></i>
        </div>
      </div>
    </div>
<!--    记忆单词的卡片-->
    <div v-if="now_word" class="w-75 mx-auto">
      <practice-word-card
          :is_typing="is_typing"
          :is_meaning="is_meaning"
          :word="now_word"
          @memory_word="memory_word"
          @reset_word="reset_word">
      </practice-word-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.practice{
  .word-tab{
    height: 70px;
    background: #f0f2f4;
    color: #209e85;
    border: 1px solid #e2e2e2;
    box-shadow: rgba(0, 0, 0, .08) 0 4px 12px;
    border-radius: 10px;
    font-size: 20px;
    .iconfont{
      padding: 2px;
      margin-left: 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 30px;
    }
    .icon-folder{
      width: 165px;
      transition: all .3s ease-in-out;
      overflow: hidden;
    }
    .menu-folded{
    width: 0;
    }
    .iconfont:hover{
      color: white;
      background: #209e85;
    }
  }
}
</style>