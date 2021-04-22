const InnerLayout = () => import('@/layouts/innerLayout/InnerLayout')
const User = () => import('@/views/system/user/User')

const route = {
  name: 'System',
  path: '/system',
  component: InnerLayout,
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [{
    name: 'User',
    path: '/system/user',
    component: User,
    meta: {
      title: '用户管理',
      icon: 'user'
    }
  }]
}

export default route
