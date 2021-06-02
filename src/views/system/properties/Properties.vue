<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="queryProp" class="demo-form-inline" ref="queryCondition">
        <el-form-item label="配置名称" prop="name">
          <el-input v-model="queryProp.name" placeholder="请输入配置名称"></el-input>
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
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="propList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" prop="index" sortable="custom" align="center" width="80">
      </el-table-column>
      <el-table-column prop="id" v-if="false"></el-table-column>
      <el-table-column label="配置代码" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="配置名称" width="250" align="center">
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数值" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sysVal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="300" sortable>
        <template slot-scope="{row}">
          <span>{{row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  width="230" class-name="small-padding fixed-width">
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

    <pagination v-show="total>0" :total="total" :page.sync="queryProp.page" :limit.sync="queryProp.limit"
                @pagination="getPropList"/>

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

export default {
  name: 'Properties',
  components: { Pagination, Edit },
  directives: { waves },
  data () {
    return {
      tableKey: 0,
      tableMng,
      propList: [],
      total: 0,
      listLoading: true,
      queryProp: {
        name: '',
        page: 1,
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
      }
    }
  },
  created () {
    this.getPropList()
  },
  methods: {
    async getPropList () {
      this.listLoading = true
      const data = await api.config.getList(this.queryProp)
      this.propList = data.list.map((item, index) => {
        return {
          id: item.id,
          index: (this.queryProp.page - 1) * this.queryProp.limit + index + 1,
          code: item.code,
          name: item.name,
          sysVal: item.sysVal,
          description: item.description,
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
    // 查询
    handleFilter () {
      this.queryProp.page = 1
      this.getPropList()
    },
    // 重置
    reset (formName) {
      this.$refs[formName].resetFields()
      this.queryProp.page = 1
      this.getPropList()
    },
    // 编辑/新增
    handleEdit (row, index) {
      this.editId = row ? row.id : ''
      this.editVisible = true
    },
    // 保存
    handleSave () {
      this.handleClose()
      this.getPropList()
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
      this.propList.splice(index, 1)
    }
  }
}
</script>
