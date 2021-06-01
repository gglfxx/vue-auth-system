const Mock = require('mockjs')
const { getURLParams } = require('@/utils/core')
const util = require('../util')

// 提醒：module.exports不能与import 一起用
const userData = Mock.mock({
  'list|127': [{
    id: '@lower(@guid)',
    username: /^[a-zA-Z0-9_]{5,10}$/,
    name: '@cname',
    mobilePhone: /^1[345789]\d{9}$/,
    gender: '@pick(["1", "2"])',
    age: '@natural(20,60)',
    roles: '@pick(["admin", "guest","editor"])'.split(),
    createDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
    consume: '@natural(0,10000)',
    avatar: 'https://picsum.photos/200/200/?random',
    email: '@email'
  }]
})

const table = userData.list
module.exports = [
  // user getList
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      const { name, page = 1, pageSize = config.query.limit } = getURLParams(config.url)
      const result = table.filter(row => {
        let validName = false
        validName = row.name.includes(name)
        return validName
      })
      const startIndex = (Number(page) - 1) * Number(pageSize)
      const endIndex = startIndex + Number(pageSize)
      return {
        code: 200,
        data: {
          list: util.filterFieldByTable(result.slice(startIndex, endIndex), 'id', 'username', 'name', 'mobilePhone', 'gender', 'email', 'roles', 'createDate', 'age'),
          total: result.length
        }
      }
    }
  },

  // get user info
  {
    url: '/user/detail',
    type: 'get',
    response: config => {
      const { id } = getURLParams(config.url)
      return {
        code: 200,
        data: util.find(table, id)
      }
    }
  },

  // user update
  {
    url: '/user/update',
    type: 'post',
    response: config => {
      const { id } = getURLParams(config.url)
      return {
        code: 200,
        data: util.find(table, id)
      }
    }
  },
  {
    url: '/user/remove',
    type: 'post',
    response: config => {
      const { id } = window.JSON.parse(config.body)
      util.remove(table, id)
      return {
        code: 200,
        data: {}
      }
    }
  }
]
