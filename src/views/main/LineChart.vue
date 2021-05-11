<template>
  <el-row class="line-chart" :gutter="30">
    <el-col :lg="12" :sm="24">
      <p class="title">周{{ chartName }}增长趋势图</p>
      <div id="weekChartContainer"></div>
    </el-col>

    <el-col :lg="12" :sm="24">
      <p class="title">月{{ chartName }}增长趋势图</p>
      <div id="monthChartContainer"></div>
    </el-col>
  </el-row>
</template>

<script>
import * as G2 from '@antv/g2'
// import api from '@/api'

const TYPE_NAME_MAP = {
  visits: '访问量',
  messages: '评论数量',
  purchases: '商品数量',
  shopping: '购买数量'
}
const weekLineData = {
  visits: [{
    value: 34,
    date: '2021/5/5'
  }, {
    value: 91,
    date: '2021/5/6'
  }, {
    value: 54,
    date: '2021/5/7'
  }, {
    value: 14,
    date: '2021/5/8'
  }, {
    value: 61,
    date: '2021/5/9'
  }, {
    value: 77,
    date: '2021/5/10'
  }, {
    value: 117,
    date: '2021/5/11'
  }],
  messages: [{
    value: 41,
    date: '2021/5/5'
  }, {
    value: 72,
    date: '2021/5/6'
  }, {
    value: 53,
    date: '2021/5/7'
  }, {
    value: 18,
    date: '2021/5/8'
  }, {
    value: 77,
    date: '2021/5/9'
  }, {
    value: 58,
    date: '2021/5/10'
  }, {
    value: 34,
    date: '2021/5/11'
  }],
  purchases: [{
    value: 4,
    date: '2021/5/5'
  }, {
    value: 7,
    date: '2021/5/6'
  }, {
    value: 9,
    date: '2021/5/7'
  }, {
    value: 1,
    date: '2021/5/8'
  }, {
    value: 6,
    date: '2021/5/9'
  }, {
    value: 3,
    date: '2021/5/10'
  }, {
    value: 5,
    date: '2021/5/11'
  }],
  shopping: [{
    value: 26,
    date: '2021/5/5'
  }, {
    value: 28,
    date: '2021/5/6'
  }, {
    value: 28,
    date: '2021/5/7'
  }, {
    value: 25,
    date: '2021/5/8'
  }, {
    value: 0,
    date: '2021/5/9'
  }, {
    value: 25,
    date: '2021/5/10'
  }, {
    value: 28,
    date: '2021/5/11'
  }]
}
const monthLineData = {
  visits: [{
    value: 72,
    date: '2021/4/11'
  }, {
    value: 181,
    date: '2021/4/12'
  }, {
    value: 9,
    date: '2021/4/13'
  }, {
    value: 52,
    date: '2021/4/14'
  }, {
    value: 68,
    date: '2021/4/15'
  }, {
    value: 104,
    date: '2021/4/16'
  }, {
    value: 135,
    date: '2021/4/17'
  }, {
    value: 183,
    date: '2021/4/18'
  }, {
    value: 71,
    date: '2021/4/19'
  }, {
    value: 100,
    date: '2021/4/20'
  }, {
    value: 43,
    date: '2021/4/21'
  }, {
    value: 78,
    date: '2021/4/22'
  }, {
    value: 102,
    date: '2021/4/23'
  }, {
    value: 187,
    date: '2021/4/24'
  }, {
    value: 44,
    date: '2021/4/25'
  }, {
    value: 27,
    date: '2021/4/26'
  }, {
    value: 15,
    date: '2021/4/27'
  }, {
    value: 33,
    date: '2021/4/28'
  }, {
    value: 52,
    date: '2021/4/29'
  }, {
    value: 83,
    date: '2021/4/30'
  }, {
    value: 109,
    date: '2021/5/1'
  }, {
    value: 61,
    date: '2021/5/2'
  }, {
    value: 113,
    date: '2021/5/3'
  }, {
    value: 8,
    date: '2021/5/4'
  }, {
    value: 80,
    date: '2021/5/5'
  }, {
    value: 136,
    date: '2021/5/6'
  }, {
    value: 72,
    date: '2021/5/7'
  }, {
    value: 104,
    date: '2021/5/8'
  }, {
    value: 152,
    date: '2021/5/9'
  }, {
    value: 23,
    date: '2021/5/10'
  }, {
    value: 98,
    date: '2021/5/11'
  }],
  messages: [{
    value: 45,
    date: '2021/4/11'
  }, {
    value: 47,
    date: '2021/4/12'
  }, {
    value: 74,
    date: '2021/4/13'
  }, {
    value: 54,
    date: '2021/4/14'
  }, {
    value: 42,
    date: '2021/4/15'
  }, {
    value: 68,
    date: '2021/4/16'
  }, {
    value: 77,
    date: '2021/4/17'
  }, {
    value: 9,
    date: '2021/4/18'
  }, {
    value: 41,
    date: '2021/4/19'
  }, {
    value: 47,
    date: '2021/4/20'
  }, {
    value: 33,
    date: '2021/4/21'
  }, {
    value: 17,
    date: '2021/4/22'
  }, {
    value: 55,
    date: '2021/4/23'
  }, {
    value: 41,
    date: '2021/4/24'
  }, {
    value: 16,
    date: '2021/4/25'
  }, {
    value: 49,
    date: '2021/4/26'
  }, {
    value: 20,
    date: '2021/4/27'
  }, {
    value: 44,
    date: '2021/4/28'
  }, {
    value: 39,
    date: '2021/4/29'
  }, {
    value: 4,
    date: '2021/4/30'
  }, {
    value: 30,
    date: '2021/5/1'
  }, {
    value: 46,
    date: '2021/5/2'
  }, {
    value: 72,
    date: '2021/5/3'
  }, {
    value: 20,
    date: '2021/5/4'
  }, {
    value: 54,
    date: '2021/5/5'
  }, {
    value: 37,
    date: '2021/5/6'
  }, {
    value: 20,
    date: '2021/5/7'
  }, {
    value: 0,
    date: '2021/5/8'
  }, {
    value: 27,
    date: '2021/5/9'
  }, {
    value: 18,
    date: '2021/5/10'
  }, {
    value: 41,
    date: '2021/5/11'
  }],
  purchases: [{
    value: 7,
    date: '2021/4/11'
  }, {
    value: 3,
    date: '2021/4/12'
  }, {
    value: 1,
    date: '2021/4/13'
  }, {
    value: 8,
    date: '2021/4/14'
  }, {
    value: 3,
    date: '2021/4/15'
  }, {
    value: 4,
    date: '2021/4/16'
  }, {
    value: 5,
    date: '2021/4/17'
  }, {
    value: 4,
    date: '2021/4/18'
  }, {
    value: 3,
    date: '2021/4/19'
  }, {
    value: 7,
    date: '2021/4/20'
  }, {
    value: 3,
    date: '2021/4/21'
  }, {
    value: 8,
    date: '2021/4/22'
  }, {
    value: 4,
    date: '2021/4/23'
  }, {
    value: 6,
    date: '2021/4/24'
  }, {
    value: 6,
    date: '2021/4/25'
  }, {
    value: 0,
    date: '2021/4/26'
  }, {
    value: 10,
    date: '2021/4/27'
  }, {
    value: 5,
    date: '2021/4/28'
  }, {
    value: 1,
    date: '2021/4/29'
  }, {
    value: 4,
    date: '2021/4/30'
  }, {
    value: 3,
    date: '2021/5/1'
  }, {
    value: 2,
    date: '2021/5/2'
  }, {
    value: 9,
    date: '2021/5/3'
  }, {
    value: 2,
    date: '2021/5/4'
  }, {
    value: 9,
    date: '2021/5/5'
  }, {
    value: 3,
    date: '2021/5/6'
  }, {
    value: 5,
    date: '2021/5/7'
  }, {
    value: 3,
    date: '2021/5/8'
  }, {
    value: 0,
    date: '2021/5/9'
  }, {
    value: 5,
    date: '2021/5/10'
  }, {
    value: 10,
    date: '2021/5/11'
  }],
  shopping: [{
    value: 30,
    date: '2021/4/11'
  }, {
    value: 8,
    date: '2021/4/12'
  }, {
    value: 2,
    date: '2021/4/13'
  }, {
    value: 30,
    date: '2021/4/14'
  }, {
    value: 10,
    date: '2021/4/15'
  }, {
    value: 1,
    date: '2021/4/16'
  }, {
    value: 29,
    date: '2021/4/17'
  }, {
    value: 26,
    date: '2021/4/18'
  }, {
    value: 2,
    date: '2021/4/19'
  }, {
    value: 19,
    date: '2021/4/20'
  }, {
    value: 21,
    date: '2021/4/21'
  }, {
    value: 6,
    date: '2021/4/22'
  }, {
    value: 26,
    date: '2021/4/23'
  }, {
    value: 29,
    date: '2021/4/24'
  }, {
    value: 26,
    date: '2021/4/25'
  }, {
    value: 24,
    date: '2021/4/26'
  }, {
    value: 21,
    date: '2021/4/27'
  }, {
    value: 1,
    date: '2021/4/28'
  }, {
    value: 26,
    date: '2021/4/29'
  }, {
    value: 13,
    date: '2021/4/30'
  }, {
    value: 26,
    date: '2021/5/1'
  }, {
    value: 22,
    date: '2021/5/2'
  }, {
    value: 18,
    date: '2021/5/3'
  }, {
    value: 23,
    date: '2021/5/4'
  }, {
    value: 22,
    date: '2021/5/5'
  }, {
    value: 26,
    date: '2021/5/6'
  }, {
    value: 24,
    date: '2021/5/7'
  }, {
    value: 2,
    date: '2021/5/8'
  }, {
    value: 5,
    date: '2021/5/9'
  }, {
    value: 18,
    date: '2021/5/10'
  }, {
    value: 4,
    date: '2021/5/11'
  }]
}
export default {
  props: ['statisticType'],
  data () {
    return {
      chartName: '访问量',
      chartType: 'visits',
      weekChart: {},
      monthChart: {},
      weekData: {},
      monthData: {}
    }
  },
  computed: {
    sideCollapse () {
      return this.$store.getters.sideCollapse
    }
  },
  watch: {
    // 折叠或展开菜单栏的时候，图表宽度不会跟着变，需要重建。
    sideCollapse () {
      // 主页使用keep-alive做了缓存，如果当前不在主页，折叠/展开菜单会出现container不存在的情况
      if (this.$route.path === '/authSys/index') {
        // eslint-disable-next-line no-unused-vars
        const timer = setTimeout(() => {
          this.weekChart.destroy()
          this.monthChart.destroy()
          this.createChart('weekChartContainer', this.weekData[this.chartType], 'weekChart')
          this.createChart('monthChartContainer', this.monthData[this.chartType], 'monthChart')
        }, 350)
      }
    },
    // 点击数量统计信息的时候，图表展现对应的数据
    statisticType (value) {
      this.chartType = value
      this.chartName = TYPE_NAME_MAP[value]
      this.weekChart.changeData(this.weekData[value])
      this.monthChart.changeData(this.monthData[value])
    }
  },
  mounted () {
    this.getLineChartData(() => {
      this.setDate(this.weekData, this.monthData)
      this.createChart('weekChartContainer', this.weekData[this.chartType], 'weekChart')
      this.createChart('monthChartContainer', this.monthData[this.chartType], 'monthChart')
    })
  },
  methods: {
    // 获取图表数据
    async getLineChartData (callback) {
      const getWeekData = () => {
        // return api.authSys.getLineChartData({ type: 'week' })
        return weekLineData
      }
      const getMonthData = () => {
        // return api.authSys.getLineChartData({ type: 'month' })
        return monthLineData
      }
      const [weekData, monthData] = await Promise.all([getWeekData(), getMonthData()])
      this.weekData = weekData
      this.monthData = monthData
      callback()
    },
    // 为数据添加日期参数
    setDate (weekData, monthData) {
      const currentDate = Date.now()
      const ONE_DAY = 24 * 60 * 60 * 1000
      Object.values(weekData).forEach(item => {
        item.forEach((item1, index) => {
          const date = new Date(currentDate - (6 - index) * ONE_DAY)
          item1.date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        })
      })
      Object.values(monthData).forEach(item => {
        item.forEach((item1, index) => {
          // 设置31天的数据，以满足每格显示5天。
          const date = new Date(currentDate - (30 - index) * ONE_DAY)
          item1.date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        })
      })
    },
    // 创建图表
    createChart (container, data, chartName) {
      const chart = new G2.Chart({
        container,
        forceFit: true,
        height: 300,
        width: 800,
        padding: [30, 60, 50, 50],
        background: { fill: '#fff' }
      })
      chart.data(data)
      chart.scale({
        value: {
          alias: '数量',
          min: 0
        }
      })
      chart.line().position('date*value')
      chart.point().position('date*value').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      })
      chart.render()
      this[chartName] = chart
    }
  }
}
</script>

<style lang="scss" scoped>
.line-chart {
  margin-bottom: 20px;

  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
  }

  #weekChartContainer,
  #monthChartContainer {
    height: 300px;
    background-color: #fff;
  }

}
</style>
