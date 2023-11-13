// 封装购物车相关接口
// 加入购物车
import http from '@/utils/http'
export const insertCartAPI = ({ skuId, count }) => {
    return http({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}
// 获取最新的购物车接口
export const findNewCartListAPI = () => {
    return http({
        url: '/member/cart',
        method: 'GET'
    })
}

// 删除购物车
export const delCartAPI = (ids) => {
    return http({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

// 合并购物车
export const mergeCartAPI = (data) => {
    return http({
        url: '/member/cart/merge',
        method: 'POST',
        data
    })
}