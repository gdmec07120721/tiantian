<style scoped>
.data-total-wrap > ul {display: flex; }
.data-total-wrap > ul > li {display: flex; flex: 1; background: #fff; font-size: 12px; justify-content: space-around; padding: 5px 0;}
.data-total-wrap > ul > li:first-child {margin-right: 10px;}
.data-total-wrap > ul > li:last-child {margin-left: 10px;}
.data-total-title {font-weight: 400; font-size: 12px;}
.data-total {color: #EA2E27;}
.data-total-num {font-size: 34px; font-weight: bold;}
.data-ad img {width: 100%; display: block;}
.data-list {position: absolute; top: 170px; bottom: 50px; left: 15px; right: 15px; overflow: auto;}
.data-list-item >>> .van-cell__value {display: flex; align-items: center;}
.data-list-item-img >>> img{border-radius: 4px;}
.data-list-item span {display: inline-block; vertical-align: middle; white-space: nowrap; font-size: 12px;}
.data-list-article {display: flex; align-items: center; width: 45%; position: relative;}
.data-list-article-title {display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis;}
.data-list-username {padding: 0 5px;}
@media screen and (max-width: 320px){
    .data-list-article {width: 35%;}
}
</style>

<template>
  <div class="page">
    <div class="data-total-wrap">
      <ul>
        <li>
          <h3 class="data-total-title">今日查看</h3>
          <div class="data-total">
            <van-icon name="bar-chart-o" />
            <span class="data-total-num">12</span>
            <span>/人</span>
          </div>
        </li>
        <li>
          <h3 class="data-total-title">看我总数</h3>
          <div class="data-total">
            <van-icon name="eye-o" />
            <span class="data-total-num">12</span>
            <span>/人</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="data-ad mt-lg">
      <img src="../assets/images/data-banner.png">
    </div>
    <div class="data-list">
      <van-pull-refresh v-model="loading" @refresh="onLoad"> 
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            class="data-list-item"
          >
            <van-image
              width="18"
              height="18"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
              class="data-list-item-img"
            />
            <span class="data-list-username">东东枪</span>
            <span class="data-list-op text-info">点击</span>
            <span>了你的广告</span>
            <span class="data-list-article">
              <span>《</span>
              <span class="data-list-article-title">华谊兄弟终止收购英雄互华谊兄弟终止收购英雄互娱华谊兄弟终止收购英雄互娱娱</span>
              <span>》</span>
            </span>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="footer">
      <van-tabbar v-model="tab_active" active-color="#F1413D">
        <van-tabbar-item to="/index" icon="hot-o">热文</van-tabbar-item>
        <van-tabbar-item to="/search" icon="friends-o">客户</van-tabbar-item>
        <van-tabbar-item to="/data" icon="bar-chart-o">数据</van-tabbar-item>
        <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Data',
  data() {
    return {
      tab_active: 2,
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>