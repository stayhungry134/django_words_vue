<script setup>
import Header from './components/header.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header height="50px">
                <Header />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>

</style>