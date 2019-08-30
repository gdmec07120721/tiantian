<style scoped>
.data-total-wrap > ul {display: flex; }
.data-total-wrap > ul > li {display: flex; flex: 1; background: #fff; font-size: 12px; justify-content: space-around; padding: 5px 0;}
.data-total-wrap > ul > li:first-child {margin-right: 10px;}
.data-total-wrap > ul > li:last-child {margin-left: 10px;}
.data-total-title {font-weight: 400; font-size: 12px;}
.data-total {color: #EA2E27;}
.data-total-num {font-size: 28px; font-weight: bold;}
.data-ad img {width: 100%; display: block;}
.data-list {position: absolute; top: 170px; bottom: 50px; left: 15px; right: 15px; overflow: auto;}
.data-list-item {padding: 15px;}
.data-list-item >>> .van-cell__value {display: flex; align-items: center;}
.data-list-item-img >>> img{border-radius: 4px;}
.data-list-item span {display: inline-block; vertical-align: middle; white-space: nowrap; font-size: 12px;}
.data-list-article {display: flex; align-items: center; width: 45%; position: relative;}
.data-list-article-title {display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis;}
.data-list-username {padding: 0 5px; color: #399CFF;}
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
            <span class="data-total-num">{{ data_cnt.today_cnt }}</span>
            <span>/人</span>
          </div>
        </li>
        <li>
          <h3 class="data-total-title">看我总数</h3>
          <div class="data-total">
            <van-icon name="eye-o" />
            <span class="data-total-num">{{ data_cnt.history_cnt }}</span>
            <span>/人</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="data-ad mt-lg">
      <img src="../assets/images/data-banner.png">
    </div>
    <div class="data-list">
      <van-pull-refresh v-model="loading" @refresh="refreshList"> 
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item.we_chat_nickname"
            class="data-list-item"
          >
            <van-image
              width="18"
              height="18"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
              class="data-list-item-img"
            />
            <span class="data-list-username">{{ item.we_chat_nickname }}</span>
            <span class="data-list-op" :class="{'text-info': item.action_type == 2}">{{ item.action_type == 1 ? '查看' : '点击' }}</span>
            <span>了你的{{ item.action_type == 1 ? '新闻' : '广告' }}</span>
            <span class="data-list-article">
              <span>《</span>
              <span class="data-list-article-title">{{ item.news_headline }}</span>
              <span>》</span>
            </span>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <the-footer :tab-actived="footer_active" />
  </div>
</template>

<script>
import TheFooter from '@/views/common/TheFooter';

export default {
  name: 'Data',
  components: { TheFooter },
  data() {
    return {
      footer_active: 2,
      page: 1,
      list: [],
      data_cnt: {},
      loading: false,
      finished: false
    };
  },
  computed: {
    uid() {
      return this.$store.getters['user/user'].uid;
    }
  },
  created() {
    this.getDataCnt();
  },
  methods: {
    getDataCnt() {
      this.$http({
        url: this.$http.adornUrl('/user/user_data_cnt'),
        method: 'get',
        data: this.$http.adornParams({
          uid: this.uid
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.data_cnt = res.result_rows[0];
          } else {
            this.data_cnt = {};
            this.$toast(res.retmsg);
          }
        });
    },
    onLoad() {
      this.$http({
        url: this.$http.adornUrl('/user/page_query_click_user_news'),
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