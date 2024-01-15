<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import pdfViewer from "@/assets/js/pdf-viewer";
import {ElMessage} from "element-plus";

const ADOBE_KEY = '9861538238544ff39d37c6841344b78d';

let AdobeDC = ref(null);

let magazine_name = ref('');
let magazine_src = ref('');


onMounted(async () => {
  pdfViewer()
  const router = useRoute()
  magazine_name.value = router.query.name
  magazine_src.value = router.query.local_path
  if (window.AdobeDC && magazine_src.value && magazine_name.value) {
    AdobeDC.value = window.AdobeDC
    previewPDF()
  }
})

// pdf 阅读器配置
const previewConfig = {
  // 模式
  embedMode: "FULL_WINDOW",
  // 显示下载按钮
  showDownloadPDF: true,
  // 显示变焦？控制
  // showZoomControl: true,
  // // 启用注释API
  // enableAnnotationAPIs: true,
  // // 显示现有注释API
  // includePDFAnnotations: true,
}

// 保存参数
const saveOptions = {
  // 自动保存频率
  autoSaveFrequency: 0,
  // 如果设置为 true，当用户焦点转移时，就会保存，比如当用户切换到另一个应用程序或浏览器选项卡时。
  enableFocusPolling: true,
  // 是否显示保存按钮
  showSaveButton: true,
}


const previewPDF = () => {
  let adobeDCView = new AdobeDC.value.View({clientId: ADOBE_KEY, divId: "adobe-dc-view"});
  adobeDCView.previewFile({
    content: {location: {url: magazine_src.value}},
    metaData: {fileName: magazine_name.value}
  }, previewConfig);

  adobeDCView.registerCallback(
      AdobeDC.value.View.Enum.CallbackType.SAVE_API,
      function (metaData, content, options) {
        upload_file(metaData, content)
        /* Add your custom save implementation here...and based on that resolve or reject response in given format */
        return new Promise((resolve, reject) => {
          resolve({
            code: AdobeDC.value.View.Enum.ApiResponseCode.SUCCESS,
            data: {
              /* Updated file metadata after successful save operation */
              metaData: {fileName: magazine_name.value}
            }
          });
        });
      },
      saveOptions
  );
}

// 上传文件
const upload_file = async (meta_data, content) => {
  let api_url = 'word_api/reading/magazine/'
  let form_data = new FormData()
  form_data.append('file', new Blob([content]))
  form_data.append('name', meta_data.fileName)
  form_data.append('size', meta_data.fileSize)
  form_data.append('type', meta_data.mimeType)
  let response = await fetch(api_url, {
    method: 'POST',
    body: form_data,
    headers: {
      'Authorization': 'JWT ' + localStorage.getItem('token')
    }
  })
  let result = await response.json()
  if (result.msg === 'success') {
    ElMessage({
      message: '自动保存成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '自动保存失败',
      type: 'error'
    })
  }


}


</script>

<template>
  <div id="adobe-dc-view"></div>
</template>

<style scoped lang="scss">
#adobe-dc-view {
  width: calc(100vw - 40px);
  height: calc(100vh - 70px);
}
</style>