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
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <template v-if="!params.ad_pic_url">
          <span class="icon-banner-upload"></span>
          <p class="text-info">请点击此处，添加广告图片</p>
        </template>
        <van-image
          v-else
          height="88"
          fit="cover"
          :src="params.ad_pic_url"
        />
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
              :plain="params.ad_action != key"
              type="danger" 
              hairline
              @click="params.ad_action = key"
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
            <van-field v-model="params.jump_link" class="van-hairline--surround field-input" />
          </div>
        </li>
        <li>
          <p>
            <van-icon name="phone-o" color="#E4211B" style="line-height: inherit; margin-right: 8px;" />
            <span>添加电话</span>
          </p>
          <div class="banner-item-ctx">
            <van-field v-model="params.mobile" :maxlength="11" type="tel" class="van-hairline--surround field-input" />
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
import { isURL, isPhoneNumber } from '@/utils/index';

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
      click_type_config: {
        0: '跳转链接',
        1: '拨打电话',
        2: '展示海报'
      },
      params: {
        ad_pic_url: '',
        ad_action: 0
      }
    };
  },
  methods: {
    beforeRead(file) {
      if (file.type == 'image/jpeg' || file.type == 'image/png') {
        return true;
      } else {
        this.$toast('请上传 jpg/png 格式图片');
        return false;
      }
    },
    afterRead(file) {
      this.$http({
        url: this.$http.adornUrl('/images/save_user_add_image'),
        method: 'post',
        data: this.$http.adornParams({
          file: file
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.params.ad_pic_url = res.result_rows[0].image_url;
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    save() {
      if (!isPhoneNumber(this.params.mobile)) {
        this.$toast('请输入正确格式的手机号码');
        return false;
      } else if (!isURL(this.params.jump_link)) {
        this.$toast('请输入正确的链接');
        return false; 
      }

      let params = Object.assign({}, this.params, {
        uid: this.uid,
        ad_type: 2
      });

      this.$http({
        url: this.$http.adornUrl('/user/add_user_ad'),
        method: 'post',
        data: this.$http.adornParams(params)
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.$router.push({ name: 'articleEdit', params: { id: this.news_id }});   
          } else {
            this.$toast(res.retmsg);
          }
        });
    }
  }
};
</script>