<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="queryCondition.name" placeholder="请输入用户名" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="queryCondition.gender" placeholder="请选择性别" clearable style="width: 90px"
                 class="filter-item">
        <el-option v-for="item in tableMng.getTable('gender')" :key="item.id" :label="item.name"
                   :value="item.id"></el-option>
      </el-select>
      <el-select v-model="queryCondition.roles" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name"
                   :value="item.id"></el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleEdit">
        新增
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80"
                       :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="150px">
        <template slot-scope="{row}">
          <span>{{row.gender}}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110px" align="center">
        <template slot-scope="scope">
            <span v-for="(role , index) in scope.row.roles" :key="role">
              {{ tableMng.getNameById('role', role) }}
              <span v-if="scope.row.roles.length !== index + 1">,</span>
            </span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px" sortable>
        <template slot-scope="{row}">
          <span>{{row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryCondition.pageNumber" :limit.sync="queryCondition.pageSize"
                @pagination="getUserList"/>

    <edit
      :id="editId"
      :visible="editVisible"
      @onClose="handleClose"
      @onSave="handleSave"/>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import tableMng from '@/utils/tableMng'
import { parseTime } from '@/utils'
import Pagination from '@/components/pagination/Pagination'
import { scroll } from '@/utils/core'
import Edit from './components/Edit'

const users = {
  list: [{
    id: 'b8ec1e25-becc-1ed4-aaac-f61dad843cb9',
    index: 1,
    name: '方丽',
    mobilePhone: '18821655620',
    gender: '2',
    roles: ['guest'],
    createDate: '1973-03-21 20:00:53',
    consume: 5551
  }, {
    id: 'a331afeb-53d9-ff1e-e2ce-2dfeb891317c',
    index: 2,
    name: '蒋静',
    mobilePhone: '18985164343',
    gender: '2',
    roles: ['admin'],
    createDate: '1974-05-26 19:08:13',
    consume: 1731
  }],
  total: 2
}

export default {
  name: 'ComplexTable',
  components: { Pagination, Edit },
  directives: { waves },
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      tableKey: 0,
      tableMng,
      userList: [],
      total: 0,
      listLoading: true,
      queryCondition: {
        name: '',
        gender: '',
        roles: [],
        pageNumber: 1,
        sort: 'id',
        pageSize: 20
      },
      editVisible: false,
      editId: '',
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      this.listLoading = true
      // const data = await api.user.getList(this.queryCondition)
      const data = users
      this.userList = data.list.map((item, index) => {
        return {
          id: item.id,
          index: (this.queryCondition.pageNumber - 1) * this.queryCondition.pageSize + index + 1,
          name: item.name,
          mobilePhone: item.mobilePhone,
          gender: item.gender,
          roles: item.roles,
          createDate: this.$dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss'),
          consume: item.consume
        }
      })
      this.total = data.total
      this.listLoading = false
      const scrollElement = document.querySelector('.inner-layout__page')
      scroll(scrollElement, 0, 800)
    },
    handleFilter () {
      this.queryCondition.pageNumber = 1
      this.getUserList()
    },
    // 编辑/新增
    handleEdit (index, row) {
      this.editId = row ? row.id : ''
      this.editVisible = true
    },
    sortChange (data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    // 保存
    handleSave () {
      this.handleClose()
      this.getUserList()
    },
    // 关闭编辑模态窗
    handleClose () {
      this.editVisible = false
    },
    handleDelete (row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv (pv) {
      /* fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      }) */
    },
    handleDownload () {
      /* this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      }) */
    },
    formatJson (filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function (key) {
      const sort = this.queryCondition.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
