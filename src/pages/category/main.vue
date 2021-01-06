<template>
  <view>
    <!-- 搜索栏 -->
    <search />
    <!-- 分类主体 -->
    <view class="cate">
      <scroll-view 
      class="cate_left"
      scroll-y
      >
      <view>左边滚动容器</view>
      </scroll-view>
      <scroll-view 
      class="cate_right"
      scroll-y
      >
      <view>右边滚动容器</view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import search from "@/components/search/index.vue"
export default {
  components:{
    search
  }
}
</script>

<style lang="less" scoped>
.cate{
  display: flex;
  .cate_left{
    height: calc(100vh - 100rpx);
    width: 200rpx;
    background-color: #f3f3f3;
  }
  .cate_right{
    flex: 1;
    height: calc(100vh - 100rpx);
    background-color: red;
  }
}
</style>