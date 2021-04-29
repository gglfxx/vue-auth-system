const InnerLayout = () => import('@/layouts/innerLayout/InnerLayout')
const AuthSys = () => import('@/views/main/index')

// 主页设置
const route = {
  path: '/authSys',
  component: InnerLayout,
  redirect: '/authSys/index',
  meta: {
    title: '首页',
    icon: 'home'
  },
  children: [{
    name: 'AuthSys',
    path: '/authSys/index',
    component: AuthSys,
    meta: {
      title: '首页',
      activePath: '/authSys',
      affix: true
    }
  }]
}
export default route
