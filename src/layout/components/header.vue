<script setup>
import {reactive} from "vue";
import {useColorStore} from "@/store/counter";

// 设置背景色
const color = useColorStore();
function change_theme(item) {
  color.update_theme_color(item.theme_color)
  color.update_tab_color(item.tab_color)
}
const tabs = reactive([
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Word',
    path: '/word'
  },
  {
    name: 'Reading',
    path: '/reading'
  },
  {
    name: 'About',
    path: ''
  },
])

</script>

<template>
  <div class="header container-fluid d-none d-xl-block mb-5 position-fixed top-0 start-0" :style="{backgroundColor: color.theme_color, color: color.tab_color}">
    <div class="container h-100 d-flex justify-content-between align-items-center">
      <ul class="tab row nav nav-pills w-75 h-100">
        <li class="col-1 nav-item h-100 p-0 text-center"
            v-for="tab in tabs"
            @click="$router.push(tab.path)">{{ tab.name }}</li>
      </ul>
      <div class="change_theme dropdown">
        <button class="btn dropdown-toggle text-white"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false">
          切换主题色
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li v-for="item in color.theme_option"
              :key="item.name"
              class="dropdown-item"
              :style="{backgroundColor: item.theme_color, color: item.tab_color}"
              @click="change_theme(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="d-none d-xl-block" style="height: 50px"></div>
</template>

<style scoped lang="scss">
.header {
  height: 50px;
  font-style: italic;
  z-index: 900;
  .tab{

    li {
      cursor: pointer;
      line-height: 50px;
      font-size: 20px;
      transition: .5s;
    }

    li:hover {
      transform: scale(1.2);
    }
  }

  .change_theme{
    ul{
      li{
        cursor: pointer;
      }
      li:hover{
        opacity: 0.8;
      }
    }
  }
}
</style>