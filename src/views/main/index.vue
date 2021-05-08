<template>
  <div>
<!--    <statistic @onChangeType="handleChangeType" />-->
    <panel-group @handleSetLineChartData="handleChangeType" />
    <line-chart :statistic-type="lineChartData" />

    <el-row :gutter="20">
      <el-col :span="8">
        <todo-list />
      </el-col>
      <el-col :span="8">
        <progress-bar />
      </el-col>
      <el-col :span="8">
        <new-goods />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './PanelGroup'
import LineChart from './LineChart'
import TodoList from './/TodoList'
import ProgressBar from './ProgressBar'
import NewGoods from './NewGoods'

const lineChartData = {
  visites: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'authSys',
  components: {
    PanelGroup,
    LineChart,
    TodoList,
    ProgressBar,
    NewGoods
  },
  data () {
    return {
      lineChartData: lineChartData.visites
    }
  },
  methods: {
    handleChangeType (type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>
