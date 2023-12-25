<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品名稱">
        <el-input v-model="form.productName" />
      </el-form-item>
      <el-form-item label="團購人數">
        <el-input-number v-model="form.groupSize" :min="1" />
      </el-form-item>
      <el-form-item label="商品價格">
        <el-input-number v-model="form.price" :min="0" />
      </el-form-item>
      <el-form-item label="商品連結">
        <el-input v-model="form.productUrl" />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="開始日期">
        <el-date-picker v-model="form.startDate" type="date" placeholder="選擇日期" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="結束日期">
        <el-date-picker v-model="form.endDate" type="date" placeholder="選擇日期" style="width: 100%;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">申請發起</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        productName: '',
        groupSize: 1,
        price: 0,
        productUrl: '',
        description: '',
        startDate: '',
        endDate: '',
        image: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('團購已發起!')
    },
    onCancel() {
      this.$message({
        message: '已取消!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>