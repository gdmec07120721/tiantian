<template>
  <div class="page">
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

export default {
  name: 'ArticleAdd',
  data() {
    return {
      url: ''
    };
  },
  methods: {
    isURL(url) {
      let strRegex = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;

      return strRegex.test(url);
    },
    submit() {
      if (!this.url) {
        this.$toast.fail('请粘贴链接');
        return false; 
      } else if (!this.isURL(this.url)) {
        this.$toast.fail('请输入正确的链接');
        return false; 
      }

      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_info'),
        method: 'post',
        data: this.$http.adornParams({
          url: this.url
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            setTimeout(() => {
              this.$router.push({ name: 'articlePreview', params: { id: res.result_rows[0].news_id }});
            }, 500);
          } else {
            this.$toast(res.retmsg);
          }
        });
    }
  }
};
</script>
