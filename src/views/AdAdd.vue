<style scoped>
.tabs >>> .van-hairline--top-bottom::after {border: none;}
.tabs >>> .van-tabs__nav{background: none; border: 0;}
.tabs-page {padding-top: 10px; text-align: left;}
</style>

<template>
  <div class="page">
    <van-tabs v-model="tab_active" class="tabs" swipeable>
      <van-tab v-for="(tab, index) in tab_config" :key="index" :title="tab">
        <div class="tabs-page">
          <component :is="tabs[index]" :new-id="new_id" @on-card-save="tab_active = 1" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import AdAddBanner from '@/views/adAdd/Banner';
import AdAddCard from '@/views/adAdd/Card';

export default {
  name: 'ADAdd',
  components: { AdAddBanner, AdAddCard },
  data() {
    return {
      tab_active: 0,
      tab_config: {
        0: '名片广告',
        1: '通栏广告'
      },
      tabs: ['AdAddCard', 'AdAddBanner']
    };
  },
  computed: {
    new_id() {
      return this.$route.params.id;
    }
  }
};
</script>

