<style scoped>
.article-footer-ad >>> img {width: 100%;}
.article-inster {position: fixed; right: 0; bottom: 70px;}
.article-inster-btn {border-radius: 30px 0 0 30px;}
</style>

<template>
  <div class="page">
    <component :is="card_type_config[user_business_card.card_type]" :options="user_business_card" />
    <the-article-content class="mt-lg" :options="article" />
    <div class="article-footer mt-lg" @click="clickBanner">
      <van-image
        class="article-footer-ad"
        height="85"
        :src="banner_ad_info.ad_image_url"
      />
    </div>
    <div class="article-inster">
      <van-button type="danger" size="small" class="article-inster-btn" @click="toInster">插入我的名片</van-button>
    </div>
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
      banner_ad_info: {},
      article: {
        content: '<img src="https://img.yzcdn.cn/vant/cat.jpeg" />'
      }
    };
  },
  computed: {
    new_id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.queryDetail();
  },
  methods: {
    queryDetail() {
      this.$http({
        url: this.$http.adornUrl('/news/query_user_own_news'),
        method: 'get',
        data: this.$http.adornParams({
          new_id: this.new_id
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            let resp = res.result_rows[0];
            this.article = resp;
            this.user_business_card = resp.user_business_card;
            this.banner_ad_info = resp.banner_ad_info;
            // TODO 页脚广告是否可以在不同位置 是否有点击效果 是否有广告内容???
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    clickBanner() {
      if (this.banner_ad_info.ad_click_effect_type == 1) {
        window.location.href = this.banner_ad_info.jump_link;
      } else if (this.banner_ad_info.ad_click_effect_type == 2) {
        window.location.href = `tel://${this.banner_ad_info.telphone}`;
      }
    },
    toInster() {
      this.$router.push({ name: 'articleEdit', params: { id: this.news_id }});
    }
  }
};
</script>