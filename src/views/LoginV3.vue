<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ current: item.current }" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>用户名</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="item-form" v-if="model === 'register'">
          <label>确认密码</label>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()" :disabled="codeButton.status">
                {{ codeButton.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            :disabled="loginButtonStatus"
          >
            {{ model === 'login' ? '登录' : '注册' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { GetSms, Register, Login } from '@/api/login'
import { reactive, ref, onMounted } from '@vue/composition-api'
import { stripscript, validateEmail } from '../utils/validate'
export default {
  name: 'login',
  // VUE3.0 特性
  setup(props, context) {
    console.log('setup', props, context)

    let validateUsername = (rule, value, callback) => {
      console.log('todo validateUsername')
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!validateEmail(value)) {
        callback(new Error('用户名必须是邮箱格式'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/ // 6-20位 字母+数字
      ruleForm.pass = stripscript(value)
      value = ruleForm.pass
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码必须是字母+数字'))
      } else {
        if (ruleForm.checkPass !== '') {
          context.refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    let checkCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value)
      value = ruleForm.code
      let reg = /^[a-z0-9]{6}$/ // 字母 或 数字
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('验证码必须是字母 或 数字'))
      } else {
        callback()
      }
    }

    const menuTab = reactive([
      { txt: '登录', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' },
    ])

    const model = ref('login')
    const loginButtonStatus = ref(true)
    // 验证码按钮状态
    const codeButton = reactive({
      status: false,
      text: '获取验证码',
    })
    // 倒计时
    let timer = ref(null)
    const ruleForm = reactive({
      username: '',
      pass: '',
      checkPass: '',
      code: '',
    })
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: 'blur' }],
      pass: [{ validator: validatePass, trigger: 'blur' }],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      code: [{ validator: checkCode, trigger: 'blur' }],
    })

    // 声明函数
    const toggleMenu = data => {
      console.log(data)
      menuTab.forEach(elem => {
        elem.current = false
      })
      model.value = data.type
      data.current = true
      // 重置表单
      context.refs['ruleForm'].resetFields()
    }
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          if (model.value === 'register') {
            register()
          } else {
            login()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const getSms = () => {
      if (!ruleForm.username) {
        context.root.$message.error('用户名不能为空')
        return false
      }
      if (!validateEmail(ruleForm.username)) {
        context.root.$message.error('用户名必须是邮箱格式')
        return false
      }
      codeButton.status = true
      codeButton.text = '发生中'

      GetSms({
        username: ruleForm.username,
        module: model.value,
      })
        .then(response => {
          console.log('GetSms response', response)
          let data = response.data
          context.root.$message({
            message: data.message,
            type: 'success',
          })
          loginButtonStatus.value = false
          // 调定时器，倒计时60秒
          countDown(60)
        })
        .catch(error => {
          console.log('GetSms error', error)
        })
    }
    // 登录
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: ruleForm.pass,
        code: ruleForm.code,
        module: model.value,
      }
      context.root.$store
        .dispatch('app/login', requestData)
        .then(response => {
          console.log('login response', response)
          let data = response.data
          context.root.$message({
            message: data.message,
            type: 'success',
          })
          context.root.$router.push({ name: 'Console' })
          clearCountDown()
        })
        .catch(error => {
          console.log('Login error', error)
        })
      // Login(requestData)
      //   .then(response => {
      //     console.log("Login response", response);
      //     let data = response.data;
      //     context.root.$message({
      //       message: data.message,
      //       type: "success"
      //     });
      //     context.root.$router.push({ name: "Console" });
      //     clearCountDown();
      //   })
      //   .catch(error => {
      //     console.log("Login error", error);
      //   });
    }
    // 注册
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: ruleForm.pass,
        code: ruleForm.code,
        module: model.value,
      }
      Register(requestData)
        .then(response => {
          console.log('Register response', response)
          let data = response.data
          context.root.$message({
            message: data.message,
            type: 'success',
          })
          // 跳转到登录tab
          toggleMenu(menuTab[0])
          clearCountDown()
        })
        .catch(error => {
          console.log('Register error', error)
        })
    }
    // 倒计时
    const countDown = number => {
      // 判断定时器是否存在 存在则清除
      if (timer.value) {
        clearInterval(timer.value)
      }

      let t = number
      timer.value = setInterval(() => {
        t = t - 1
        if (t === 0) {
          clearInterval(timer.value)
          codeButton.status = false
          codeButton.text = '再次获取'
        } else {
          codeButton.text = `倒计时${t}秒`
        }
      }, 1000)
    }
    // 清除倒计时
    const clearCountDown = () => {
      codeButton.status = false
      codeButton.text = '获取验证码'
      clearInterval(timer.value)
    }
    // 生命周期挂在完成后
    onMounted(() => {
      console.log('onMounted 生命周期挂在完成后')
    })

    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButton,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSms,
    }
  },
}
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
