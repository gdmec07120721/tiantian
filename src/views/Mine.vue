<style scoped>
.page::after {content: ""; display: block; height: 173px; position: fixed; left: 15px; right: 15px; top: 0; background: #f7f7f7; z-index: 998;}
.tabs >>> .van-tabs__nav {position: fixed; left: 15px; right: 15px; height: 44px; z-index: 999; background: transparent;}
</style>

<template>
  <div class="page">
    <van-tabs v-model="mine_active" class="tabs" swipeable>
      <van-tab v-for="(mine, index) in mine_config" :key="index" class="" :title="mine">
        <div class="tabs-page">
          <component :is="mines[index]" :updated="updated" />
        </div>
      </van-tab>
    </van-tabs>
    <the-footer :tab-actived="footer_active" />
  </div>
</template>

<script>
import MineMine from '@/views/mine/Mine';
import MineHotList from '@/views/mine/HotList';
import TheFooter from '@/views/common/TheFooter';

export default {
  name: 'Mine',
  components: { MineMine, MineHotList, TheFooter },
  data() {
    return {
      mine_active: 0,
      mine_config: {
        0: '我的',
        1: '热榜'
      },
      mines: ['MineMine', 'MineHotList'],
      footer_active: 3,
      updated: ''
    };
  },
  watch: {
    mine_active(nv) {
      this.updated = new Date().getTime();
    }
  }
};
</script>