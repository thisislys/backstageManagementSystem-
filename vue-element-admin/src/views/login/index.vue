<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <lang-select class="set-language"/>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" style="color:rgba(0, 0, 0, 0.65)"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" style="color:rgba(0, 0, 0, 0.65)"/>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            auto-complete="on"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>
      <!-- <el-checkbox-group v-model="form.type">
        <el-checkbox label="记住密码" name="type"></el-checkbox>
      </el-checkbox-group> -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-top:20px;height:40px;opacity: 0.3;"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}</el-button>

      <!-- <div style="position:relative">
         <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          {{ $t('login.thirdparty') }}
        </el-button>
      </div> -->
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign/>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialSignin'
import {mapActions,mapState} from 'vuex'

export default {
  name: "Login",
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = ( rules,value, callback) => {
      if (!value) {
        // callback(new Error('Please enter the correct user name'))
      } else {
        callback();
      }
    }
    const validatePassword = (rules, value, callback) => {
      if (value.length < 6) {
        // callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      form: {
          type: [],
      },
      loginForm: {
        username: 'chenmanjie',
        password: 'Chenmanjie123!'
      },
      loginRules: {
        username: [],
        password: []
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    ...mapActions({
      login:'login/login',
    }),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let res = await this.login({
            user_name:this.loginForm.username,
            user_pwd:this.loginForm.password
          })
          if(res.code == 1){
            this.$router.push({ path: '/' })
          }
          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;
   
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 40px;
      /* caret-color: $cursor; */

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    height: 45px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    /* background: rgb(232, 240, 254) !important; */
    border-radius: 2px;
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556199193055&di=3f1f5b2711c72b4010c2ab00cb829d90&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c33b57415c9132f875b70f06e658.gif');
  background-size: 100% 100%;
  overflow: hidden;
  
  .login-form {
    position: absolute;
    right: 15%;
    top: 25%;
    width: 400px;
    max-width: 100%;
    padding: 30px 25px;
    box-sizing:border-box;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
