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
            <van-pull-refresh v-model="is_loading" @refresh="queryList">
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
      is_loading: false
    };
  },
  watch: {
    tab_active(nv) {
      this.queryList();
    }
  },
  methods: {
    queryList() {

    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.is_loading = false;
        this.count++;
      }, 500);
    },
    toAdAdd() {
      this.$router.push({ name: 'adAdd' });
    }
  }
};
</script>
