import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import accountRoute from './module/account.js'

Vue.use(VueRouter)

const staticRouteMap = [{
  path: '/',
  redirect: '/dashboard',
  meta: {
    hiddenInMenu: true
  }
},
accountRoute
]
const createRouter = () => new VueRouter({
  // mode: 'history',    //需要服务端支持
  routes: staticRouteMap,
  scrollBehavior (to, from, savedPosition) {
    // 本项目布局使用的是.inner-layout__page滚动，scrollBehavior返回的位置是指window的滚动，所有滚动不会生效。
    const innerPage = document.querySelector('.inner-layout__page')
    if (innerPage) {
      innerPage.scrollTo(0, 0)
    }
    return { x: 0, y: 0 }
  }
})

const router = createRouter()

// 退出登录的时候执行，防止重复注册路由
const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const outerPaths = ['/account/login', '/account/register', '/account/forget']
  // token不存在(说明没登录),但是路由将要进入系统内部，自动跳到登录页面。
  if (!token && !outerPaths.includes(to.path)) {
    next('/account/login')
  } else {
    // 如果token存在(说明已登录)，但是角色不存在(说明没获取到用户信息)，这时应该获取用户信息
    if (token && !store.getters.userInfo.roles) {

    } else {
      next()
    }
  }
})

export { resetRouter }

export default router
