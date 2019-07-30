<template>
  <div class="ad-add-card">
    <van-cell-group>
      <van-cell title="头像" icon="user-circle-o">
        <div slot="right-icon" class="ad-add-card-head">
          <van-image
            width="28px"
            height="28px"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <van-icon name="arrow" color="#D0CECE" style="line-height: inherit;" />
        </div>
      </van-cell>
      <van-field
        placeholder="请输入姓名"
        value=""
        label="姓名"
        left-icon="edit"
      />
      <van-field
        placeholder="请输入公司名称"
        value=""
        label="公司名称"
        left-icon="hotel-o"
      />
      <van-field
        placeholder="请输入职位"
        value=""
        label="职位"
        left-icon="award-o"
      />
      <van-field
        placeholder="请输入手机号码"
        value=""
        label="手机号码"
        left-icon="phone-o"
      />
    </van-cell-group>
    <van-cell-group title="名片样式" class="ad-add-card-type">
      <div>
        <van-icon name="success" class="card-type-actived" />
        <img src="@/assets/images/card-1.png">
      </div>
      <div>
        <van-icon name="success" class="card-type-actived" />
        <img src="@/assets/images/card-2.png">
      </div>
    </van-cell-group>
    <div class="ad-add-card-footer">
      <van-button type="primary" class="primary-btn">保存</van-button>
    </div>
  </div>
</template>
