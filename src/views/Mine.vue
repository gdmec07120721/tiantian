<style scoped>
.page::after {content: ""; display: block; height: 173px; position: fixed; left: 15px; right: 15px; top: 0; background: #f7f7f7; z-index: 998;}
.tabs >>> .van-tabs__nav {position: fixed; left: 15px; right: 15px; height: 44px; z-index: 999; background: transparent;}
</style>

<template>
  <div class="page">
    <van-tabs v-model="mine_active" class="tabs" swipeable>
      <van-tab v-for="(mine, index) in mine_config" :key="index" class="" :title="mine">
        <div class="tabs-page">
          <component :is="mines[index]" />
        </div>
      </van-tab>
    </van-tabs>
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
import MineMine from '@/views/mine/Mine';
import MineHotList from '@/views/mine/HotList';

export default {
  name: 'Mine',
  components: { MineMine, MineHotList },
  data() {
    return {
      mine_active: 0,
      mine_config: {
        0: '我的',
        1: '热榜'
      },
      mines: ['MineMine', 'MineHotList'],
      tab_active: 3
    };
  }
};
</script>