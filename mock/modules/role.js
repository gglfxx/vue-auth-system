const Mock = require('mockjs')
const { deepClone } = require('@/utils/index')
const { asyncRoutes, constantRoutes } = require('./routes')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: '管理',
    description: '超级管理员.有权查看所有页面',
    routes: routes
  },
  {
    key: 'editor',
    name: '编辑',
    description: '普通编辑器.可以查看除权限页以外的所有页',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'guest',
    name: '游客',
    description: '只是个访客.只能看到主页和文档页',
    routes: [{
      path: '',
      redirect: 'authSys',
      children: [
        {
          path: 'authSys',
          name: 'AuthSys',
          meta: { title: '首页', icon: 'home' }
        }
      ]
    }]
  }
]

module.exports = [
  // mock get all routes form server
  {
    url: '/role/getRoutes',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/role/getRoles',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/role/addRole',
    type: 'post',
    response: {
      code: 200,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/role/updateRole',
    type: 'post',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/role/deleteRole',
    type: 'post',
    response: {
      code: 200,
      data: {
        status: 'success'
      }
    }
  }
]
