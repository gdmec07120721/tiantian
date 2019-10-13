<template>
  <div class="page">
    <template>
      <div v-if="!user_business_card.business_card_id" class="preview-header" @click="toAddCard"></div>
      <div v-else @click="toAddCard">
        <component :is="card_type_config[user_business_card.card_type]" :options="user_business_card" />
      </div>
    </template>
    <the-article-content class="mt-lg article-edit-ctn" :options="article" :contenteditable="true" />
    <template>
      <the-article-footer :show-share-btn="true" :show-default-ad="!banner_ad_info.banner_ad_id" @on-submit="submit" @on-click="toAddBanner">
        <van-image
          v-if="!!banner_ad_info.ad_image_url"
          fit="cover"
          height="85"
          :src="banner_ad_info.ad_image_url"
        />
      </the-article-footer>
    </template>
    <van-popup
      v-model="show_share_dialog"
      round
      position="bottom"
      :style="{ height: '140px' }"
      class="article-share"
    >
      <div id="nativeShare"></div>
      <p class="text-left article-share-title">分享到：</p>
      <van-icon name="close" class="article-share-close" @click="show_share_dialog = false" />
      <ul>
        <li 
          v-for="(class_name, key) in share_class" 
          :key="key"
          @click="toDoshare(key)"
        >
          <span :class="class_name"></span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import TheArticleContent from '@/views/common/TheArticleContent';
import TheArticleFooter from '@/views/common/TheArticleFooter';
import TheCardOne from '@/views/common/TheCardOne';
import TheCardSecond from '@/views/common/TheCardSecond';
import wx from 'weixin-jsapi';



export default {
  name: 'ArticleEdit',
  components: { TheCardOne, TheCardSecond, TheArticleContent, TheArticleFooter },

  data() {
    return {
      url: '',
      article: {},
      share_class: {
        pyq: 'share-pyq',
        weixin: 'share-weixin',
        qq: 'share-qq',
        weibo: 'share-weibo',
        qqkj: 'share-qqkj'
      },
      card_type_config: ['TheCardOne', 'TheCardSecond'],
      user_business_card: {
        card_type: 0
      },
      banner_ad_info: {},
      share: {},
      show_share_dialog: false
    };
  },
  computed: {
    news_id() {
      return this.$route.params.id;
    },
    uid() {
      return this.user.uid;
    },
    user() {
      return this.$store.getters['user/user'];
    }
  },
  created() {
    this.queryArticleDetail();
    this.getCardAndBannerId();
    //this.setWxConfig();
  },

  methods: {

    getCardAndBannerId() {
      this.$http({
        url: this.$http.adornUrl('/user/query_user_card_and_ad'),
        method: 'get',
        data: this.$http.adornParams({
          uid: this.uid
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.user_business_card = res.result_rows[0].user_business_card || {};
            this.banner_ad_info = res.result_rows[0].banner_ad_info || {};
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    queryArticleDetail() {
      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_info'),
        method: 'post',
        data: this.$http.adornData({
          news_id: this.news_id
        }, 'form')
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.article = res.result_rows[0];
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    toAddCard() {
      this.$router.push({ 
        name: 'adAdd', 
        params: { 
          id: this.news_id 
        }, 
        query: {
          tab_active: 0
        }});
    },
    submit() {
      if (!this.user_business_card.business_card_id) {
        this.$dialog.confirm({
          title: '提示',
          message: '名片暂未添加，确定分享吗？'
        }).then(() => {
          this.confirmSubmit();
        }).catch(() => {
          
        });
      } else if (!this.banner_ad_info.banner_ad_id) {
        this.$dialog.confirm({
          title: '提示',
          message: '广告暂未添加，确定分享吗？'
        }).then(() => {
          this.confirmSubmit();
        }).catch(() => {
          
        });
      } else {
        this.confirmSubmit();
      }
    },
    confirmSubmit() {
      this.$http({
        url: this.$http.adornUrl('/news/save_user_edit_news'),
        method: 'post',
        data: this.$http.adornData({
          business_card_id: this.user_business_card.business_card_id,
          banner_ad_id: this.banner_ad_info.banner_ad_id,
          news_parent_id: this.news_id,
          text: this.article.text,
          uid: this.uid
        }, 'form')
      })
        .then(res => {
          if (res && res.retcode == 0) {
            //this.show_share_dialog = true;
            let self = this;

            this.share = res.result_rows[0];
            this.$toast('保存成功，请点击右上角可即刻分享！');
            setTimeout(() => {
              self.$router.push({
                name: 'article', 
                params: { id: self.share.news_id },
                query: { 
                  parent_news_id: self.share.parent_news_id,
                  news_image_url: self.share.news_image_url
                }
              });
            }, 500);
          } else {
            this.$toast(res.retmsg);
          }
        }); 
    },
    toAddBanner() {
      this.$router.push({ 
        name: 'adAdd', 
        params: { 
          id: this.news_id 
        }, 
        query: {
          tab_active: 1
        }});
    }
  }
};
</script>

<style scoped>
.preview-header {width: 100%; height: 60px; background: url('../assets/images/add-ad-banner.png') no-repeat; background-size: 100% 60px;} 
.article-share > ul{display: flex; align-items: center; justify-content: center; padding: 0 0 0 15px;}
.article-share > ul > li {padding: 10px 15px 15px 0;}
.article-share > ul > li > span {display: inline-block; width: 40px; height: 40px; background-size: contain; background-repeat: no-repeat; }
.share-pyq {background: url(../assets/images/share-pyq.png)}
.share-weixin {background: url(../assets/images/share-weixin.png); height: 32px !important;}
.share-qq {background: url(../assets/images/share-qq.png)}
.share-weibo {background: url(../assets/images/share-weibo.png); height: 32px !important;}
.share-qqkj {background: url(../assets/images/share-qqkj.png);}
.article-share-title {padding: 15px; margin: 0;}
.article-share-close {position: absolute; font-size: 18px; right: 15px; top: 20px;}
.article-edit-ctn {padding-bottom: 170px;}
</style>
