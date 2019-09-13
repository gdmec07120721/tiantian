<template>
  <div>
    <div class="add-article-wrap">
      <p class="add-article-title">
        <van-icon name="records" />
        <span>点击粘贴文章链接</span>
      </p>
      <div class="add-article-input">
        <van-field
          v-model="url"
          type="url"
          clearable
          placeholder="请粘贴文章链接"
        />
      </div>
      <p class="add-article-tip">支持公众号、腾讯新闻、今日头条新闻链接</p>
      <div>
        <van-button type="primary" class="add-article-btn" @click="submit">下一步</van-button>
      </div>
    </div>
    <div class="add-article-tip-wrap">
      <p class="add-article-tip-title">
        <van-icon name="question-o" />
        <span>如何复制文章链接?</span>
      </p>
      <p class="add-article-tip-content">先推荐腾讯的短网址服务（腾讯对自己家的业务网址是优先解析的，安全性方面也会高很多），其实就是利用腾讯的微博，虽然没什么人访问，但是制作短网址还是挺方便的。<br>
        登陆自己的微博记住微博地址然后把长网址贴到微博发文框内就获得了短地址。</p>
    </div>
  </div>
</template>

<script>
import { isURL } from '@/utils/index';

export default {
  name: 'ArticleAdd',
  data() {
    return {
      url: ''
    };
  },
  methods: {
    submit() {
      if (!this.url) {
        this.$toast.fail('请粘贴链接');
        return false; 
      } else if (!isURL(this.url)) {
        this.$toast.fail('请输入正确的链接');
        return false; 
      }

      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_info'),
        method: 'post',
        data: this.$http.adornData({
          news_url: this.url
        }, 'form')
      })
        .then(res => {
          if (res && res.retcode == 0) {
            setTimeout(() => {
              this.$router.push({ name: 'articleEdit', params: { id: res.result_rows[0].news_id }});
            }, 500);
          } else {
            this.$toast(res.retmsg);
          }
        });
    }
  }
};
</script>

<style scoped>
.add-article-wrap {margin: 15px; padding: 15px; border-radius: 4px; background: #fff; -moz-box-shadow:0px 10px 10px #eee; -webkit-box-shadow:0px 10px 10px #eee; box-shadow:0px 10px 10px #eee;}
.add-article-title, .add-article-tip-title {color: #F1413D; display: flex; align-items: center;}
.add-article-title >>> .van-icon-records {font-size: 28px;}
.add-article-title > span {font-size: 13px;}
.add-article-input{border-radius: 4px; border: 1px solid #CCCCCC;}
.add-article-input >>> .van-cell {background: transparent;}
.add-article-tip {font-size: 12px; color: #666666; transform: scale(.8) translateX(-12%); text-align: left;}
.add-article-btn {background: #F1413D; border-color: #F1413D; padding:0 40px; margin: 10px 0;}
.add-article-tip-wrap {font-size: 12px; color: #666; text-align: left; line-height: 2; padding: 5px 15px;}
.add-article-tip-title >>> .van-icon-question-o{font-weight: bold; font-size: 16px; margin-right: 5px;}
.add-article-tip-title > span { color: #333333;}
.add-article-tip-content {display: inline-block; margin: 0; padding-left: 20px; text-align: justify;} 
</style>
