<template>
  <div class="groupbuy-audit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>團購審核</span>
      </div>
      <el-table :data="groupbuys" style="width: 100%">
        <el-table-column prop="Name" label="商品名稱"></el-table-column>
        <el-table-column prop="Description" label="描述"></el-table-column>
        <el-table-column prop="StartDate" label="開始日期"></el-table-column>
        <el-table-column prop="EndDate" label="結束日期"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" size="mini" @click="approveGroupbuy(scope.row)">批准</el-button>
            <el-button type="danger" size="mini" @click="rejectGroupbuy(scope.row)">拒絕</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      groupbuys: []
    };
  },
  created() {
    this.fetchPendingGroupbuys();
  },
  methods: {
    fetchPendingGroupbuys() {
      axios.get('http://localhost:8000/api/groupbuys/pending')
          .then(response => {
            this.groupbuys = response.data;
          })
          .catch(error => {
            console.error('Error fetching pending groupbuys:', error);
          });
    },
    updateGroupbuyStatus(groupBuyId, newStatus) {
      axios.post('http://localhost:8000/api/groupbuy/updateStatus', {
        groupBuyId,
        newStatus
      })
          .then(response => {
            this.$message.success(response.data.message);
            this.fetchPendingGroupbuys(); // 重新獲取數據以更新頁面
          })
          .catch(error => {
            console.error('Error updating groupbuy status:', error);
            this.$message.error('更新狀態失敗');
          });
    },
    approveGroupbuy(groupbuy) {
      this.updateGroupbuyStatus(groupbuy.GroupBuyID, '進行中');
    },
    rejectGroupbuy(groupbuy) {
      this.updateGroupbuyStatus(groupbuy.GroupBuyID, '已拒絕');
    }
  }
};
</script>

<style scoped>
.groupbuy-audit {
  padding: 20px;
}

.el-table .el-button {
  margin-right: 10px;
}

.box-card {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  border-radius: 4px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>