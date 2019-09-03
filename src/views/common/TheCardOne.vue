<template>
  <div class="card-one">
    <div class="card-one-name">
      <span>{{ options.user_name }}</span>
      <span class="card-one-position">{{ options.position }}</span>
    </div>
    <div class="card-one-info">
      <ul>
        <li>
          <van-icon name="hotel-o" />
          <span>{{ options.user_company_name }}</span>
        </li>
        <li>
          <van-icon name="phone-o" />
          <span>{{ options.telphone }}</span>
        </li>
      </ul>
      <div class="card-one-img">
        <van-image
          round
          width="60px"
          height="60px"
          fit="cover"
          :src="options.user_head_portrait"
        />
      </div>
    </div>
    <div class="card-one-btn">
      <van-button type="danger" size="small" class="card-btn" @click="call">立即电联</van-button>
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
  },
  methods: {
    call() {
      // TODO 调起拨打
      window.location.href = `tel://${this.options.telphone}`;
    }
  }
};
</script>

