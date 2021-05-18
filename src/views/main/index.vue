<template>
  <div class="auth-container">
    <panel-group @handleSetLineChartData="handleChangeType" />
    <line-chart :statistic-type="statisticType" />

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 10}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 8}" style="margin-bottom:30px;">
        <new-goods />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './PanelGroup'
import LineChart from './LineChart'
import TodoList from './TodoList/index'
import TransactionTable from './TransactionTable'
import NewGoods from './NewGoods'
export default {
  name: 'authSys',
  components: {
    PanelGroup,
    LineChart,
    TodoList,
    TransactionTable,
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

<style lang="scss" scoped>
.auth-container {
  background-color: #f0f2f5;
  position: relative;
  box-sizing: border-box;
  height: calc(100vh - 50px);
  padding: 1em;
}
</style>
