<template>
  <div class="preview-footer">
    <div @click="toAddBanner">
      <div v-if="showDefaultAd" class="preview-ad-benner"></div>
      <slot></slot>
    </div>
    <van-button v-if="showShareBtn" type="danger" class="preview-share-btn" @click="submit">保存</van-button>
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
    showDefaultAd: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    uid() {
      return '';
    }
  },
  methods: {
    submit() {
      this.$emit('on-submit');
    },
    toAddBanner() {
      this.$emit('on-click');
    }
  }
};
</script>

<style scoped>
.preview-footer{position: fixed; bottom: 0; left: 0; right: 0; bottom: 0; padding: 10px 15px; background: #fff;}
.preview-ad-benner {width: 100%; height: 88px; background: url('../../assets/images/ad-banner.png') no-repeat; background-size: 100% 88px;}
.preview-share-btn {background: #F1413D; border-color: #F1413D; padding:0 40px; margin-top: 5px;}
</style>
