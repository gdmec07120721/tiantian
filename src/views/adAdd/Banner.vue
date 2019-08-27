<style scoped>
.banner-wrap {font-size: 13px;}
.banner-upload-wrap {text-align: center;}
.icon-banner-upload {display: inline-block; width: 60px; height: 56px; background: url(../../assets/images/icon-banner-upload.png); background-size: contain;}
.banner-info-wrap ul > li > p {display: flex; align-items: center;}
.banner-info-wrap ul > li > p > span {margin-right: 8px;}
.banner-item-ctx {padding-left: 25px; display: flex; justify-content: space-between;}
.banner-item-ctx .btn {font-size: 12px; padding: 0 10px;}

</style>

<template>
  <div class="banner-wrap">
    <div class="banner-upload-wrap container">
      <van-uploader>
        <span class="icon-banner-upload"></span>
        <p class="text-info">请点击此处，添加广告图片</p>
      </van-uploader>
    </div>
    <div class="banner-info-wrap container mt-lg">
      <ul>
        <li>
          <p>
            <span class="iconfont icon-gongdanguanli-gongda text-primary"></span>
            <span>图片点击效果</span>
          </p>
          <div class="banner-item-ctx">
            <van-button 
              v-for="(value, key) in click_type_config"
              :key="key" 
              class="btn"
              :plain="click_type != key"
              type="danger" 
              hairline
              @click="click_type = key"
            >
              {{ value }}
            </van-button>
          </div>
        </li>
        <li>
          <p>
            <span class="iconfont icon-lianjie text-primary"></span>
            <span>添加链接</span>
          </p>
          <div class="banner-item-ctx">
            <van-field v-model="banner_url" class="van-hairline--surround field-input" />
          </div>
        </li>
      </ul>
    </div>
    <div class="ad-add-footer">
      <van-button type="danger" class="btn" @click="save">保存</van-button>
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
      },
      banner_url: ''
    };
  },
  methods: {
    save() {

    }
  }
};
</script>