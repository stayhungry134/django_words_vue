<script setup>
import {Delete, Download, Edit, Share} from "@element-plus/icons-vue";
import {onMounted, ref, reactive, computed, watch, defineProps} from "vue";
import {ElMessage} from "element-plus";

let props = defineProps({
  book: {
    type: Object,
    default: () => {
    }
  }
})

</script>

<template>
  <div v-if="book" class="book-item mx-4 mb-5">
    <el-card :body-style="{ padding: '0px'}" class="position-relative">
      <el-image v-if="book.cover" class="image"
                :src="book.cover"
                fit="cover"
                :preview-src-list="[book.cover]"></el-image>
      <div class="p-2">
        <span>{{ book.name }}</span>
        <div class="bottom">
          <div class="d-flex mt-2 justify-content-between align-items-center">
            <div class="text-truncate me-3">{{ book.title_cn }}</div>
            <el-button type="primary"
                       @click="$router.push(`/reading/book-reader/?id=${book.id}`)">
              阅读
            </el-button>
          </div>
        </div>
      </div>
      <div class="percentage all-center position-absolute text-white">
        {{ book.completion_percentage }}%
      </div>
    </el-card>

    <el-image-viewer @close="close_viewer" :url-list="[book.image]" v-if="show_image_viewer"/>
  </div>
</template>

<style scoped lang="scss">
.book-item {
  width: 250px;
  .image {
  }
  .percentage{
    right: 15px;
    top: 0;
    width: 30px;
    height: 35px;
    font-size: 14px;
    z-index: 9;
    background: url("@/assets/icon/bookmark.png") no-repeat center center / 100% 100%;
  }
}
</style>