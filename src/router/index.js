// 创建router实例对象
// 创建history模式路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartList',
          component: CartList
        },
        {
          path: 'checkOut',
          component: CheckOut
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback', // 注意路径，必须是paycallback
          component: PayBack
        },

      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
  // 路由行为的配置项,切换路由时自动滚动到顶部
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
