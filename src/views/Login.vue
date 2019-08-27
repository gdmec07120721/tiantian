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
      <div v-if="false" class="login-ctn-wrap">
        <h3>欢迎加入</h3>
        <van-cell-group class="pt-lg" :border="false">
          <van-field
            v-model="phone"
            placeholder="请输入手机号"
            error-message="手机号格式错误"
            left-icon="phone-o"
          />
          <van-button type="danger" size="large" class="login-btn">下一步</van-button>
        </van-cell-group>
      </div>
      <div class="login-ctn-wrap login-code">
        <p class="mb-0">已发送验证码到</p>
        <h3>18633456789</h3>
        <van-cell-group class="pt-lg" :border="false">
          <van-field
            v-model="phone"
            placeholder="请输入验证码"
            left-icon="comment-o"
          >
            <span slot="button" class="login-code-time">重新发送（60）</span>
          </van-field>
          <p class="text-info text-left text-xxs pxy-sm">收不到验证码点这里</p>
          <van-button type="danger" size="large" class="login-btn">下一步</van-button>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      phone: ''
    };
  }
};
</script>