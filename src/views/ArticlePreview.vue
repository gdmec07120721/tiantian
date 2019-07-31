<template>
  <div class="page">
    <div class="preview-header"></div>
    <the-article-content />
    <the-article-footer />
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
      url: ''
    };
  }
};
</script>
