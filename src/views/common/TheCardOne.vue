<style>
.card-one{
  padding: 15px;
  height: 80px;
  z-index:1;
  border-radius: 4px;    
  position:relative;
  overflow: hidden;
  background: url('../../assets/images/card-one.png') no-repeat;
  background-size: 100% 100%;
}
.card-one-info:before{
  content:'';
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  filter:blur(5px);
  background: url('../../assets/images/card-one.png') no-repeat;
  background-size: 100% 100%;
  z-index:-1;
}
.card-one-info{
  position:absolute;
  top: 48px;right: 0;left: 35px;bottom: 15px;
  background:hsla(0,0%,100%,.1);
}
.card-one-name {font-size: 15px; color: #fff; text-align: left; padding-left: 30px;}
.card-one-position {font-size: 12px; padding-left: 7px; color: #ddd;}
.card-one-info {color: #fff; text-align: left; padding: 5px 10px; border-left: 2px solid #fff;}
.card-one-info > ul > li {display: flex; align-items: center;}
.card-one-info > ul > li:first-child {padding-bottom: 5px;}
.card-one-info > ul > li > span {font-size: 12px; padding-left: 5px}
.card-one-btn {position: absolute; bottom: 0; right: 0;}
.card-one-btn .card-btn {padding: 0 20px;}
.card-one-img {position: absolute; right: 17px; top: -40px; }
.card-one-img .van-image--round {border: 2px solid #fff;}
</style>

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
