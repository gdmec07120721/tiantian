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
  name: 'ArticlePreview',
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
  }
};
</script>