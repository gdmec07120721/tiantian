<template>
  <div class="footer">
    <van-tabbar v-model="actived" active-color="#F1413D">
      <van-tabbar-item to="/index" icon="hot-o">热文</van-tabbar-item>
      <van-tabbar-item to="/client" icon="friends-o">客户</van-tabbar-item>
      <van-tabbar-item to="/data" icon="bar-chart-o">数据</van-tabbar-item>
      <!-- <van-tabbar-item to="/mine" icon="manager-o">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
  props: {
    tabActived: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      actived: 0
    };
  },
  watch: {
    tabActived(nv) {
      this.actived = nv;
    }
  },
  created() {
    this.actived = this.tabActived;
  }
};
</script>