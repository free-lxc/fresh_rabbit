import http from '@/utils/http'

export function getCategoryApi() {
    return http({
        url: '/home/category/head'
    })
}