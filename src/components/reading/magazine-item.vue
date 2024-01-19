<script setup>
import {Delete, Download, Edit, Share} from "@element-plus/icons-vue";
import {onMounted, ref, reactive, computed, watch, defineProps} from "vue";
import {ElMessage} from "element-plus";

let props = defineProps({
  magazine: {
    type: Object,
    default: () => {
    }
  }
})
// 图片查看器
let show_image_viewer = ref(false)
const show_image = () => {
  show_image_viewer.value = true
}
const close_viewer = () => {
  show_image_viewer.value = false
}

// 下载文件
const download_file = () => {
  if (!props.magazine.local_path) {
    ElMessage({
      message: '该杂志暂时无法下载',
      type: 'warning'
    })
    return
  }
  fetch(props.magazine.local_path).then(response => {
    return response.blob()
  }).then(blob => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = props.magazine.name
    a.click()
    window.URL.revokeObjectURL(url)
  })
}

</script>

<template>
  <div v-if="magazine" class="magazine-item mx-4 mb-5">
    <el-card :body-style="{ padding: '0px' }">
      <el-image class="image"
                :src="magazine.cover.replace('magazine_cover', 'magazine_cover/compress')"
                fit="cover"
                :preview-src-list="[magazine.cover]"></el-image>
      <div class="p-2">
        <span>{{ magazine.name }}</span>
        <div class="bottom">
          <div class="d-flex mt-2 justify-content-end">
            <el-tooltip content="下载">
              <el-button :icon="Download" @click="download_file"/>
            </el-tooltip>
            <el-tooltip content="分享">
              <el-button :icon="Share"/>
            </el-tooltip>
            <el-button type="primary"
                       @click="$router.push(`/reading/pdf-reader/?name=${magazine.name}&local_path=${magazine.local_path}`)">
              阅读
            </el-button>
          </div>
        </div>
      </div>
    </el-card>

    <el-image-viewer @close="close_viewer" :url-list="[magazine.image]" v-if="show_image_viewer"/>
  </div>
</template>

<style scoped lang="scss">
.magazine-item {
  width: 250px;

  .image {
  }
}
</style>