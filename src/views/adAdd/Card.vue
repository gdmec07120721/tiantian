<style scoped>
.ad-add-card >>> .van-cell {line-height: 35px; height: 56px; }
.ad-add-card >>> .van-cell-group__title {font-size: 13px; color: #333333; padding: 20px 0px 5px 0px;}
.ad-add-card >>> .van-cell__left-icon, 
.ad-add-card >>> .van-cell__right-icon,
.ad-add-card >>> .van-field__left-icon{color: #D0CECE; line-height: 35px; height: 35px;}
.ad-add-card >>> .van-cell__title {font-size: 13px;}
.ad-add-card >>> .van-field__control {text-align: right;}
.ad-add-card-head {display: flex; align-items: center;}
.ad-add-card-head >>> .van-image {margin-right: 10px;}
.ad-add-card-type {display: flex; width: 100%; background-color: transparent;}
.ad-add-card-type > div {position: relative; flex: 1;border-radius: 4px; overflow: hidden;}
.ad-add-card-type > div:first-child {margin-right: 8px;}
.ad-add-card-type > div:last-child {margin-left: 8px;}
.ad-add-card-type img {display: block; width: 100%;}
.card-type-icon {display: none;}
.card-type-actived,
.card-type-actived::before,
.card-type-actived::after {position: absolute; left: 0; top: 0; display: block;}
.card-type-actived::before {transform: scale(0.5); z-index: 2; top: -3px; left: -2px; color: #fff;}
.card-type-actived::after {content: ''; display: block; width: 0; height: 0; border-left: 20px solid #F1413D; border-bottom: 15px solid transparent; z-index: 1;}
</style>

<template>
  <div class="ad-add-card">
    <van-cell-group>
      <van-cell title="头像" icon="user-circle-o">
        <van-uploader :before-read="beforeRead" :after-read="afterRead">
          <div class="ad-add-card-head">
            <van-image
              width="28px"
              height="28px"
              fit="cover"
              round
              :src="params.user_head_portrait"
            />
            <van-icon name="arrow" color="#D0CECE" style="line-height: inherit;" />
          </div>
        </van-uploader>
      </van-cell>
      <van-field
        v-model="params.user_name"
        placeholder="请输入姓名"
        label="姓名"
        left-icon="edit"
        :clearable="true"
      />
      <van-field
        v-model="params.user_company_name"
        placeholder="请输入公司名称"
        label="公司名称"
        left-icon="hotel-o"
        :clearable="true"
      />
      <van-field
        v-model="params.position"
        placeholder="请输入职位"
        label="职位"
        left-icon="award-o"
        :clearable="true"
      />
      <van-field
        v-model="params.telphone"
        placeholder="请输入手机号码"
        label="手机号码"
        left-icon="phone-o"
        :maxlength="11"
        type="tel"
        :clearable="true"
      />
    </van-cell-group>
    <van-cell-group title="名片样式" class="ad-add-card-type">
      <div @click="params.card_type = 0">
        <van-icon name="success" class="card-type-icon" :class="{'card-type-actived': params.card_type == 0}" />
        <img src="@/assets/images/card-1.png">
      </div>
      <div @click="params.card_type = 1">
        <van-icon name="success" class="card-type-icon" :class="{'card-type-actived': params.card_type == 1}" />
        <img src="@/assets/images/card-2.png">
      </div>
    </van-cell-group>
    <div v-if="show_btn" class="ad-add-footer">
      <van-button type="danger" class="btn" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import { isPhoneNumber, dataURLtoFile } from '@/utils/index';
// clip 部分代码
import ClipImg from '@/utils/clipImg';

export default {
  name: 'Card',
  data() {
    return {
      params: {
        card_type: 0,
        user_head_portrait: require('../../assets/images/icon-banner-upload.png')
      },
      client_height: 0,
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
            this.params = res.result_rows[0].user_business_card || {
              card_type: 0,
              user_head_portrait: require('../../assets/images/icon-banner-upload.png')
            };
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    save() {
      if (!this.params.telphone || !isPhoneNumber(this.params.telphone)) {
        this.$toast('请输入正确格式的手机号码');
        return false;
      }
      
      let params = JSON.parse(JSON.stringify(Object.assign({}, this.params, {
        uid: this.uid
      })));
      let url = '';
     
      if (this.params.business_card_id) {
        url = '/user/modify_user_business_card';
        delete params.modify_time;
      } else {
        url = '/user/add_user_business_card';
        delete params.business_card_id;
      }

      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData(params, 'form')
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.$emit('on-card-save');      
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    clipImgFun(file) {
      return new Promise((resolve, reject) => {
        // clip部分代码 S
        this.clipImg = new ClipImg({
          file: file,
          clip: {
            width: '200px',
            height: '120px'
          },
          minClip: {
            width: 200,
            height: 120
          },
          scale: true,
          onConfirm: res => {
            resolve(res.clipImgSrc);
          },
          onCancel: () => {
            reject();
          }
        });
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
      this.clipImgFun(data.file)
        .then(clip_content => {
          let self = this,
            formdata = new FormData(),
            xhr = new XMLHttpRequest(),
            file = dataURLtoFile(clip_content, data.file.name);

          formdata.append('file', file);
              
          xhr.open('POST', this.$http.adornUrl('/images/save_user_add_image'), true);
          xhr.onload = function(oEvent) {
            if (xhr.status == 200) {
              let res = JSON.parse(xhr.responseText);

              if (res && res.retcode == 0) {
                self.params.user_head_portrait = res.result_rows[0].image_url;
              } else {
                self.params.user_head_portrait = '';
                self.$toast(res.retmsg);
              }
            }
          };

          xhr.onerror = function(error) {
            self.$toast(error);
          };
          xhr.send(formdata);
        });
    }
  }
};
</script>

