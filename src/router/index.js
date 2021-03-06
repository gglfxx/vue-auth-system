import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import accountRoute from './modules/account.js'
import authSysRoute from './modules/authSys.js'
import config from '@/config'
import { deepClone } from '@/utils/core'
import InnerLayout from '@/layouts/innerLayout/InnerLayout'

// 用户
import systemRoute from './modules/system.js'
// 个人中心
import mineRoute from './modules/mine'

Vue.use(VueRouter)

// 静态路由
const staticRouteMap = [
  accountRoute, authSysRoute,
  {
  // 跳转到目标地址
    path: '/redirect',
    component: InnerLayout,
    meta: {
      hiddenInMenu: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

// 需要通过角色动态控制的路由表
const dynamicRouteMap = [
  systemRoute, mineRoute, {
    name: '404',
    path: '*',
    redirect: '/error-page/404',
    meta: {
      hiddenInMenu: true
    }
  }
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

// 从路由权限表中获取到角色可访问的路由名称
const getRouteNames = (roles) => {
  let routeNames = []
  const permission = config.permission
  // eslint-disable-next-line no-return-assign
  roles.forEach(role => routeNames = [...new Set([...routeNames, ...permission[role]])])
  return routeNames
}

// 根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames, routeMap) => {
  const acceptedRouteMap = []
  const routes = deepClone(routeMap)
  routes.forEach(route => {
    // 如果一级路由的名称存在路由权限表中，则它之下的所有子路由都可访问
    if (routeNames.includes(route.name)) {
      acceptedRouteMap.push(route)
    } else {
      // 如果一级路由的名称不在路由权限表中，再看它的哪些子路由名称在路由权限表中
      if (route.children) {
        route.children = filterRouteMap(routeNames, route.children)
        // 如果有子路由可访问，再添加。
        if (route.children.length > 0) {
          acceptedRouteMap.push(route)
        }
      }
    }
  })
  return acceptedRouteMap
}

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const outerPaths = ['/account/login', '/account/register', '/account/forget']
  // 动态修改title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // token不存在(说明没登录),但是路由将要进入系统内部，自动跳到登录页面。
  if (!token && !outerPaths.includes(to.path)) {
    next('/account/login')
  } else {
    // 如果token存在(说明已登录)，但是角色不存在(说明没获取到用户信息)，这时应该获取用户信息
    if (token && !store.getters.userInfo.roles) {
      store.dispatch('GetUserInfo').then(res => {
        const roles = res.roles
        const routeNames = getRouteNames(roles)
        const acceptedRouteMap = filterRouteMap(routeNames, dynamicRouteMap)
        // 动态注册路由
        router.addRoutes(acceptedRouteMap)
        store.commit('SET_ROUTE_MAP', [...staticRouteMap, ...acceptedRouteMap])
        //  中断当前导航，重新导航到当前路由。刷新页面之后，会重新注册路由，这样可以确保路由注册完毕后，再进入。
        // replace: true 是为了防止在history中留下之前中断的导航的记录。
        next({ path: to.path, replace: true })
      })
    } else {
      next()
    }
  }
})

export { resetRouter }

export default router
