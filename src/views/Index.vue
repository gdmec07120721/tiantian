<style scoped>
.swipe-item {line-height: 150px;}
</style>

<template>
  <div class="page">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="red">
        <van-swipe-item><div class="swipe-item">1</div></van-swipe-item>
        <van-swipe-item><div class="swipe-item">2</div></van-swipe-item>
        <van-swipe-item><div class="swipe-item">3</div></van-swipe-item>
        <van-swipe-item><div class="swipe-item">4</div></van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <van-grid>
        <van-grid-item
          v-for="value in 4"
          :key="value"
          icon="photo-o"
          text="文字"
        />
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <span>dasdsa</span>
        </van-grid-item>
      </van-grid>
      <van-tabs>
        <van-tab 
          v-for="index in 8" 
          :key="index" 
          :title="'标签 ' + index"
        >
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
