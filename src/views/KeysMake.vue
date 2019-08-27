<style scoped>
.keys-make {font-size: 13px; text-align: left;}
.key-tag {display: flex; align-items: center; margin-right: 5px;}
.keys-make-list > ul {display: flex;}
.keys-make-list > ul > li {display: flex; flex-wrap: wrap;}
.key-tag-close {margin-left: 5px;}
.keys-hot-list {display: flex; flex-wrap: wrap;}
.keys-hot-list li {margin-right: 12px; }
.keys-hot-list li >>> .van-tag--large {font-size: 12px; padding: 5px 14px;}
.field-input >>> .van-icon-search {color: #f44;}
</style>

<template>
  <div class="page keys-make">
    <div class="keys-make-wrap container">
      <p class="mt-0">定制品牌或行业关键词</p>
      <van-field v-model="value" class="field-input" right-icon="search" placeholder="请输入用户名" />
      <div class="keys-make-list mt-lg">
        <ul>
          <li>
            <van-tag class="key-tag" type="danger" size="large" info="-" @click="delTag()"> 
              <span>标签</span>
              <van-icon class="key-tag-close" name="close" />
            </van-tag>
          </li>
          <li>
            <van-tag class="key-tag" type="danger" size="large" info="-" @click="delTag()"> 
              <span>标签</span>
              <van-icon name="close" />
            </van-tag>
          </li>
        </ul>
      </div>
    </div>
    <div class="container mt-lg">
      <p class="mt-0">热门推荐</p>
      <ul class="keys-hot-list">
        <li><van-tag type="danger" size="large" plain hairline>标签</van-tag></li>
        <li><van-tag type="danger" size="large" plain hairline>标签</van-tag></li>
        <li><van-tag type="danger" size="large" plain hairline>标签</van-tag></li>
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

