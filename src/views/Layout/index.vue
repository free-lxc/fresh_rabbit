<!--  -->
<script setup>
import LayHeader from './components/LayHeader.vue'
import LayFooter from './components/LayFooter.vue'
import LayNav from './components/LayNav.vue'
import LayFixed from './components/LayFixed.vue';
import { onMounted } from 'vue';

import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()
// 同一申请数据，只发送一次请求
onMounted(() => {
    categoryStore.getCategory()
})
</script>

<template>
    <LayFixed />
    <LayNav />
    <LayHeader />
    <!-- 二级路由出口，添加key, 强制销毁重建 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayFooter />
</template>

<style scoped></style>