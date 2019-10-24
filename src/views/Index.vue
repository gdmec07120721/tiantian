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
      <!-- <van-grid :border="false" :column-num="3" class="ad-list-wrap">
        <van-grid-item v-for="(item, index) in grids" :key="index">
          <van-image class="grid-item-image" :src="item.image" />
          <span class="grid-item-text">{{ item.name }}</span>
        </van-grid-item>
      </van-grid> -->
      <van-tabs class="van-tabs-wrap" swipeable>
        <van-tab 
          v-for="(tab, index) in tabs"
          :key="index" 
          v-model="tab_actived" 
          :title="tab"
        >
          <div class="van-tabs-content temporary-class">
            <van-pull-refresh v-model="loading" @refresh="refreshList">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="queryList"
              >
                <van-cell v-for="item in new_list" :key="item.news_id" @click="toArticle(item)">
                  <div class="tabs-content-wrap">
                    <van-image
                      class="tabs-content-left"
                      width="112"
                      height="95px"
                      fit="cover"
                      :src="item.news_image_url"
                    />
                    <div class="tabs-content-right">
                      <h3>{{ item.news_headline }}</h3>
                      <p class="mt-0 text-xxs test-gray">来源：{{ item.new_agencies }}</p>
                      <div class="content-right-footer">
                        <div>{{ item.create_time }}</div>
                        <div class="tabs-share-wrap">
                          <van-icon name="share" /> 
                          <span>推广获客</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
        <!-- <van-icon name="plus" class="van-tab-add" @click="toAddKeys" /> -->
      </van-tabs>
    </div>
    <van-button class="add-article-btn" round type="danger" icon="plus" @click="addArticle" />
    <the-footer :tab-actived="0" />
  </div>
</template>

<script>
import TheFooter from '@/views/common/TheFooter';

export default {
  components: { TheFooter },
  data() {
    return {
      limit: 10,
      page_num: 1,
      new_list: [],
      swipes: {
        0: require('@/assets/images/banner-1.png')
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
      tab_actived: 0,
      tabs: {
        0: '推荐'
        // 1: '资讯',
        // 2: '娱乐',
        // 3: '军事',
        // 4: '企业制定'
      },
      loading: false,
      finished: false,
      is_query: false
    };
  },
  watch: {
    tab_actived(nv) {
      this.refreshList();
    }
  },
  created() {
    //this.queryManagerList();
  },
  methods: {
    queryList() {
      if (this.is_query) {
        return false;
      }

      this.is_query = true;

      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_list'),
        method: 'get',
        data: this.$http.adornParams({
          limit: this.limit,
          page_num: this.page_num,
          new_type: this.tab_actived
        })
      })
        .then(res => {
          this.loading = false;
          this.is_query = false;
          if (res && res.retcode == 0) {
            this.new_list = [...this.new_list, ...res.result_rows];
            this.page_num = res.page_num < res.pages ? res.page_num + 1 : res.page_num;

          } else {
            this.new_list = [];
            this.$toast(res.retmsg);
          }

          if (this.new_list.length >= res.total_num) {
            this.finished = true;
          }
        });
    },
    refreshList() {
      this.page_num = 1;
      this.new_list = [];
      this.loading = false;
      this.finished = false;
    },
    addArticle() {
      this.$router.push({ name: 'articleAdd' });
    },
    toArticle(item) {
      this.$router.push({ name: 'articleEdit', params: { id: item.news_id }});
    },
    toAddKeys() {
      this.$router.push({ name: 'keysMake' });
    }
  }
};
</script>

<style scoped>
.swipe-item {width: 100%; line-height: 145px; height: 145px; display: block;}
.grid-item-image >>> img {width: 20px;}
.grid-item-text {font-size: 12px; padding-top: 11px;}
.van-tabs-wrap {position: relative;  background: #fff;}
/* 只有推荐一个tab 暂时去掉 */
/* .van-tabs-wrap >>> .van-tabs__nav {width: 90%; } */
/* 只有推荐一个tab 暂时去掉 */
/* 只有推荐一个tab 暂时去加上 */
.van-tabs-wrap >>> .van-tabs__wrap--scrollable .van-tab {flex-basis: 22%; }
/* 只有推荐一个tab 暂时去加上 */
.van-tab-add {display: flex; width: 16px; height: 16px; background: #F1413D; color: #fff; text-align: center; border-radius: 4px; align-items: center; justify-content: center; position: absolute; right: 15px; top:13px;}
.van-tab-add:before {font-size: 12px; height: 12px;}
.van-tabs-content {position: fixed; top: 257px; bottom: 50px; z-index: 0; overflow: auto; left: 0; right: 0;}
.tabs-content-wrap{width: 100%; display: flex; align-items: stretch;}
.tabs-content-right{display: flex; flex-direction: column; align-content: space-around; justify-content: space-between; margin-left: 10px; flex: 1;}
.tabs-content-right h3 {font-size: 15px; text-align: left; font-weight: 400; margin: 0;}
.content-right-footer {font-size: 12px; display: flex; justify-content: space-between; color: #A6A6A6;}
.tabs-share-wrap {color: #F1413D;}
.tabs-share-wrap i {height: 12px; line-height: 15px; margin-right: 4px;}
.tabs-share-wrap span, .tabs-share-wrap i{display: inline-block; vertical-align: middle;}
.add-article-btn {position: fixed; bottom: 60px; right: 20px; width: 50px; height: 50px; font-size: 20px; padding: 0;}
/* 目前去掉广告 暂时去加上设置临时高度 s */
.temporary-class {top: 189px;}
/* 目前去掉广告 暂时去加上设置临时高度 e */
.ad-list-wrap >>> .van-grid-item__content {padding: 10px;}
</style>