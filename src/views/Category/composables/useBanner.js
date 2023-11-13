// 封装Banner轮播图相关

import { getBannerAPI } from '@/apis/Home.js'
import { onMounted, ref } from 'vue';
export const useBanner = () => {
    // 获取轮播图数据
    const bannerList = ref([])
    const getBannerList = async () => {
        const res = await getBannerAPI({
            distributionSite: '2'
        })
        bannerList.value = res.result
    }
    onMounted(() => {
        getBannerList()
    })
    return {
        bannerList
    }
}