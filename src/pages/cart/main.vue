<template>
  <view>
    <goodsitem v-for="item in cartList" :key="item.goods_id" :item="item" />
  </view>
</template>

<script>
import goodsitem from "@/components/goodsitem/index";
export default {
  components: {
    goodsitem,
  },
  data() {
    return {
      cartList: [],
    };
  },
  onShow(){
      this.cartList=uni.getStorageSync("cartList") || []
  }
};
</script>

<style>
</style>