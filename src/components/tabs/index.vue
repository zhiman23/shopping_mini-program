<template>
  <view class="tabs">
    <view
      class="tabs_item"
      v-for="(item, index) in tabsData"
      :key="item.id"
      :class="{ active: activeIndex === index }"
      @tap="changeTabsIndex(index)"
    >
      {{ item.text }}
    </view>
  </view>
</template>

<script>
export default {
  props: ["tabsData"],
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    changeTabsIndex(index) {
      this.activeIndex = index;
      this.$emit("change", index);
    },
  },
};
</script>

<style lang="less">
.tabs {
  display: flex;
  justify-content: space-evenly;
  .tabs_item {
    width: 184rpx;
    height: 88rpx;
    font-size: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3rpx solid transparent;
    &.active {
      font-weight: bold;
      border-bottom-color: #ea4350;
    }
  }
}
</style>