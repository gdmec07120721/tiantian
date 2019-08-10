<template>
  <div class="page keys">
    <div class="keys-make-wrap">
      <p></p>
      <van-field v-model="value" placeholder="请输入用户名" />
      <div class="keys-make-list">
        <ul>
          <li>
            <van-tag size="large" info="-" @click="delTag()"> 
              标签
            </van-tag>
          </li>
        </ul>
      </div>
    </div>
    <div class="keys-hot-list">
      <ul>
        <li><van-tag size="large" plain>标签</van-tag></li>
        <li><van-tag size="large" plain>标签</van-tag></li>
        <li><van-tag size="large" plain>标签</van-tag></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeysMake',
  methods: {
    delTag() {

    }
  }
};
</script>

