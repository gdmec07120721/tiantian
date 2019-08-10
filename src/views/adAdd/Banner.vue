<style>
.banner-upload-wrap {text-align: center;}
.icon-banner-upload {width: 60px; height: 56px; background: url(../../assets/icon-banner-upload.png); background-size: contain;}
</style>

<template>
  <div>
    <div class="banner-upload-wrap">
      <van-uploader>
        <span class="icon-banner-upload"></span>
        <p>请点击此处，添加广告图片</p>
      </van-uploader>
    </div>
    <div class="banner-info-wrap">
      <ul>
        <li>
          <p>
            <span class="iconfont icon-gongdanguanli-gongda"></span>
            <span>图片点击效果</span>
          </p>
          <div>
            <van-button 
              v-for="(value, key) in click_type_config" 
              :key="key" 
              :type="click_type == key ? 'warning' : 'default'"
              @click="click_type = key"
            >
              {{ value }}
            </van-button>
          </div>
        </li>
        <li>
          <p>
            <span class="iconfont icon-lianjie"></span>
            <span>添加链接</span>
          </p>
          <div>
            <van-field v-model="value" placeholder="请输入链接" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    newId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      click_type: 0,
      click_type_config: {
        0: '跳转链接',
        1: '拨打电话',
        2: '展示海报'
      }
    };
  }
};
</script>