<template>
  <div class="card-three">
    <div class="card-three-left">
      <van-image
        width="75px"
        height="75px"
        fit="cover"
        radius="5px"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <div class="card-three-right">
      <div class="card-three-info">
        <p>
          <van-icon name="user-o" />
          <span>张三</span>
        </p>
        <p>
          <van-icon name="hotel-o" />
          <span>木云文化有限公司木云文化有限公司</span>
        </p>
        <p>
          <van-icon name="phone-o" />
          <span>18300009999</span>
        </p>
        <p>
          <van-icon name="award-o" />
          <span>设计总监</span>
        </p>
      </div>
      <div class="card-three-info-btn">
        <van-button round type="danger" class="card-btn" @click="call">立即电联</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-three {
  display: flex; align-content: stretch; padding: 10px; box-shadow: 0 0 15px #ddd; border-radius: 5px;
  &-left {
    width: 75px; padding-right: 10px;
  }
  &-right {
    width: 100%; 
  }
  &-info {
    display: flex; flex: 1; flex-wrap: wrap;
    & > p {
      width: 50%; padding: 0; display: flex; align-items: center; font-size: 12px; margin: 3px 0; overflow: hidden; 
      & > span {
        padding-left: 5px; white-space: nowrap; text-overflow: ellipsis; width: 80%; overflow: hidden;
      }
    }
    &-btn {
      padding-top: 8px;
      & .card-btn {
        display: block; width: 100%; border-radius: 5px;
      }
    }
  }
}
</style>