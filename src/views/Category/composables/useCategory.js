// 封装分类数据业务相关代码

import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { getCategoryApi } from '@/apis/category';
import { ref, onMounted } from 'vue';
export const useCategory = () => {
    const route = useRoute()
    const getCategoryData = ref({})
    const categoryStore = async (id = route.params.id) => {
        const res = await getCategoryApi(id)
        getCategoryData.value = res.result
    }
    onMounted(() => {
        categoryStore()
    })
    onBeforeRouteUpdate((to) => {
        categoryStore(to.params.id)
    })
    return {
        getCategoryData
    }
}