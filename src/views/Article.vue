<style scoped>
.article-content {top: 130px;}
</style>

<template>
  <div class="page">
    <component :is="card_type_config[user_business_card.card_type]" :options="user_business_card" />
    <the-article-content class="article-content" :options="article" :contenteditable="true" />
    <the-article-footer />
  </div>
</template>

<script>
import TheArticleContent from '@/views/common/TheArticleContent';
import TheArticleFooter from '@/views/common/TheArticleFooter';
import TheCardOne from '@/views/common/TheCardOne';
import TheCardSecond from '@/views/common/TheCardSecond';

export default {
  name: 'Article',
  components: { TheCardOne, TheCardSecond, TheArticleContent, TheArticleFooter },
  data() {
    return {
      url: '',
      card_type_config: ['TheCardOne', 'TheCardSecond'],
      user_business_card: {
        card_type: 0
      },
      article: {
        content: 'sadasdsadas<img src="https://img.yzcdn.cn/vant/cat.jpeg" />'
      }
    };
  },
  computed: {
    new_id() {
      return this.$store;
    }
  },
  created() {
    this.queryDetail();
  },
  methods: {
    queryDetail() {
      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_info'),
        method: 'post',
        data: this.$http.adornParams({
          new_id: this.new_id
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.article = res.result_rows[0];
            this.user_business_card = res.result_rows[0].user_business_card;
            // TODO 页脚广告是否可以在不同位置 是否有点击效果 是否有广告内容???
          } else {
            this.$toast(res.retmsg);
          }
        });
    }
  }
};
</script>