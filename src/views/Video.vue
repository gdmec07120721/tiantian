<template>
  <div class="video-page">
    <div class="video-wrap">
      <video src="https://www.w3school.com.cn/i/movie.ogg" controls="controls">
        您的浏览器不支持 video 标签。
      </video>
    </div>

    <div class="video-page-footer">
      <div class="video-info">
        <h3>@张三</h3>
        <p>一个原宿风的家装案例，户主比较喜欢简洁大方的家装， 在设计上采取精简而不失质感的方式，完成此次设计。</p>
      </div>
      <div class="video-card-warp">
        <the-card-three />
      </div>
    </div>
  </div>
</template>

<script>
import TheCardThree from '@/views/common/TheCardThree';

export default {
  name: 'Video',
  components: { TheCardThree }
};
</script>

<style lang="scss" scoped>
.video {
  &-wrap {
    & > video {
      width: 100%;
    }
  }
  &-page {
    &-footer {
      width: 100%; height: 304px; position: absolute; left: 0; right: 0; bottom: 0; text-align: left;
    }
  }
  &-info {
    height: 142px; padding:30px 15px 0;
  }
  &-card-warp {
    height: 100px; background: #fff; padding:15px;
  }
}
</style>