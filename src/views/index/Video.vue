<!--
 * @Author: your name
 * @Date: 2019-12-18 14:51:45
 * @LastEditTime : 2019-12-24 16:18:35
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gfloan-web-cssd:\me\tiantian\src\views\index\Video.vue
 -->
<template>
  <div class="index-video">
    <div class="index-video-banner">
      <van-image
        width="100%"
        height="160"
        :src="banner"
      />
    </div>
    <div class="index-video-content">
      <van-tabs type="card" color="#E4211B" title-active-color="#fff" title-inactive-color="#666">
        <van-tab title="推荐">
          <div class="card-content">
            <ul>
              <li @click="toVideo(item)">
                <div class="card-content-item">
                  <van-image
                    width="100%"
                    height="235px"
                    fit="fill"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <p>扑克的千万种炫酷玩法， 稍后发教学视频...</p>
              </li>
              <li>
                <div class="card-content-item">
                  <van-image
                    width="100%"
                    height="235px"
                    fit="fill"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                  />
                </div>
                <p>扑克的千万种炫酷玩法， 稍后发教学视频...</p>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="资讯">资讯</van-tab>
        <van-tab title="娱乐">娱乐</van-tab>
        <van-tab title="军事">军事</van-tab>
      </van-tabs>
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
  },
  methods: {
    toVideo(item) {
      this.$router.push({ name: 'video', params: { id: 1 }});
    }
  }
};
</script>

<style lang="scss" scoped>
.index-video {
  &-banner {
    padding: 0 15px;
  }
  .card-content {
    padding: 15px;
    &-item {
      border-radius: 4px; overflow: hidden;
    }
    & > ul {
      display: flex; flex: 1; flex-wrap: wrap;
      & > li {
        width: 49%; height: 235px; position: relative; 
        &:nth-child(2n) {
          padding-left: 1%;
        }
        &:nth-child(2n + 1) {
          padding-right: 1%;
          
        }
        & > p {
          position: absolute; bottom: 15px; left: 10px; right: 10px; font-size: 14px; color: #fff;
        }
      }
    }
  }
}
</style>

<style scoped>
.index-video >>> .van-tabs__nav--card,
.index-video >>> .van-tabs__nav--card .van-tab {border: 0;}
.index-video >>> .van-tabs__nav--card {height: 30px;}
.index-video >>> .van-tabs__nav--card .van-tab {height: 28px !important; border-radius: 30px; font-size: 12px;}
.index-video >>> .van-tabs--card > .van-tabs__wrap{height: 55px; background: #fff; margin: 0 15px;}
.index-video >>> .van-tabs__nav {margin-top: 14px;}
</style>