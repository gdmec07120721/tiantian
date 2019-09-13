<style scoped>
.article-footer-ad >>> img {width: 100%;}
.article-inster {position: fixed; right: 0; bottom: 70px;}
.article-inster-btn {border-radius: 30px 0 0 30px;}
.ql-editor {padding-left: 0; padding-right: 0;}
</style>

<template>
  <div class="page">
    <component :is="card_type_config[user_business_card.card_type]" :options="user_business_card" @on-click="clickCard" />
    <the-article-content class="mt-lg ql-editor" :options="article" />
    <div v-if="banner_ad_info.ad_image_url" class="article-footer mt-lg" @click="clickBanner">
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
    news_id() {
      return this.$route.params.id;
    },
    share_user() {
      return this.$route.query.share_user;
    },
    user() {
      return this.$store.getters['user/user'];
    }
  },
  created() {
    this.queryDetail()
      .then(() => {
        this.behavior({ operate_type: 2 });
      });
  },
  methods: {
    queryDetail() {
      return this.$http({
        url: this.$http.adornUrl('/news/query_user_own_news'),
        method: 'get',
        data: {
          news_id: this.news_id
        }
      })
        .then(res => {
          if (res && res.retcode == 0) {
            let resp = res.result_rows[0];

            this.article = resp;
            this.user_business_card = resp.user_business_card || {};
            this.banner_ad_info = resp.banner_ad_info || {};
            // TODO 页脚广告是否可以在不同位置 是否有点击效果 是否有广告内容???
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    clickCard() {
      this.behavior({ ad_id: this.user_business_card.business_card_id, operate_type: 3 });
    },
    clickBanner() {
      this.behavior({ ad_id: this.banner_ad_info.banner_ad_id, operate_type: 3 });

      if (this.banner_ad_info.ad_click_effect_type == 1) {
        window.location.href = this.banner_ad_info.jump_link;
      } else if (this.banner_ad_info.ad_click_effect_type == 2) {
        window.location.href = `tel://${this.banner_ad_info.telphone}`;
      }
    },
    toInster() {
      this.$router.push({ name: 'articleEdit', params: { id: this.news_id }});
    },
    behavior({ ad_id = '', operate_type = '' }) {
      this.$http({
        url: this.$http.adornUrl('/user/save_user_behavior'),
        method: 'post',
        data: this.$http.adornData({
          share_uid: this.share_user,
          we_chat_nickname: this.user.nickname,  //微信昵称
          headimgurl: this.user.headimgurl,
          news_id: this.article.news_id, //新闻id
          news_headline: this.article.news_headline, //新闻标题
          ad_id: ad_id, //广告id,
          operate_type: operate_type//操作类型 1 转发；2 阅读 ；3 点击广告
        }, 'form')
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.$router.push({ name: 'articleEdit', params: { id: this.news_id }});   
          }
        });
    }
  }
};
</script>