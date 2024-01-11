<script setup>
import {Delete, Download, Edit, Share} from "@element-plus/icons-vue";
import {onMounted, ref, reactive, computed, watch} from "vue";

let magazine = reactive({
  id: 1,
  name: "DZWZ2018-07-08",
  image: "http://word.stayhungry134.com:8000/word_media/magazine/RD201801.jpg",
})
// 图片查看器
let show_image_viewer = ref(false)
const show_image = () => {
  show_image_viewer.value = true
}
const close_viewer = () => {
  show_image_viewer.value = false
}

</script>

<template>
<div class="magazine-item">
  <el-card :body-style="{ padding: '0px' }">
    <el-image class="image"
              :src="magazine.image"
              fit="cover"
              :preview-src-list="[magazine.image]"></el-image>
    <div class="p-2">
      <span>{{ magazine.name }}</span>
      <div class="bottom">
        <div class="d-flex mt-2 justify-content-end">
          <el-tooltip content="下载">
            <el-button :icon="Download" />
          </el-tooltip>
          <el-tooltip content="分享">
            <el-button :icon="Share" />
          </el-tooltip>
          <el-button type="primary">阅读</el-button>
        </div>
      </div>
    </div>
  </el-card>

  <el-image-viewer @close="close_viewer" :url-list="[magazine.image]" v-if="show_image_viewer" />
</div>
</template>

<style scoped lang="scss">
.magazine-item{
  width: 250px;
  .image{
  }
}
</style>