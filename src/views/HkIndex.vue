<template>
  <div class="hk-index">
    <div class="hk-index-header">
      <h3><span>精准追踪 助你成就销冠</span></h3>
    </div>
    <marquee direction="up" onmouseover="this.stop()" onmouseout="this.start()" ontouchstart="this.stop()" ontouchend="this.start()">
      <ul class="hk-index-marquee">
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
          <div class="marquee-right"></div>
        </li>
      </ul>
      <p>开发工程师</p>
      <p>设计师</p>
      <p>前端开发</p>
    </marquee>
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
  width: 100vw; 
  min-height: 100vh; 
  background: url(@/assets/images/hk-banner.png) no-repeat, linear-gradient(#E53935, #E35D5B); 
  background-size: 100%; 

  &-header {
    & h3 {
      display: inline-block; padding: 2px 10px; font-size: 15px; padding: 3px 15px; background: #fff; border-radius: 50px; transform: skewX(15deg);
      & > span {
        display: inline-block; transform: skewX(0deg);
      }
    }
  }
  &-marquee{
    & > li {
      display: flex; flex: 1;
    }
  }
}
</style>