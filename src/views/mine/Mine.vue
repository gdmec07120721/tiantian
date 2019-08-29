<style scoped>
.mine-data {display: flex; background: #fff; border-radius: 4px; text-align: center; padding: 15px; position: fixed; left: 15px; right: 15px; z-index: 999; top: 70px;}
.mine-data > li {flex: 1;}
.mine-data h3{font-size: 30px; margin: 0;}
.mine-data p{margin: 0; font-size: 14px; color: #666666;}
.mine-sub-info {display: flex; font-size: 12px; color: #666666;}
.mine-sub-info > span {display: flex; align-items: center; margin-right: 20px;}
.mine-icon {margin-right: 5px;}
.mine-list,
.mine-no-list {margin-top: 115px;}
.mine-list-title {font-size: 12px;}
.mine-list {padding-bottom: 30px;}
.mine-list >>> .van-cell {padding-top: 0; padding-bottom: 0;}
.mine-empty {text-align: center; color: #666666;}
.mine-empty img {display: block; width: 70%; margin: 32px auto;}
.mine-info {display: flex; justify-content: space-between; padding: 8px; background: #fff; border-radius: 4px; align-items: center;}
.mine-info-tag {padding: 5px 10px; border-radius: 30px;}
.mine-info-tag,
.mine-info-left {display: flex; align-items: center;}
.mine-info-left > span {margin-left: 10px;}
.mine-info-medel {padding-top: 2px;}
</style>

<template>
  <div class="mine">
    <ul class="mine-data">
      <li class="van-hairline--right">
        <h3 class="text-info">{{ statistics.expose_cnt }}</h3>
        <p>曝光数</p>
      </li>
      <li class="van-hairline--right">
        <h3 class="text-info">{{ statistics.click_cnt }}</h3>
        <p>点击量</p>
      </li>
      <li>
        <h3 class="text-info">{{ statistics.forward_cnt }}</h3>
        <p>转发量</p>
      </li>
    </ul>
    <template>
      <div v-if="list.lenght != 0" class="mine-list">
        <van-pull-refresh v-model="loading" @refresh="refreshList">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item.news_headline"
            >
              <h3 class="mb-0 mt-sm mine-list-title">《{{ item.news_headline }}》</h3>
              <p class="mine-sub-info mt-0 pxy-xs">
                <span>
                  <van-icon name="mine-icon description" />
                  <span>阅读数 {{ item.expose_num }}</span>
                </span>
                <span>
                  <i class="mine-icon iconfont icon-gongdanguanli-gongda"></i>
                  <span>点击量 {{ item.click_num }}</span>
                </span>
                <span>
                  <van-icon class="mine-icon" name="share" />
                  <span>转发量 {{ item.forward_num }}</span>
                </span>
              </p>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>

      <template v-else>
        <div class="mine-no-list container">
          <div class="mine-empty">
            <img src="../../assets/images/icon-empty.png">
            <p>客户就在你身边，只是你没发现</p>
            <p>分享好的广告追踪你的客户</p>
          </div>
        </div>

        <div class="mine-info mt-lg">
          <div class="mine-info-left">
            <van-image
              width="44px"
              height="44px"
              fit="cover"
              round
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <span>南无</span>
          </div>
          <van-tag round type="danger" class="mine-info-tag">
            <van-icon name="medel" class="mine-info-medel" />
            <span>已获客793次</span>
          </van-tag>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MineMine',
  data() {
    return {
      page: 1,
      list: [],
      statistics: {},
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
    this.getuserNewsStatistics();
  },
  methods: {
    getuserNewsStatistics() {
      this.$http({
        url: this.$http.adornUrl('/user/user_news_statistics'),
        method: 'get',
        data: this.$http.adornParams({
          uid: this.uid
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.statistics = res.result_rows[0];
          } else {
            this.statistics = {};
            this.$toast(res.retmsg);
          }
        });
    },
    onLoad() {
      this.$http({
        url: this.$http.adornUrl('/user/page_query_user_click_user_news'),
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