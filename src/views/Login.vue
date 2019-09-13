<style scoped>
.login-page {position: relative; height: 100vh;}
.login-banner {position: relative;}
.login-banner img {display: block; width: 100%; }
.login-banner h3 {position: absolute; top: 30%; left: 0; right: 0; z-index: 2; margin: auto; font-size: 25px; color: #fff;}
.login-ctn {position: absolute; left: 15px; right: 15px; top: 20%; bottom: 0; background: #fff; padding-top: 62px; border-radius: 10px 10px 0 0;}
.login-ctn-wrap {padding: 30px;}
.login-btn {margin-top: 30px;}
.login-code > p {color: #666666; font-weight: 100;}
.login-code-time {color: #666;}
</style>
<template>
  <div class="login-page">
    <div class="login-banner">
      <img src="../assets/images/login-bg.png">
      <h3>天天推</h3>
    </div>
    <div class="login-ctn">
      <div v-if="!is_verify" class="login-ctn-wrap">
        <h3>欢迎加入</h3>
        <van-cell-group class="pt-lg" :border="false">
          <van-field
            v-model="mobile"
            placeholder="请输入手机号"
            :error-message="error_message"
            left-icon="phone-o"
            type="tel"
            :maxlength="11"
          />
          <van-button type="danger" size="large" class="login-btn" @click="sendMobile">下一步</van-button>
        </van-cell-group>
      </div>
      <div v-else class="login-ctn-wrap login-code">
        <p class="mb-0">已发送验证码到</p>
        <h3>{{ mobile }}</h3>
        <van-cell-group class="pt-lg" :border="false">
          <van-field
            v-model="verify_code"
            placeholder="请输入验证码"
            left-icon="comment-o"
            type="number"
            :maxlength="4"
          >
            <van-button v-if="countdown == 60" slot="button" size="small" type="danger" @click="sendMobile">发送验证码</van-button>
            <span v-else slot="button" class="login-code-time">重新发送（{{ countdown }}）</span>
          </van-field>
          <p class="text-info text-left text-xxs pxy-sm">收不到验证码点这里</p>
          <van-button type="danger" size="large" class="login-btn" @click="verifyCode">下一步</van-button>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { isPhoneNumber } from '@/utils/index';

export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      verify_code: '',
      countdown: 60,
      error_message: '',
      countdown_interval: null,
      is_verify: false
    };
  },
  computed: {
    redirect_uri() {
      return this.$route.query.redirect_uri;
    },
    uid() {
      return this.$store.getters['user/user'].uid;
    }
  },
  destroyed() {
    window.clearInterval(this.countdown_interval);
  },
  created () {
    console.log(this.$route);
  },
  methods: {
    sendMobile() {
      if (!this.mobile || !isPhoneNumber(this.mobile)) {
        this.error_message = '请输入正确格式的手机号码';
        return false;
      }

      this.$http({
        url: this.$http.adornUrl('/user/send_message_to_mobile'),
        method: 'post',
        data: this.$http.adornParams({
          uid: this.uid,
          mobile: this.mobile
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.uid = res.result_rows[0].uid;
            this.is_verify = true;
            this.toDoCountdown();
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    verifyCode() {
      if (!this.verify_code) {
        return false;
      }

      this.$http({
        url: this.$http.adornUrl('/user/verify_code'),
        method: 'post',
        data: this.$http.adornParams({
          uid: this.uid,
          verify_code: this.verify_code
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            let user = { uid: this.uid };
            
            this.$store.commit('user/updatedUser', user);
            sessionStorage.setItem('user', JSON.stringify(user));
            this.$router.replace({ path: this.redirect_uri });
          } else {
            this.$toast(res.retmsg);
            this.mobile = '';
            this.verify_code = '';
            this.countdown = 60;
            this.is_verify = false;
          }
        });
    },
    toDoCountdown() {
      this.countdown = this.countdown - 1;
      this.countdown_interval = window.setInterval(() => {
        if (this.countdown > 0) {
          this.countdown = this.countdown - 1;
        } else {
          this.countdown = 60;
          window.clearInterval(this.countdown_interval);
        }
      }, 1000);
    }
  }
};
</script>