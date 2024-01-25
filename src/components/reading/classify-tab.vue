<script setup lang="ts">

let props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  current_category: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="h3">分类</div>
    <div>
      <nav class="nav flex-column">
        <div v-for="category in categories"
             :key="category.id"
             class="category-item my-2 ps-2"
             @click="$emit('update_category', category.id)"
             :class="{'active': current_category === category.id}">
          {{ category.name }}
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">

.category-item{
  cursor: pointer;
  color: #303133;
}
.category-item.active{
  color: #409eff;
  border-left: 2px solid #409eff;
}
</style>