<style>
.page::after {height: 140px !important;}
.hot-list-tab {display: flex; border-radius: 4px; text-align: center; padding: 15px; position: fixed; left: 15px; right: 15px; z-index: 999; top: 70px; justify-content: space-around;}
.hot-list-tab button {padding: 0 25px; line-height: 40px; height: 40px; }
.hot-list-tab .van-button--plain {background: transparent;}
.hot-list-wrap {margin-top: 73px; padding-bottom: 30px;}
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
            :key="index"
            class="hot-list-item"
          >
            <span class="hot-list-item-num" :class="{'text-info': index < 3}" style="max-width: 15px;"><span>{{ index + 1 }}</span></span>
            <van-image
              width="30px"
              height="30px"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <span style="max-width: 60px; padding-left: 3px;">
              <span v-if="index < 3"><strong>{{ item.nickname }}</strong></span>
              <span v-else>{{ item.nickname }}</span>
            </span>
            <span class="hot-list-item-text">
              <van-icon class="hot-list-item-icon" name="browsing-history" />
              <span>曝光 {{ item.expose_cnt }} 次</span>
            </span>
            <span class="hot-list-item-text">
              <van-icon class="hot-list-item-icon" name="newspaper-o" />
              <span>文章 {{ item.expose_num }} 篇</span>
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
      page: 1,
      list: [],
      loading: false,
      finished: false
    };
  },
  watch: {
    tab_actived(nv) {
      this.refreshList();
    }
  },
  methods: {
    changeTab(key) {
      this.tab_actived = key;
    },
    onLoad() {
      let url = this.tab_actived == 0 ? '/user/page_query_hot_day' : '/user/page_query_hot_month';

      this.$http({
        url: this.$http.adornUrl(url),
        method: 'get',
        data: this.$http.adornParams({
          limit: 10,
          page: this.page,
          uid: this.uid
        })
      })
        .then(res => {
          this.loading = false;
          if (res && res.retcode == 0) {
            this.list = [...this.list, ...res.result_rows];
            this.page = this.page < res.total_page ? this.page + 1 : res.total_page;

          } else {
            this.list = [];
            this.$toast(res.retmsg);
          }

          if (this.list.length >= res.total_num) {
            this.finished = true;
          }
        });
    },
    refreshList() {
      this.page = 1;
      this.list = [];
      this.loading = false;
      this.finished = false;
      this.onLoad();
    }
  }
};
</script>