
import { getCategoryApi } from '@/apis/Layout.js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 导航列表数据管理
export const useCategoryStore = defineStore('category', () => {
    const getCategoryList = ref([])
    const getCategory = async () => {
        const res = await getCategoryApi()
        // console.log(res.result)
        getCategoryList.value = res.result
    }
    return {
        getCategoryList,
        getCategory
    }
})
