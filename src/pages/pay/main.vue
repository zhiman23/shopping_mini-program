<template>
  <view>
    <!-- 1.0 收货地址 -->
    <view class="address">
      <button
        type="primary"
        @tap="getAddressHandle"
      >按钮</button>
    </view>
    <!-- 2.0 结算商品列表 -->
    <!-- 3.0 底部栏 -->
  </view>
</template>

<script>
export default {
    methods: {
    getAddressHandle() {
      // 获取用户收货地址。调起用户编辑收货地址原生界面。
      uni.chooseAddress({
        success: (res) => {
          console.log(res); // 编辑完成后返回用户选择的地址
        },
      });
    },
  },

};
</script>

<style>
</style>