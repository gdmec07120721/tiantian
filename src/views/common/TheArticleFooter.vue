<template>
  <div class="preview-footer">
    <div class="text-right">
      <van-button v-if="showInsterBtn" type="primary" class="preview-inster-btn">插入我的名片</van-button>
    </div>
    <div class="preview-ad-benner"></div>
    <van-button v-if="showShareBtn" type="primary" class="primary-btn">即刻分享</van-button>
  </div>
</template>

<script>
export default {
  name: 'TheArticleFooter',
  props: {
    showShareBtn: {
      type: Boolean,
      default: false
    },
    showInsterBtn: {
      type: Boolean,
      default: false
    }
  }
};
</script>
