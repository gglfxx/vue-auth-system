<template>
  <div id="app">
   <router-view/>
  </div>
</template>
<script>
import tableMng from '@/utils/tableMng'
import baseTable from '../mock/modules/baseTable'
export default {
  components: {
  },
  created () {
    this.initBaseTable()
  },
  methods: {
    //  初始化基础数据表
    initBaseTable () {
      const data = baseTable.getBaseTable().data
      tableMng.initTable(data)
    }
  }
}
</script>
