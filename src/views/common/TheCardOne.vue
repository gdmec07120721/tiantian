<template>
  <div class="card-one">
    <div class="card-one-name">
      <span>福记层</span>
      <span class="card-one-position">产品经理</span>
    </div>
    <div class="card-one-info">
      <ul>
        <li>
          <van-icon name="hotel-o" />
          <span>天津木云文化有限公司</span>
        </li>
        <li>
          <van-icon name="phone-o" />
          <span>13811110359</span>
        </li>
      </ul>
      <div class="card-one-img">
        <van-image
          round
          width="60px"
          height="60px"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
    </div>
    <div class="card-one-btn">
      <van-button type="danger" size="small" class="card-btn">立即电联</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCardOne',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

