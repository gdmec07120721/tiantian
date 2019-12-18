<template>
  <div>
    <van-tabs v-model="active" class="index-tab">
      <van-tab title="文章">
        <index-article />
      </van-tab>
      <van-tab title="视频">
        <index-video />
      </van-tab>
    </van-tabs>

    <the-footer :tab-actived="0" />
  </div>
</template>

<script>
import TheFooter from '@/views/common/TheFooter';
import IndexArticle from '@/views/index/Article';
import IndexVideo from '@/views/index/Video';

export default {
  components: { TheFooter, IndexArticle, IndexVideo },
  data() {
    return {
      active: 0
    };
  },
  watch: {

  },
  created() {

  },
  methods: {

  }
};
</script>

<style scoped>
.index-tab >>> .van-tabs__wrap{margin-bottom: 10px;}
.index-tab >>> .van-tabs__nav {background: transparent;}
</style>
