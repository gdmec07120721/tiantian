<template>
  <div class="footer">
    <van-tabbar v-model="tabActived" active-color="#F1413D">
      <van-tabbar-item icon="hot-o" @click="toPage('index')">热文</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="toPage('search')">客户</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" @click="toPage('data')">数据</van-tabbar-item>
      <van-tabbar-item icon="manager-o" @click="toPage('mine')">我的</van-tabbar-item>
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
  computed: {
    uid() {
      return this.$store.getters['user/user'].uid || '';
    }
  },
  methods: {
    toPage(name) {
      if (this.uid || name == 'index') {
        this.$router.push({ name: name, params: { id: this.news_id }});
      } else {
        this.$router.push({ path: '/login', query: { redirect_uri: `/${this.$route.fullPath}` }});
      }
    }
  }
};
</script>