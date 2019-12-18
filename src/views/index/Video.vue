<template>
  <div class="index-video">
    <div class="index-video-banner">
      <van-image
        width="100%"
        height="160"
        :src="banner"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexVideo',
  data() {
    return {
      banner: require('@/assets/images/video-banner.png')
    };
  }
};
</script>