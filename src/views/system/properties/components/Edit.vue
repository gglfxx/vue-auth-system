<template>
  <el-dialog
    class="config-edit"
    :title="id ? '编辑配置' : '新增配置'"
    width="700px"
    :visible="visible"
    :before-close="handleBeforeClose">
    <el-form
      ref="form"
      :model="configInfo"
      :rules="formRules"
      label-width="100px"
      v-loading="getDetailLoading">
      <el-form-item label="配置代码:" prop="code">
        <el-input v-model="configInfo.code" placeholder="请填写配置代码" clearable :disabled="id ? true : false"></el-input>
      </el-form-item>
      <el-form-item label="配置名称:" prop="name">
        <el-input v-model="configInfo.name" placeholder="请填写配置名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="参数值:" prop="sysVal">
        <el-input v-model="configInfo.sysVal" placeholder="请填写参数值" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述:" prop="description">
        <el-input v-model="configInfo.description" placeholder="请填写描述" clearable :autosize="{ minRows: 2, maxRows: 4}"
                  type="textarea"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import api from '@/api'
const defaultInfo = {
  id: '',
  code: '',
  name: '',
  sysVal: '',
  description: ''
}

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.getDetail()
      }
    }
  },
  data () {
    return {
      configInfoBackup: { ...defaultInfo },
      configInfo: { ...defaultInfo },
      formRules: {
        code: [{
          required: true,
          message: '请填写配置代码',
          trigger: 'blur'
        }, {
          pattern: /^[a-zA-Z_]{5,10}$/,
          message: '配置为5到10位的字母组成',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请填写配置名称',
          trigger: 'blur'
        }, {
          max: 6,
          message: '姓名长度不能超过6个字',
          trigger: 'blur'
        }]
      },
      submitLoading: false,
      getDetailLoading: false
    }
  },
  methods: {
    async getDetail () {
      if (!this.id) return
      this.getDetailLoading = true
      const data = await api.config.getDetail({ id: this.id })
      this.configInfo = { ...data }
      this.configInfoBackup = { ...data }
      this.getDetailLoading = false
    },
    handleSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          await api.config.update({ detail: this.configInfo })
          this.submitLoading = false
          this.handleClose()
          this.$emit('onSave')
          this.$message.success('提交成功')
        } else {
          this.$message.error('请按照正确格式填写')
        }
      })
    },
    handleBeforeClose () {
      if (window.JSON.stringify(this.configInfoBackup) === window.JSON.stringify(this.configInfo)) {
        this.handleClose()
      } else {
        this.$confirm('信息修改后未提交，确认关闭？', '提示', {
          type: 'warning'
        }).then(() => {
          this.handleClose()
        }).catch(() => {
        })
      }
    },
    handleClose () {
      this.$refs.form.resetFields()
      this.configInfo = defaultInfo
      this.configInfoBackup = defaultInfo
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.config-edit {
}
</style>
