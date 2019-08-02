<style scoped>
.article-content {top: 130px;}
</style>

<template>
  <div class="page">
    <component :is="card_type_config[card_type]" :options="card_options" />
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
      card_type: '',
      card_type_config: ['TheCardOne', 'TheCardSecond'],
      card_options: {},
      article: {
        content: 'sadasdsadas<img src="https://img.yzcdn.cn/vant/cat.jpeg" />'
      }
    };
  },
  computed: {
    new_id() {
      return this.$store
    }
  },
  created() {
    this.queryDetail();
  },
  methods: {
    queryDetail() {

      
      
      "news_id":10,//新闻id,当用户直接点击推荐新闻时传入，否则为空
"news_url":"http://baidu.com",//新闻url，当用户主动输入新闻连接时，否则为空
    }
  }
};
</script>