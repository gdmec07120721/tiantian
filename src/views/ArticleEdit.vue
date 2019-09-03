<template>
  <div class="page">
    <div class="preview-header" @click="toAddCard"></div>
    <the-article-content class="mt-lg" :options="article" :contenteditable="true" />
    <the-article-footer :show-share-btn="true" @on-submit="submit" @on-click="toAddBanner" />
    <van-popup
      v-model="show_share_dialog"
      round
      position="bottom"
      :style="{ height: '140px' }"
      class="article-share"
    >
      <p class="text-left article-share-title">分享到：</p>
      <van-icon name="close" class="article-share-close" @click="show_share_dialog = false" />
      <ul>
        <li 
          v-for="(class_name, key) in share_class" 
          :key="key"
          @click="share(key)"
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
import wx from 'weixin-jsapi';
import WEIXINCON from '@/config/weixinConfig';

export default {
  name: 'ArticleEdit',
  components: { TheArticleContent, TheArticleFooter },
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
      user_business_card: {},
      banner_ad_info: {},
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
  },
  mounted() {
    // wx.ready(function () {
    //   wx.updateAppMessageShareData(this.share_config);//分享给好友
    //   wx.updateTimelineShareData(this.share_config);//分享到朋友圈
    //   wx.onMenuShareQQ(this.share_config);//分享给手机QQ
    //   wx.onMenuShareQZone(this.share_config);
    // });
    this.setWxConfig();
  },
  methods: {
    setWxConfig() {
      let wx_config = Object.assign({}, WEIXINCON, {
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: window.SITE_CONFIG.weixin_appid, // 必填，公众号的唯一标识
        timestamp: this.user.timestamp,
        nonceStr: this.user.nonceStr,
        signature: this.user.signature
      });

      wx.config(wx_config);
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: WEIXINCON.jsApiList,
          success: function (res) {
            console.log('调用api成功' + res);
          }
        });
      });
      wx.error(function(res) {
        console.log(res);
      });
    },
    getCardAndBannerId() {
      this.$http({
        url: this.$http.adornUrl('/user/page_query_user_ad'),
        method: 'get',
        data: this.$http.adornParams({
          news_id: this.news_id
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.article = res.result_rows[0];
            this.user_business_card = res.result_rows[0].user_business_card;
            this.banner_ad_info = res.result_rows[0].banner_ad_info;
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
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
    toAddCard() {
      console.log('dsadasda');
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
      if (!this.user_business_card.ad_id) {
        this.$dialog.confirm({
          title: '提示',
          message: '名片暂未添加，确定分享吗？'
        }).then(() => {
          this.confirmSubmit();
        }).catch(() => {
          
        });
      } else if (!this.banner_ad_info.ad_id) {
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
        data: this.$http.adornParams({
          user_business_card: {
            business_card_id: this.user_business_card.ad_id
          },
          banner_ad_info: {
            banner_ad_id: this.banner_ad_info.ad_id
          },
          news_parent_id: this.news_id,
          text: this.article.text
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.show_share_dialog = true;
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
    },
    share(type) {

      switch (type) {
        case 'pyq':
        case 'qqkj':
          wx.ready(function () {      //需在用户可能点击分享按钮前就先调用
            wx.updateTimelineShareData({ 
              title: this.article.news_headline, // 分享标题
              link: `${window.SITE_CONFIG.redirect_uri}#${this.$route.fullPath}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function (res) {
                // 设置成功
                console.log(res);
              }
            });
          });
          break;
        case 'weixin':
        case 'qq':
          wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({ 
              title: this.article.news_headline, // 分享标题
              desc: '天天推', // 分享描述
              link: `${window.SITE_CONFIG.redirect_uri}#${this.$route.fullPath}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function (res) {
                // 设置成功
                console.log(res);
              }
            });
          });
          break;
        case 'weibo':
          break;
      }
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
</style>
