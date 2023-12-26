<template>
  <div>
    <div class="auth-container">
      <div class="title-container">
        <h3 class="title" :class="{ active: isLoginForm }" @click="toggleForm(true)">Login Form</h3>
        <h3 class="title" :class="{ active: !isLoginForm }" @click="toggleForm(false)">Register</h3>
      </div>
      <component :is="currentFormComponent" @registered="handleRegistrationCompleted"></component>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue';

export default {
  data() {
    return {
      isLoginForm: true,
    };
  },
  computed: {
    currentFormComponent() {
      return this.isLoginForm ? Login : Register;
    }
  },
  methods: {
    toggleForm(isLoginForm) {
      this.isLoginForm = isLoginForm;
    },
    handleRegistrationCompleted() {
      // 註冊完成後切換到登入表單
      this.isLoginForm = true;
    }
  },
  components: {
    Login,
    Register
  }
};
</script>

<style :scoped>
.title-container {

  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0 auto 0 auto;
    text-align: center;
    font-weight: bold;
  }
}


.title-container {
  display: flex;
  justify-content: space-between;
  font-size: 40px;
  color: #fff;
  position: relative;


  .title {
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    background-color: #304156;
    color: #aaa;
    margin: 0;

    &.active {
      background-color: #2e3e52;; /* 激活状态的背景色 */
      opacity: 1;
      color: #fff;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    &:hover {
      color: #fff;
    }

  }
}
</style>