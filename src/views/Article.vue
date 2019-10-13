<style scoped>
.article-footer-ad >>> img {width: 100%;}
.article-inster {position: fixed; right: 0; bottom: 70px; text-align: right;}
.article-home-btn {padding: 7px 10px 3px 17px; background: rgba(255, 151, 106, .8); color: #fff; display: inline-block; margin-bottom: 15px;}
.article-home-btn,
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
        fit="cover"
        height="100"
        :src="banner_ad_info.ad_image_url"
      />
    </div>
    <div class="article-inster">
      <div class="article-home-btn" @click="toHome">
        <van-icon name="wap-home" size="20px" />
      </div>
      <div>
        <van-button type="danger" size="small" class="article-inster-btn" @click="toInster">插入我的名片</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import TheArticleContent from '@/views/common/TheArticleContent';
import TheArticleFooter from '@/views/common/TheArticleFooter';
import TheCardOne from '@/views/common/TheCardOne';
import TheCardSecond from '@/views/common/TheCardSecond';
import loadExternalAssetMixin from '@/utils/loadExternalAssetMixin';
import WEIXINCON from '@/config/weixinConfig';

export default {
  name: 'Article',
  components: { TheCardOne, TheCardSecond, TheArticleContent, TheArticleFooter },
  mixins: [ loadExternalAssetMixin],
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
    },
    share() {
      return {
        link: `http://www.tiantiantui.top/tiantian#/article/${this.$route.params.id}?share_user=${this.user.uid}`,
        img_url: this.$route.query.news_image_url
      };
    }
  },
  created() {
    this.queryDetail()
      .then(() => {
        this.behavior({ operate_type: 2 });
      });
  },
  mounted() {
    // wx.ready(function () {
    //   wx.updateAppMessageShareData(this.share_config);//分享给好友
    //   wx.updateTimelineShareData(this.share_config);//分享到朋友圈
    //   wx.onMenuShareQQ(this.share_config);//分享给手机QQ
    //   wx.onMenuShareQZone(this.share_config);
    // });
    //this.setWxConfig();
    this.loadScript('http://res2.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
      this.setWxConfig();
    });
  },
  methods: {
    getConfig() {
      return new Promise((resolve, reject) => {
        this.$http({
          url: this.$http.adornUrl('/user/query_wei_xin_user_info'),
          method: 'get',
          data: this.$http.adornParams({
            code: this.user.code,
            url: encodeURIComponent(location.href.split('#')[0])
          })
        })
          .then(res => {
            if (res && res.retcode === 0) {
              resolve(res.result_rows[0]);
            } else {
              reject(res.retmsg);
            }
          });
      });
    },
    setWxConfig() {
      this.getConfig()
        .then(res => {
          let self = this;
          let wx_config = Object.assign({}, {
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: window.SITE_CONFIG.weixin_appid, // 必填，公众号的唯一标识
            timestamp: Number(res.timestamp),
            nonceStr: res.nonce_str,
            signature: res.signature,
            jsApiList: WEIXINCON.jsApiList
          });

          wx.config(wx_config);
          wx.ready(function () {
            let share_data = {
              title: self.article.news_headline, // 分享标题
              desc: '天天推', // 分享描述
              link: self.share.link, // 分享链接
              imgUrl: self.share.img_url, // 分享图标
              success: function (res) {
                // 设置成功
                this.$toast('分享成功！');
              }
            };
            //分享到朋友圈
            wx.onMenuShareTimeline(share_data);

            //分享给朋友
            wx.onMenuShareAppMessage(share_data);

            //分享到QQ好友
            wx.onMenuShareQQ(share_data);

            //分享到QQ空间
            wx.onMenuShareQZone(share_data);
            wx.checkJsApi({
              jsApiList: WEIXINCON.jsApiList,
              success: function (res) {
                console.log('调用api成功' + res);
              }
            });
          });
          wx.error(function(res) {
            self.$toast(JSON.stringify(res));
          });
        })
        .catch(err => {
          this.$toast(err);
        });
    },
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

      if (this.banner_ad_info.ad_click_effect_type == 0) {
        window.location.href = this.banner_ad_info.ad_click_content;
      } else if (this.banner_ad_info.ad_click_effect_type == 1) {
        window.location.href = `tel://${this.banner_ad_info.ad_click_content}`;
      }
    },
    toInster() {
      this.$router.push({ name: 'articleEdit', params: { id: this.news_id }});
    },
    //行为上报
    behavior({ ad_id = '', operate_type = '' }) {
      if (!this.share_user) {
        return false;
      }

      this.$http({
        url: this.$http.adornUrl('/user/save_user_behavior'),
        method: 'post',
        data: this.$http.adornData({
          open_id: this.user.openid,
          share_uid: this.share_user,
          we_chat_nickname: this.user.nickname,  //微信昵称
          headimgurl: this.user.headimgurl,
          news_id: this.article.news_id, //新闻id
          news_headline: this.article.news_headline, //新闻标题
          ad_id: ad_id, //广告id,
          operate_type: operate_type//操作类型 1 转发；2 阅读 ；3 点击广告
        }, 'form')
      });
    },
    toHome() {
      this.$router.push({ name: 'index' });
    }
  }
};
</script>