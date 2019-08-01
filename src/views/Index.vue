<template>
  <div>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="red">
        <van-swipe-item 
          v-for="(swipe, idx) in swipes"
          :key="idx"
        >
          <img :src="swipe" class="swipe-item">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <van-grid 
        :border="false"
        :column-num="3"
      >
        <van-grid-item
          v-for="(item, index) in grids"
          :key="index"
        >
          <van-image class="grid-item-image" :src="item.image" />
          <span class="grid-item-text">{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
      <van-tabs class="van-tabs-wrap" swipeable>
        <van-tab 
          v-for="(tab, index) in tabs"
          :key="index" 
          v-model="tab_active" 
          :title="tab"
        >
          <div class="van-tabs-content">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="listLoad"
            >
              <ul class="tabs-content-wrap">
                <li 
                  v-for="item in new_list" 
                  :key="item.news_id" 
                  class="van-hairline--bottom"
                  @click="toArticle(item)"
                >
                  <van-image
                    class="tabs-content-left"
                    width="224"
                    fit="contain"
                    :src="item.news_image_url"
                  />
                  <div class="tabs-content-right">
                    <h3>{{ item.news_headline }}</h3>
                    <div class="content-right-footer">
                      <div>03/10  16:00</div>
                      <div class="tabs-share-wrap">
                        <van-icon name="share" /> 
                        <span>推广获客</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </van-list>
            <!-- <van-pull-refresh v-model="is_loading" @refresh="refreshList">
              <ul class="tabs-content-wrap">
                <li v-for="item in new_list" :key="item.news_id" class="van-hairline--bottom">
                  <van-image
                    class="tabs-content-left"
                    width="224"
                    fit="contain"
                    :src="item.news_image_url"
                  />
                  <div class="tabs-content-right">
                    <h3>{{news_headline}}</h3>
                    <div class="content-right-footer">
                      <div>03/10  16:00</div>
                      <div class="tabs-share-wrap">
                        <van-icon name="share" /> 
                        <span>推广获客</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </van-pull-refresh> -->
          </div>
        </van-tab>
        <van-icon name="plus" class="van-tab-add" @click="toAdAdd" />
      </van-tabs>
    </div>
    <div class="footer">
      <van-tabbar v-model="active" active-color="#F1413D">
        <van-tabbar-item icon="hot-o">热文</van-tabbar-item>
        <van-tabbar-item icon="friends-o">客户</van-tabbar-item>
        <van-tabbar-item icon="bar-chart-o">数据</van-tabbar-item>
        <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limit: 10,
      total_num: 0,
      page_num: 1,
      pages: 3, //总页数
      new_list: [],
      swipes: {
        0: require('@/assets/images/banner-1.png'),
        1: require('@/assets/images/banner-1.png'),
        2: require('@/assets/images/banner-1.png')
      },
      grids: [{
        name: '升级会员',
        image: require('@/assets/images/icon-member.png')
      }, {
        name: '广告制作',
        image: require('@/assets/images/icon-ad.png')
      }, {
        name: '加盟代理',
        image: require('@/assets/images/icon-agent.png')

      }],
      tab_active: 0,
      tabs: {
        0: '推荐',
        1: '资讯',
        2: '娱乐',
        3: '军事',
        4: '企业制定'
      },
      loading: false,
      finished: false,
      error: false
    };
  },
  watch: {
    tab_active(nv) {
      this.page_num = 1;
      this.loading = false;
      this.finished = false;
      this.queryList();
    }
  },
  methods: {
    listLoad() {
      this.finished = true;
    },
    queryList() {
      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_list'),
        method: 'get',
        data: this.$http.adornParams({
          limit: this.limit,
          page_num: this.page_num,
          new_type: this.tab_active
        })
      })
        .then(res => {
          this.loading = false;

          if (res && res.retcode == 0) {
            this.new_list = res.result_rows || [];
            this.error = false;
          } else {
            this.list = [];
            this.$toast(res.retmsg);
            this.error = true;
          }
        });
    },
    refreshList() {
      this.page_num = 1;
      this.queryList();
    },
    toAdAdd() {
      this.$router.push({ name: 'adAdd' });
    },
    toArticle(item) {
      this.$router.push({ name: 'article', params: { id: item.news_id }});
    }
  }
};
</script>
