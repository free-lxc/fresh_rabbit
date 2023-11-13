import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el：指的是绑定的元素
                // binding：binding.value 指的是等号后面绑定的表达式的值
                // console.log(el, binding.value)
                const { stop } = useIntersectionObserver(
                    el,
                    // 判断图片是否进入视口区域
                    ([{ isIntersecting }], observerElement) => {
                        // console.log(isIntersecting)
                        if (isIntersecting) {
                            el.src = binding.value
                            // 手动停止监听
                            stop()
                        }
                    },
                )
            }
        })
    }
}