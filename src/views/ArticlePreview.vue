<template>
  <div class="page">
    <div class="preview-header"></div>
    <the-article-content :options="article" :contenteditable="true" />
    <the-article-footer :show-share-btn="true" @on-submit="submit" />
  </div>
</template>

<script>
import TheArticleContent from '@/views/common/TheArticleContent';
import TheArticleFooter from '@/views/common/TheArticleFooter';

export default {
  name: 'ArticlePreview',
  components: { TheArticleContent, TheArticleFooter },
  data() {
    return {
      news_id: this.$router.params,
      url: '',
      article: {}
    };
  },
  computed: {
    business_card_id() {
      return this.$store.articleCard.business_card.business_card_id;
    },
    banner_ad_id() {
      return this.$store.articleBanner.banner_ad.banner_ad_id;
    }
  },
  methods: {
    queryArticleDetail() {
      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_info'),
        method: 'post',
        data: this.$http.adornParams({
          news_id: this.news_id
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.article = res.result_rows[0];
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    submit() {
      this.$http({
        url: this.$http.adornUrl('/news/save_user_edit_news'),
        method: 'post',
        data: this.$http.adornParams({
          user_business_card: {
            business_card_id: this.business_card_id
          },
          banner_ad_info: {
            banner_ad_id: this.banner_ad_id
          },
          news_parent_id: this.news_id,
          text: this.article.text
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.share();
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    share() {
      
    }
  }
};
</script>
