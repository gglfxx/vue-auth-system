<template>
  <div>
    <panel-group @handleSetLineChartData="handleChangeType" />
    <line-chart :statistic-type="statisticType" />

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
      statisticType: 'visits'
    }
  },
  methods: {
    handleChangeType (type) {
      this.statisticType = type
    }
  }
}
</script>
