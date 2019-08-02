<template>
  <div class="page">
    <van-tabs v-model="tab_active" class="ad-add" swipeable>
      <van-tab v-for="(tab, index) in tab_config" :key="index" :title="tab">
        <div class="ad-add-tabs">
          <component :is="tabs[index]" :new-id="new_id" />
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
      tab_active: 2,
      tab_config: {
        0: '名片广告',
        1: '通栏广告'
      },
      tabs: ['AdAddCard', 'AdAddBanner']
    };
  },
  computed: {
    new_id() {
      return this.$router.params.id;
    }
  }
};
</script>
