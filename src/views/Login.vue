<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>用户名</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="item-form">
          <label>确认密码</label>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15"
              ><el-input v-model="ruleForm.code"></el-input
            ></el-col>
            <el-col :span="8">
              <el-button type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validateUsername = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; // 验证邮箱
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名必须是邮箱格式"));
      } else {
        if (this.ruleForm.username !== "") {
          this.$refs.ruleForm.validateField("username");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/; // 字母+数字

      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码必须是字母+数字"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        let reg = /^[a-z0-9]{6}$/; // 字母 或 数字
        if (!reg.test(value)) {
          callback(new Error("验证码必须是字母 或 数字"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      menuTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ],
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #344a5f;
  height: 100vh;

  .login-wrap {
    width: 330px;
    margin: 0 auto;
    .menu-tab {
      text-align: center;
      li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
        &.current {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
    .login-form {
      .item-form {
        label {
          color: #fff !important;
          display: block;
        }
      }
      .block {
        display: block;
        width: 100%;
      }
      .login-btn {
        margin-top: 19px;
      }
    }
  }
}
</style>
