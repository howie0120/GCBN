<template>
  <div class="register-container">
    <article class="header">
      <header>
        <el-avatar icon="el-icon-user-solid" shape="circle" />
        <span class="login">
          <em class="bold">已經有註冊過了?</em>
            <router-link to="/Login">
              <el-button type="primary" size="mini">登入</el-button>
            </router-link>
        </span>
      </header>
    </article>
    <section>
      <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          autocomplete="off"
          hide-required-asterisk="true"
          size="medium"
      >
        <div style="padding-top: 10px">
          <el-form-item label="電子信箱" prop="email">
            <el-col :span="10">
              <el-input
                  v-model="ruleForm.email"
                  placeholder="輸入電子郵件"
              />
            </el-col>

            <span class="status">{{ statusMsg }}</span>
          </el-form-item>
          <el-form-item label="密碼" prop="pwd" :rules="rules.pwd">
            <el-col :span="10">
              <el-input v-model="ruleForm.pwd" type="password" />
            </el-col>
          </el-form-item>
          <el-form-item label="確認密碼" prop="cpwd">
            <el-col :span="10">
              <el-input v-model="ruleForm.cpwd" type="password" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 40%"
                @click="register"
            >註冊</el-button>
          </el-form-item>
        </div>
      </el-form>
    </section>

    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      statusMsg: '',
      error: '',
      isDisable: false,
      codeLoading: false,
      ruleForm: {
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            message: '電子郵件不能為空白',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '密碼不能為空白',
            trigger: 'blur'
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
            message: '密碼必須包含字母,且長度為8-20字'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '確認密碼',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('兩次密碼不同，請重新輸入'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 用戶註冊
    register: function () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 移除密码加密逻辑
          const user = {
            email: this.ruleForm.email,
            password: this.ruleForm.pwd
          }
          // 调用 register 函数
          register(this.ruleForm.code).then(res => {
            this.$message({
              showClose: true,
              message: '注册成功，正在跳转到登录界面...',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 2000)
          }).catch(err => {
            console.log(err.response.data.message)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

// reset element-ui css
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; // 使容器擴展到整個視窗高度
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 95%;

    input {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    label {
      font-style: normal;
      font-size: 12px;
      color: $light_gray;
    }
  }
}
</style>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .header {
    border-bottom: 2px solid rgb(235, 232, 232);
    min-width: 980px;
    color: #666;

    header {
      margin: 0 auto;
      padding: 10px 0;
      width: 980px;

      .login {
        float: right;
      }

      .bold {
        font-style: normal;
        color: $light_gray;
      }
    }
  }

  > section {
    margin: 0 auto 30px;
    padding-top: 30px;
    width: 980px;
    min-height: 300px;
    padding-right: 100px;
    box-sizing: border-box;

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }

    .error {
      color: red;
    }
  }

  .tips {
    float: right;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>

