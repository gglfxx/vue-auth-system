<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单号" min-width="150">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="价格" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
const orderList = [{
  order_no: 'd88CdF1e-FCcA-D6C5-ce7F-E84Cc2D7cC4D',
  timestamp: 151322493300,
  username: 'Mark Hernandez',
  price: 12906.8,
  status: 'success'
}, {
  order_no: 'AA5f5B53-6e5C-dceC-D6cc-8d2dDF43AE2e',
  timestamp: 151322493300,
  username: 'Amy Harris',
  price: 13888.4,
  status: 'success'
}, {
  order_no: '29fe2dD6-F2b8-8AAc-b8Fd-333ea6ab2a8e',
  timestamp: 151322493300,
  username: 'Jennifer Walker',
  price: 3535,
  status: 'success'
}, {
  order_no: 'AaCCB9ed-02B7-FA24-CFDf-095B062c4140',
  timestamp: 151322493300,
  username: 'Paul Allen',
  price: 5749.8,
  status: 'pending'
}, {
  order_no: 'B605EE6B-BEEf-5EC4-EcAF-2E7FbcB6ddfb',
  timestamp: 151322493300,
  username: 'Sarah Brown',
  price: 3850.9,
  status: 'pending'
}, {
  order_no: 'aFe5bCF9-5Fe7-FdAd-8156-8E8dFec8D08b',
  timestamp: 151322493300,
  username: 'Joseph Martin',
  price: 1386.66,
  status: 'success'
}, {
  order_no: 'E44eFea3-bF8F-dd9f-FD93-F6A152E4E2B7',
  timestamp: 151322493300,
  username: 'Matthew Taylor',
  price: 2692.44,
  status: 'pending'
}, {
  order_no: 'f1F92D5E-E00E-dafB-9EFc-527596Fc60C6',
  timestamp: 151322493300,
  username: 'Maria Lee',
  price: 12812.5,
  status: 'pending'
}]
export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter (str) {
      return str.substring(0, 30)
    },
    toThousandFilter (num) {
      return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
  },
  data () {
    return {
      list: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = orderList
    }
  }
}
</script>
