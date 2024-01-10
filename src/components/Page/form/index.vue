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

import axios from 'axios';

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

  computed: {
    userID() {
      return this.$store.getters.id;
    }
  },
  methods: {
    async onSubmit() {
      try {
        const userID = this.userID;
        const response = await axios.post('http://localhost:8000/api/groupbuy/create', {
          ...this.form,
          InitiatorUserID: userID,
          TargetQuantity: this.form.groupSize, // 假設目標數量等於團購人數
          CurrentQuantity: 0, // 初始當前數量為 0
          Status: '審核中' // 初始狀態為審核中
        });
        this.$message.success('團購已發起!');

        console.log(response);

        // 清除表單
        this.form = {
          productName: '',
          groupSize: 1,
          price: 0,
          productUrl: '',
          description: '',
          startDate: '',
          endDate: '',
          image: ''
        };
      } catch (error) {
        console.error(error);
        this.$message.error('發起失敗!');
      }
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>