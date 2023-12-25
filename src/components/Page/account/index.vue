<template>
  <div class="account-settings">
    <el-row :gutter="20">
      <!-- 用戶信息設置 -->
      <el-col :span="8">
        <el-card @click.native="goToSetting('/account/profile')">
          <div class="setting-title">用戶信息設置</div>
          <div class="setting-description">更新您的基本信息和聯絡方式</div>
        </el-card>
      </el-col>

      <!-- 通知設置 -->
      <el-col :span="8">
        <el-card @click.native="goToSetting('/account/notifications')">
          <div class="setting-title">通知設置</div>
          <div class="setting-description">選擇接收哪些類型的通知</div>
        </el-card>
      </el-col>

      <!-- 隱私和安全設置 -->
      <el-col :span="8">
        <el-card @click.native="goToSetting('/account/privacy')">
          <div class="setting-title">隱私和安全</div>
          <div class="setting-description">管理您的隱私設置和安全問題</div>
        </el-card>
      </el-col>

      <!-- 幫助和支持 -->
      <el-col :span="8">
        <el-card @click.native="goToSetting('/account/support')">
          <div class="setting-title">幫助和支持</div>
          <div class="setting-description">瀏覽常見問題或聯絡我們的支持團隊</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          title: '個人信息',
          description: '更新您的暱稱、頭像等',
          path: '/account/profile'
        },
        {
          title: '安全設置',
          description: '更改密碼、設置雙因素認證',
          path: '/account/security'
        },
        // 其他設置選項...
      ]
    };
  },
  methods: {
    goToSetting(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style>
.setting-card {
  cursor: pointer;
  transition: box-shadow .3s;
  margin-bottom: 20px; /* 添加間距 */
}

.setting-card:last-child {
  margin-bottom: 0; /* 移除最後一個卡片的底部間距 */
}

.setting-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,.1);
}

.setting-title {
  font-size: 16px;
  font-weight: bold;
}

.setting-description {
  font-size: 14px;
  color: #666;
}
</style>