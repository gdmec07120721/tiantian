<style scoped>
.banner-wrap {font-size: 13px;}
.banner-upload-wrap {text-align: center;}
.icon-banner-upload {display: inline-block; width: 60px; height: 56px; background: url(../../assets/images/icon-banner-upload.png); background-size: contain;}
.banner-info-wrap ul > li > p {display: flex; align-items: center;}
.banner-info-wrap ul > li > p > span {margin-right: 8px;}
.banner-item-ctx {padding-left: 25px; display: flex;}
.banner-item-ctx .btn {font-size: 12px; padding: 0 10px; margin-right: 15px;}

</style>

<template>
  <div class="banner-wrap">
    <div class="banner-upload-wrap container">
      
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <template v-if="!params.ad_image_url">
          <span class="icon-banner-upload"></span>
          <p class="text-info">请点击此处，添加广告图片</p>
        </template>
        <van-image
          v-else
          height="88"
          fit="cover"
          :src="params.ad_image_url"
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
              :plain="params.ad_click_effect_type != key"
              type="danger" 
              hairline
              @click="params.ad_click_effect_type = key"
            >
              {{ value }}
            </van-button>
          </div>
        </li>
        <li v-if="params.ad_click_effect_type == 0">
          <p>
            <span class="iconfont icon-lianjie text-primary"></span>
            <span>添加链接</span>
          </p>
          <div class="banner-item-ctx">
            <van-field 
              v-model="params.ad_click_content" 
              class="van-hairline--surround field-input" 
              :clearable="true"
            />
          </div>
        </li>
        <li v-if="params.ad_click_effect_type == 1">
          <p>
            <van-icon name="phone-o" color="#E4211B" style="line-height: inherit; margin-right: 8px;" />
            <span>添加电话</span>
          </p>
          <div class="banner-item-ctx">
            <van-field 
              v-model="params.ad_click_content" 
              :maxlength="11" 
              type="tel" 
              class="van-hairline--surround field-input" 
              :clearable="true" 
            />
          </div>
        </li>
      </ul>
    </div>
    <div v-if="show_btn" class="ad-add-footer">
      <van-button type="danger" class="btn" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import { isURL, isPhoneNumber, isAndroid } from '@/utils/index';

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
        1: '拨打电话'
        // 2: '展示海报'
      },
      params: {
        ad_image_url: '',
        ad_click_effect_type: 1
      },
      show_btn: true
    };
  },
  computed: {
    uid() {
      return this.$store.getters['user/user'].uid;
    }
  },
  created() {
    this.getCardAndBannerId();
  },
  mounted() {
    let self = this;

    this.client_height = document.documentElement.clientHeight;
    
    window.onresize = () => {
      let new_height = document.documentElement.clientHeight;

      if (new_height < self.client_height - 100) {
        self.show_btn = false;
      } else {
        self.show_btn = true;
      }
    };
  },
  methods: {
    getCardAndBannerId() {
      this.$http({
        url: this.$http.adornUrl('/user/query_user_card_and_ad'),
        method: 'get',
        data: this.$http.adornParams({
          uid: this.uid
        })
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.params = res.result_rows[0].banner_ad_info || {
              ad_image_url: '',
              ad_click_effect_type: 1
            };
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    save() {
      if (this.params.ad_click_effect_type == 1 && !isPhoneNumber(this.params.ad_click_content)) {
        this.$toast('请输入正确格式的手机号码');
        return false;
      } else if (this.params.ad_click_effect_type == 0 && !isURL(this.params.ad_click_content)) {
        this.$toast('请输入正确的链接');
        return false; 
      }

      let params = JSON.parse(JSON.stringify(Object.assign({}, this.params, {
        uid: this.uid,
        location_type: 1
      })));
      let url = '';
     
      if (this.params.banner_ad_id) {
        url = '/user/modify_user_banner_ad';
        delete params.modify_time;
      } else {
        url = '/user/add_user_banner_ad';
        delete params.banner_ad_id;
      }

      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(params, 'form')
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.$router.push({ name: 'articleEdit', params: { id: this.$route.params.id }});   
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    beforeRead(file) {
      if (file.type == 'image/jpeg' || file.type == 'image/png') {
        return true;
      } else {
        this.$toast('请上传 jpg/png 格式图片');
        return false;
      }
    },
    //上传文件
    afterRead(data) {
      let self = this,
        formdata = new FormData(),
        xhr = new XMLHttpRequest();

      formdata.append('file', data.file);
              

      xhr.open('POST', this.$http.adornUrl('/images/save_user_add_image'), true);
      xhr.onload = function(oEvent) {
        if (xhr.status == 200) {
          let res = JSON.parse(xhr.responseText);

          if (res && res.retcode == 0) {
            self.params.ad_image_url = res.result_rows[0].image_url;
          } else {
            self.params.ad_image_url = '';
            self.$toast(res.retmsg);
          }
        }
      };

      xhr.onerror = function(error) {
        self.$toast(error);
      };
      xhr.send(formdata);
    }
  }
};
</script>