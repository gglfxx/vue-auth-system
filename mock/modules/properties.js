const Mock = require('mockjs')
const { getURLParams } = require('@/utils/core')
const util = require('../util')

// 提醒：module.exports不能与import 一起用
const propData = Mock.mock({
  'list|50': [{
    id: '@lower(@guid)',
    code: /[a-z]{5}/,
    name: '@cname',
    sysVal: /[a-z]{6}/,
    createDate: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }]
})
const table = propData.list
module.exports = [
  // user getList
  {
    url: '/config/list',
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
          list: util.filterFieldByTable(result.slice(startIndex, endIndex), 'id', 'code', 'name', 'createDate', 'sysVal'),
          total: result.length
        }
      }
    }
  },

  // get user info
  {
    url: '/config/detail',
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
    url: '/config/update',
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
    url: '/config/remove',
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
