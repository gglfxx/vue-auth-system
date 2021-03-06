<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline" ref="queryCondition">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="queryCondition.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="queryCondition.gender" placeholder="性别" clearable style="width: 90px"
                     class="filter-item">
            <el-option v-for="item in tableMng.getTable('gender')" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="queryCondition.roles" style="width: 140px" class="filter-item" @change="handleFilter" placeholder="角色">
            <el-option v-for="item in tableMng.getTable('role')" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
          <el-button v-waves class="filter-item" type="info" icon="el-icon-refresh" @click="reset('queryCondition')">
            重置
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="handleEdit">
            新增
          </el-button>
          <export-excel
            file-name="用户数据表"
            :header="['序号','用户名', '姓名', '性别','手机','邮箱', '角色', '创建时间']"
            :filter-filed="['index', 'username', 'name','gender', 'mobilePhone', 'email', 'role', 'createDate']"
            :data="userList">
            导出表格
          </export-excel>
        </el-form-item>
      </el-form>
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
      <el-table-column label="序号" prop="index" sortable="custom" align="center" width="80">
      </el-table-column>
      <el-table-column prop="id" v-if="false"></el-table-column>
      <el-table-column label="用户名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ tableMng.getNameById('gender', row.gender) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{row.email}}</span>
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
      <el-table-column label="创建时间" min-width="120px" sortable>
        <template slot-scope="{row}">
          <span>{{row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleEdit(row,$index)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="queryCondition.page" :limit.sync="queryCondition.limit"
                @pagination="getUserList"/>

    <edit
      :id="editId"
      :visible="editVisible"
      @onClose="handleClose"
      @onSave="handleSave"/>
  </div>
</template>

<script>
import api from '@/api'
import waves from '@/directive/waves'
import tableMng from '@/utils/tableMng'
import Pagination from '@/components/pagination/Pagination'
import { scroll } from '@/utils/core'
import Edit from './components/Edit'
import ExportExcel from '@/components/excel/exportExcel'

export default {
  name: 'User',
  components: { Pagination, Edit, ExportExcel },
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
        page: 1,
        sort: 'id',
        limit: 20
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
      const data = await api.user.getList(this.queryCondition)
      this.userList = data.list.map((item, index) => {
        return {
          id: item.id,
          index: (this.queryCondition.page - 1) * this.queryCondition.limit + index + 1,
          username: item.username,
          name: item.name,
          mobilePhone: item.mobilePhone,
          gender: item.gender,
          roles: item.roles,
          email: item.email,
          createDate: this.$dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      this.total = data.total
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
      const scrollElement = document.querySelector('.inner-layout__page')
      scroll(scrollElement, 0, 800)
    },
    sortChange (data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID (order) {
      if (order === 'ascending') {
        this.queryCondition.sort = '+id'
      } else {
        this.queryCondition.sort = '-id'
      }
      this.handleFilter()
    },
    // 查询
    handleFilter () {
      this.queryCondition.page = 1
      this.getUserList()
    },
    // 重置
    reset (formName) {
      this.$refs[formName].resetFields()
      this.queryCondition.page = 1
      this.getUserList()
    },
    // 编辑/新增
    handleEdit (row, index) {
      this.editId = row ? row.id : ''
      this.editVisible = true
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
      const id = []
      id.push(row.id)
      this.$confirm(`确定删除用户：“${row.name}”？`, '提示', { type: 'warning' })
        .then(async () => {
          await api.user.remove({ id })
          this.$message.success('删除成功！')
          this.getUserList()
        }).catch(() => {})
    }
  }
}
</script>
