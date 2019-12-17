<style scoped>
.keys-make {font-size: 13px; text-align: left;}
.key-tag > span, .key-tag >>> .van-icon::before {display: inline-block; vertical-align: middle;}
.keys-make-list > ul {display: flex;}
.keys-make-list > ul > li {display: flex; flex-wrap: wrap; margin-right: 12px;}
.key-tag-close {margin-left: 5px;}
.keys-hot-list {display: flex; flex-wrap: wrap;}
.keys-hot-list li {margin-right: 12px; }
.keys-hot-list li >>> .van-tag--large {font-size: 12px; padding: 5px 14px;}
.field-input >>> .van-icon-search {color: #f44;}
.auto-keys {padding-top: 50px;}
.auto-keys-tip {font-size: 15px; text-align: center;}
</style>

<template>
  <div class="page keys-make">
    <div class="keys-make-wrap container">
      <p class="mt-0">定制品牌或行业关键词</p>
      <van-field v-model="value" class="field-input" right-icon="search" placeholder="请输入用户名" @click="showSearch" />
    </div>
    <div class="container mt-lg">
      <p class="mt-0">热门推荐</p>
      <ul class="keys-hot-list">
        <li><van-tag type="danger" size="large" plain hairline>标签</van-tag></li>
        <li><van-tag type="danger" size="large" plain hairline>标签</van-tag></li>
        <li><van-tag type="danger" size="large" plain hairline>标签</van-tag></li>
      </ul>
    </div>
    <div class="container mt-lg">
      <p class="mt-0">我的品牌或行业关键词</p>
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
              <van-icon class="key-tag-close" name="close" />
            </van-tag>
          </li>
        </ul>
      </div>
    </div>
    <van-popup
      v-model="show_search_popup"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      @close="searchCancel"
    >
      <div class="auto-keys">
        <van-search v-model="value" left-icon="" right-icon="search" placeholder="请输入搜索关键词" clearable />
        <van-radio-group v-model="selected_key">
          <van-list>
            <van-cell v-for="item in list" :key="item.id">
              <van-radio :name="item.id" checked-color="#E92B25">{{ item.name }}</van-radio>
            </van-cell>
            <p class="test-gray auto-keys-tip">找不到合适的关键词？点击<a href="javascript:;" class="text-primary" @click="createKey">创建</a></p>
          </van-list>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'KeysMake',
  data () {
    return {
      value: '',
      selected_key: '',
      default_list: [
        {
          id: 0,
          name: '小明'
        },
        {
          id: 1,
          name: '小冰'
        },
        {
          id: 2,
          name: 'beta'
        },
        {
          id: 3,
          name: '张三'
        },
        {
          id: 4,
          name: '李四'
        }
      ],
      list: [],
      show_search_popup: false
    };
  },
  watch: {
    value(nv) {
      this.filterList(nv);
    },
    selected_key(nv) {
      this.selectedKey();
    }
  },
  methods: {
    delTag() {

    },
    showSearch() {
      this.show_search_popup = true;
    },
    filterList(val) {
      this.list = this.default_list.filter(item => item.name.indexOf(val) > -1 && val);
    },
    createKey() {
      console.log(this.value);
    },
    selectedKey() {
      console.log(this.selected_key);
      this.show_search_popup = false;
    },
    searchCancel() {
      this.value = '';
      this.selected_key = '';
    }
  }
};
</script>

