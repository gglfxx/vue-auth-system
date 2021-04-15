const OuterLayout = () => import('@/views/account/')
const Login = () => import('@/views/account/login/')
const Register = () => import('@/views/account/register/')
const Forget = () => import('@/views/account/forget/')

const route = {
  path: '/account',
  component: OuterLayout,
  meta: {
    hiddenInMenu: true
  },
  children: [{
    name: 'login',
    path: '/account/login',
    component: Login,
    meta: {
      title: '登录'
    }
  }, {
    name: 'Register',
    path: '/account/register',
    component: Register,
    meta: {
      title: '注册'
    }
  }, {
    name: 'Forget',
    path: '/account/forget',
    component: Forget,
    meta: {
      title: '忘记密码'
    }
  }]
}

export default route
