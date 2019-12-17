<template>
  <div class="hk-index">
    <div class="hk-index-header">
      <h3><span>精准追踪 助你成就销冠</span></h3>
    </div>
    <div class="hk-index-qrcode">
      <div class="hk-index-qrcode-img">
        <van-image
          width="125"
          height="125"
          src="@/assets/images/qrcode.png"
        />
      </div>
      <p>长按关注天天助推</p>
    </div>
    <div class="hk-index-marquee">
      <div class="hk-index-marquee-title">
        <h3 class="">这些冠销商都在用</h3>
      </div>
      <marquee direction="up" onmouseover="this.stop()" onmouseout="this.start()" ontouchstart="this.stop()" ontouchend="this.start()">
        <ul>
          <li>
            <div class="marquee-left">
              <van-image
                width="30px"
                height="30px"
                fit="cover"
                :src="item.headimgurl || 'https://img.yzcdn.cn/vant/cat.jpeg'"
              />
              <span>test</span>
            </div>
            <div class="marquee-right">
              <span>累计获客<strong class="text-primary pxy-xxs">800</strong>次</span>
            </div>
          </li>
        </ul>
      </marquee>
    </div>

  </div>
</template>

<script>

export default {
  name: 'HkIndex',
  data() {
    return {

    };
  },
  watch: {

  },
  created() {
    
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.hk-index {
  width: 100vw; min-height: 100vh; background: url(@/assets/images/hk-banner.png) no-repeat, linear-gradient(#E53935, #E35D5B); background-size: 100%; 

  &-header {
    & h3 {
      display: inline-block; padding: 2px 10px; font-size: 15px; padding: 3px 15px; background: #fff; border-radius: 50px; transform: skewX(15deg);
      & > span {
        display: inline-block; transform: skewX(0deg);
      }
    }
  }

  &-qrcode {
    display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 20px 0;
    &-img {
      padding: 5px; border-radius: 5px; background: #fff;
    }
  }

  &-marquee{
    &-title {
      margin-bottom: 15px;
      & > h3 {
        display: inline-block; width: 200px; height: 28px; background: url(@/assets/images/hk_title_bg.png) no-repeat; background-size: 100%; text-align: center; line-height: 28px;
      }
    }
    ul {
      padding: 15px; background: #fff; border-radius: 14px;
      & > li {
        display: flex; flex: 1; align-items: center;
        .marquee-left {
          display: flex; flex: 1; align-items: center; text-align: left;
        }
        .marquee-right {
          text-align: right;
        }
      }
    }
  }
}
</style>