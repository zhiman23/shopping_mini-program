<template>
  <view>
    <!-- 1.0 收货地址 -->
    <view class="address" @tap="getAddressHandle">
      <view class="address_info" v-if="address.userName">
        <!-- text -->
        <text class="address_detail" user-select>
          {{ addressDetail }}
        </text>
        <view class="address_bottom">
          <text class="address_bottom_text">{{ address.userName }}</text>
          <text class="address_bottom_text">{{ address.telNumber }}</text>
        </view>
      </view>
      <!-- 1.2 情况2： 空状态 -->
      <view class="address_empty" v-else>
        <view class="address_empty_button" @click="getAddressHandle">
          点击获取收货地址
        </view>
      </view>
    </view>
    <!-- 2.0 结算商品列表 -->
    <!-- 3.0 底部栏 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      address: {},
      cartList: [],
    };
  },
  computed: {
    addressDetail() {
      const { provinceName, cityName, countyName, detailInfo } = this.address;
      return provinceName + cityName + countyName + detailInfo;
    },
  },
  onLoad() {
    this.address = uni.getStorageSync("address") || {};
  },
  methods: {
    getAddressHandle() {
      uni.chooseAddress({
        success: (res) => {
          console.log(res);
          this.address = res;
          uni.setStorageSync("address", res);
        },
      });
    },
  },
};
</script>

<style lang="less">
page {
  background-color: #f9f9f9;
}
.address {
  height: 188rpx;
  margin: 20rpx;
  background-color: #fff;
  border-radius: 5rpx;
  .address_empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .address_empty_button {
      width: 300rpx;
      height: 90rpx;
      border-radius: 45rpx;
      border: 1rpx solid var(--mainColor);
      font-size: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--mainColor);
    }
  }

  .address_info {
    padding: 20rpx;
    .address_detail {
      font-size: 32rpx;
    }

    .address_bottom {
      margin-top: 20rpx;
      font-size: 26rpx;
      .address_bottom_text {
        margin-right: 30rpx;
      }
    }
  }
}
</style>