// 封装购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - addCart
    // 添加购物车
    const addCart = async (goods) => {
        if (isLogin.value) {
            const { skuId, count } = goods
            // 登录之后的加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updateStoreList()
        } else {
            // console.log('添加', goods)
            // 添加购物车操作
            // 已添加过 - count + 1
            // 没有添加过 - 直接push
            // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count++
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }

    }
    // 删除商品
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCart(skuId)
            updateStoreList()
        } else {
            cartList.value = cartList.value.filter((item) => item.skuId != skuId)
        }
    }
    // 总数量
    const allCount = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count, 0)
    })
    // 总价钱
    const allPrice = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    })
    // 修改选中状态-单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    // 是否全选
    const isAll = computed(() => {
        return cartList.value.every((item) => item.selected)
    })
    // 全选功能
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    // 已选择数量
    const selectedCount = computed(() => {
        return cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0)
    })
    // 已选择商品价钱
    const selectedPrice = computed(() => {
        return cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0)
    })
    // 获取最新商品列表
    const updateStoreList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    // 清除购物车
    const clearCart = () => {
        cartList.value = []
    }
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateStoreList
    }
}, {
    persist: true,
})