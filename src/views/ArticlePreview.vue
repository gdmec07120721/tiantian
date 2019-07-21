<style scoped>
.page{padding: 15px;}
.preview-header {width: 100%; height: 60px; background: url('../assets/images/add-ad-banner.png') no-repeat; background-size: 100% 60px;} 
.preview-content {position: fixed; top: 80px; bottom: 182px; left: 0; right: 0; z-index: 0;}
.preview-footer{position: fixed; bottom: 0; left: 0; right: 0; bottom: 0; padding: 15px;}
.preview-ad-benner {width: 100%; height: 88px; background: url('../assets/images/ad-banner.png') no-repeat; background-size: 100% 88px;}
.preview-share-btn {background: #F1413D; border-color: #F1413D; padding:0 40px; margin-top: 20px;}
</style>

<template>
  <div class="page">
    <div class="preview-header">
      <!-- <img src="@/assets/images/add-sad-banner.png"> -->
    </div>
    <div class="preview-content"></div>
    <div class="preview-footer">
      <div class="preview-ad-benner"></div>
      <van-button type="primary" class="preview-share-btn">即刻分享</van-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ArticlePreview',
  data() {
    return {
      url: ''
    };
  }
};
</script>
