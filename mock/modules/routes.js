// Just a mock data
const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/',
    component: 'layouts/innerLayout/InnerLayout',
    redirect: '/authSys',
    meta: {
      title: '首页',
      icon: 'home'
    },
    children: [{
      name: 'AuthSys',
      path: 'authSys',
      component: 'views/main/index',
      meta: {
        title: '首页',
        icon: 'home',
        affix: true
      }
    }]
  },
  {
    path: '/account',
    component: '@/layouts/outerLayout/OuterLayout',
    meta: {
      title: '登陆管理',
      hiddenInMenu: true
    },
    children: [{
      name: 'login',
      path: '/account/login',
      component: 'views/account/login/login',
      meta: {
        title: '登录'
      }
    }, {
      name: 'Register',
      path: '/account/register',
      component: 'views/account/register/register',
      meta: {
        title: '注册'
      }
    }, {
      name: 'Forget',
      path: '/account/forget',
      component: 'views/account/forget/forget',
      meta: {
        title: '忘记密码'
      }
    }]
  }
]

const asyncRoutes = [
  {
    name: 'System',
    path: '/system',
    component: 'layouts/innerLayout/InnerLayout',
    meta: {
      title: '系统管理',
      icon: 'system'
    },
    children: [{
      name: 'User',
      path: '/system/user',
      component: 'views/system/user/User',
      meta: {
        title: '用户管理',
        icon: 'user'
      }
    }, {
      name: 'Role',
      path: '/system/role',
      component: 'views/system/role/Role',
      meta: {
        title: '角色管理',
        icon: 'role'
      }
    }, {
      name: 'Properties',
      path: '/system/properties',
      component: 'views/system/properties/Properties',
      meta: {
        title: '配置管理',
        icon: 'properties'
      }
    }
    ]
  },
  {
    path: '/mine',
    component: 'layouts/innerLayout/InnerLayout',
    redirect: '/mine/index',
    meta: {
      title: '个人中心',
      hiddenInMenu: true
    },
    children: [{
      name: 'Mine',
      path: '/mine/index',
      component: 'views/mine/index',
      meta: {
        title: '个人中心'
      }
    }]
  },
  {
    name: 'ErrorPages',
    path: '/error',
    component: 'layouts/innerLayout/InnerLayout',
    meta: {
      title: '错误页面',
      icon: '404'
    },
    children: [{
      path: '404',
      component: 'views/error-page/404',
      name: 'Page404',
      meta: { title: '404页面' }
    }]
  }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
