<style scoped>
.swipe-item {width: 100%; line-height: 145px; display: block;}
.grid-item-image >>> img {width: 20px;}
.grid-item-text {font-size: 12px; padding-top: 11px;}
.van-tabs-wrap {position: relative;  background: #fff;}
.van-tabs-wrap >>> .van-tabs__nav {width: 90%; }
.van-tab-add {display: flex; width: 16px; height: 16px; background: #F1413D; color: #fff; text-align: center; border-radius: 4px; align-items: center; justify-content: center; position: absolute; right: 15px; top:13px;}
.van-tab-add:before {font-size: 12px; height: 12px;}
.van-tabs-content {position: fixed; top:267px; bottom: 35px; z-index: 0; overflow: auto;}
.tabs-content-wrap {padding: 15px; background: #fff;}
.tabs-content-wrap > li {width: 100%; display: flex; align-items: stretch; padding-bottom: 15px;}
.tabs-content-right{display: flex; flex-direction: column; align-content: space-around; justify-content: space-between; margin-left: 10px;}
.tabs-content-right h3 {font-size: 15px; text-align: left; font-weight: 400; margin: 0;}
.content-right-footer {font-size: 12px; display: flex; justify-content: space-between; color: #A6A6A6;}
.tabs-share-wrap {color: #F1413D;}
.tabs-share-wrap i {height: 12px; line-height: 15px; margin-right: 4px;}
.tabs-share-wrap span, .tabs-share-wrap i{display: inline-block; vertical-align: middle;}
</style>

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
          :title="tab"
        >
          <div class="van-tabs-content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <ul class="tabs-content-wrap">
                <li v-for="index in 8" :key="index" class="van-hairline--bottom">
                  <van-image
                    class="tabs-content-left"
                    width="224"
                    fit="contain"
                    src="https://img.yzcdn.cn/vant/apple-1.jpg"
                  />
                  <div class="tabs-content-right">
                    <h3>华谊兄弟终止收购，英雄互娱或 转主，华谊最新消息！</h3>
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
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-icon name="plus" class="van-tab-add" />
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
      isLoading: false,
      active: 0,
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
      tabs: {
        0: '推荐',
        1: '资讯',
        2: '娱乐',
        3: '军事',
        4: '企业制定'
      }
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>
