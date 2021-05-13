const InnerLayout = () => import('@/layouts/innerLayout/InnerLayout')
const AuthSys = () => import('@/views/main/index')

// 主页设置
const route = {
  path: '/',
  component: InnerLayout,
  redirect: '/authSys',
  meta: {
    title: '首页',
    icon: 'home'
  },
  children: [{
    name: 'AuthSys',
    path: 'authSys',
    component: AuthSys,
    meta: {
      title: '首页',
      icon: 'home',
      affix: true
    }
  }]
}
export default route
