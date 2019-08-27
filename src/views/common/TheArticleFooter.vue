<template>
  <div class="preview-footer">
    <div class="preview-ad-benner"></div>
    <van-button v-if="showShareBtn" type="danger" class="preview-share-btn" @click="submit">即刻分享</van-button>
  </div>
</template>

<script>
export default {
  name: 'TheArticleFooter',
  props: {
    showShareBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    uid() {
      return '';
    }
  },
  created() {
    this.queryAd();
  },
  methods: {
    submit() {
      this.$emit('on-submit');
    },
    queryAd() {
      
    }
  }
};
</script>

<style scoped>
.preview-footer{position: fixed; bottom: 0; left: 0; right: 0; bottom: 0; padding: 15px;}
.preview-ad-benner {width: 100%; height: 88px; background: url('../../assets/images/ad-banner.png') no-repeat; background-size: 100% 88px;}
.preview-share-btn {background: #F1413D; border-color: #F1413D; padding:0 40px; margin-top: 20px;}
</style>
