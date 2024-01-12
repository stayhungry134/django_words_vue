<script setup>
import {onBeforeMount, onMounted, ref, watch} from 'vue';

const ADOBE_KEY = '9861538238544ff39d37c6841344b78d';

let pdfAPIReady = ref(false);
let adobeDCView = ref(null);
let pdfSelected = ref(false);
let AdobeDC = ref(null);

let fileInput = ref(null);

onMounted(()=>{
  if (window.AdobeDC) {
    pdfAPIReady.value = true
    AdobeDC.value = window.AdobeDC
    previewPDF()
  }
})

const previewPDF = () =>{
  console.log('我们开始吧！')
  let adobeDCView = new AdobeDC.value.View({clientId: ADOBE_KEY, divId: "adobe-dc-view"});
  adobeDCView.previewFile({
    content:   {location: {url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
    metaData: {fileName: "Bodea Brochure.pdf"}
  });
}

</script>

<template>
  <div id="adobe-dc-view"></div>
</template>

<style scoped lang="scss">
#adobe-dc-view{
  width: 100vw;
  height: 100vh;
}
</style>