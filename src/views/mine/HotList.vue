<style>
.page::after {height: 140px !important;}
.hot-list-tab {display: flex; border-radius: 4px; text-align: center; padding: 15px; position: fixed; left: 15px; right: 15px; z-index: 999; top: 70px; justify-content: space-around;}
.hot-list-tab button {padding: 0 25px; line-height: 40px; height: 40px; }
.hot-list-tab .van-button--plain {background: transparent;}
.hot-list-wrap {margin-top: 73px;}
.hot-list-item {padding-top: 20px; padding-bottom: 20px;}
.hot-list-item .van-cell__value,
.hot-list-item .van-cell__value > span{display: flex; align-items: center; justify-content: space-around; flex: 1; font-size: 12px;}
.hot-list-item .van-cell__value > span > span,
.hot-list-item .van-cell__value > span.hot-list-item-num > span {width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
.hot-list-item .van-cell__value > span.hot-list-item-text {flex: 2;}
.hot-list-item .van-cell__value > span.hot-list-item-num {flex: 1;} 
.hot-list-item-icon {padding-right: 3px;}
</style>
<template>
  <div class="hot-list">
    <div class="hot-list-tab">
      <van-button 
        v-for="(tab, key) in tab_config"
        :key="key"
        :plain="tab_actived != key"
        hairline 
        type="danger"
        @click="changeTab(key)"
      >{{ tab }}</van-button>
    </div>
    <div class="hot-list-wrap">
      <van-pull-refresh v-model="loading" @refresh="refreshList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="(item, index) in list"
            :key="item"
            class="hot-list-item"
          >
            <span class="hot-list-item-num" :class="{'text-info': index < 3}" style="max-width: 15px;"><span>1</span></span>
            <van-image
              width="30px"
              height="30px"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <span style="max-width: 60px; padding-left: 3px;">
              <span v-if="index < 3"><strong>东东asdasd枪</strong></span>
              <span v-else>东东asdasd枪</span>
            </span>
            <span class="hot-list-item-text">
              <van-icon class="hot-list-item-icon" name="browsing-history" />
              <span>曝光 800 次</span>
            </span>
            <span class="hot-list-item-text">
              <van-icon class="hot-list-item-icon" name="newspaper-o" />
              <span>文章 800 篇</span>
            </span>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotList',
  data() {
    return {
      tab_actived: 0,
      tab_config: {
        0: '3日排行榜', 
        1: '月度达人榜'
      },
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    changeTab(key) {
      this.tab_actived = key;
    },
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
    },
    refreshList() {
      
    }
  }
};
</script>