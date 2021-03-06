const InnerLayout = () => import('@/layouts/innerLayout/InnerLayout')
const User = () => import('@/views/system/user/User')
const Role = () => import('@/views/system/role/Role')
const Properties = () => import('@/views/system/properties/Properties')

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
  }, {
    name: 'Role',
    path: '/system/role',
    component: Role,
    meta: {
      title: '角色管理',
      icon: 'role'
    }
  }, {
    name: 'Properties',
    path: '/system/properties',
    component: Properties,
    meta: {
      title: '配置管理',
      icon: 'properties'
    }
  }
  ]
}

export default route
