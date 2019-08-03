<template>
  <div class="ad-add-card">
    <van-cell-group>
      <van-cell title="头像" icon="user-circle-o">
        <van-uploader :before-read="beforeRead" :after-read="afterRead">
          <div slot="right-icon" class="ad-add-card-head">
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
        v-model="user_name"
        placeholder="请输入姓名"
        label="姓名"
        left-icon="edit"
      />
      <van-field
        v-model="user_company_name"
        placeholder="请输入公司名称"
        label="公司名称"
        left-icon="hotel-o"
      />
      <van-field
        v-model="position"
        placeholder="请输入职位"
        label="职位"
        left-icon="award-o"
      />
      <van-field
        v-model="telphone"
        placeholder="请输入手机号码"
        label="手机号码"
        left-icon="phone-o"
      />
    </van-cell-group>
    <van-cell-group title="名片样式" class="ad-add-card-type">
      <div @click="params.card_type = 0">
        <van-icon name="success" class="card-type-actived" />
        <img src="@/assets/images/card-1.png">
      </div>
      <div @click="params.card_type = 1">
        <van-icon name="success" class="card-type-actived" />
        <img src="@/assets/images/card-2.png">
      </div>
    </van-cell-group>
    <div class="ad-add-card-footer">
      <van-button type="primary" class="primary-btn" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    newsId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      params: {
        card_type: 0,
        user_head_portrait: 'https://img.yzcdn.cn/vant/cat.jpeg'
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
            this.params.user_head_portrait = res.result_rows[0].image_url;
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    save() {
      let params = Object.assign({}, this.params, {
        news_id: this.newsId
      });

      this.$http({
        url: this.$http.adornUrl('/news/query_publish_news_info'),
        method: 'post',
        data: this.$http.adornParams(params)
      })
        .then(res => {
          if (res && res.retcode == 0) {
            this.saveStore(params);      
          } else {
            this.$toast(res.retmsg);
          }
        });
    },
    saveStore(params) {
      this.$store.commit('articleCard/saveBusinessCard', params);
      this.$router.push({ name: 'articlePreview', params: { id: this.params.news_id }});
    }
  }
};
</script>

