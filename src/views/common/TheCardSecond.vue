<template>
  <div class="card-second">
    <div class="card-second-img">
      <p class="card-second-img-bg">
        <van-image
          width="100%"
          height="120px"
          fit="contain"
          :src="options.user_head_portrait"
        />
      </p>
    </div>
    <div class="card-second-info">
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
      <p class="card-second-info-btn">
        <van-button round type="danger" class="card-btn" @click="call">立即电联</van-button>
      </p>
    </div>
    <div class="card-second-name">
      <p>
        <span class="card-name">{{ options.user_name }}</span>
        <span class="card-position">{{ options.position }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCardSecond',
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