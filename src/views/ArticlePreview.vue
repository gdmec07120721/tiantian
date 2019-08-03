<style>
.article-share > ul{display: flex; align-items: center; justify-content: center; padding: 0 0 0 15px;}
.article-share > ul > li {padding: 10px 15px 15px 0;}
.article-share > ul > li > span {display: inline-block; width: 55px; height: 55px; background-size: contain; background-repeat: no-repeat; }
.share-pyq {background: url(../assets/images/share-pyq.png)}
.share-weixin {background: url(../assets/images/share-weixin.png); height: 43px !important;}
.share-qq {background: url(../assets/images/share-qq.png)}
.share-weibo {background: url(../assets/images/share-weibo.png); height: 45px !important;}
.share-qqkj {background: url(../assets/images/share-qqkj.png);}
.article-share-title {padding: 15px;}
.article-share-close {position: absolute; font-size: 18px; right: 15px; top: 20px;}
</style>

<template>
  <div class="page">
    <!-- <div class="preview-header"></div>
    <the-article-content :options="article" :contenteditable="true" />
    <the-article-footer :show-share-btn="true" @on-submit="submit" /> -->
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

export default {
  name: 'ArticlePreview',
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
      share_config: {
        imgUrl: 'http://www.yourwebsite.com/share.png', //分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
        desc: '你对页面的描述', //摘要,如果分享到朋友圈的话，不显示摘要。
        title: '分享卡片的标题', //分享卡片标题
        link: window.location.href, //分享出去后的链接，这里可以将链接设置为另一个页面。
        success: function() { //分享成功后的回调函数
        },
        cancel: function () { 
          // 用户取消分享后执行的回调函数
        }
      },
      show_share_dialog: true
    };
  },
  computed: {
    business_card_id() {
      return this.$store.articleCard.business_card.business_card_id;
    },
    banner_ad_id() {
      return this.$store.articleBanner.banner_ad.banner_ad_id;
    },
    news_id() {
      return this.$router.params.id;
    }
  },
  mounted() {
    // wx.ready(function () {
    //   wx.updateAppMessageShareData(this.share_config);//分享给好友
    //   wx.updateTimelineShareData(this.share_config);//分享到朋友圈
    //   wx.onMenuShareQQ(this.share_config);//分享给手机QQ
    //   wx.onMenuShareQZone(this.share_config);
    // });
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
      if (!this.business_card_id) {
        this.$dialog.confirm({
          title: '提示',
          message: '名片广告暂未添加，确定分享吗？'
        }).then(() => {
          this.confirmSubmit();
        }).catch(() => {
          // on cancel
        });
      }
    },
    confirmSubmit() {
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
            this.show_hare_dialog = true;
          } else {
            this.$toast(res.retmsg);
          }
        }); 
    },
    share(type) {

    }
  }
};
</script>
