<template>
  <div class="page">
    <the-card-one />
  </div>
</template>

<script>
import TheArticleContent from '@/views/common/TheArticleContent';
import TheArticleFooter from '@/views/common/TheArticleFooter';
import TheCardOne from '@/views/common/TheCardOne';

export default {
  name: 'ArticlePreview',
  components: { TheCardOne },
  data() {
    return {
      url: ''
    };
  }
};
</script>