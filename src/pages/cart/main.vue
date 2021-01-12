<template>
  <view>
    <view class="cart_list">
      <view class="cart_item" v-for="item in cartList" :key="item.goods_id">
        <view class="cart_item_left">
          <radio
            @tap="changeSelectHandle(item.goods_id)"
            color="#EB4450"
            class="cart_item_select"
            :checked="item.goods_selected"
          />
        </view>
        <view class="cart_item_right">
          <GoodsItem :item="item" />
          <view class="cart_count">
            <view class="iconfont icon-jianshao"></view>
            <text class="cart_count_text">{{ item.goods_count }}</text>
            <view class="iconfont icon-zengjia"></view>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom">
      <radio color="#EB4450" class="bottom_select" />
      <text class="select_text">全选</text>
      <text class="total_text">合计：</text>
      <text class="total_price price">{{ totaiPrice }}</text>
      <view class="account">结算{{ account }}</view>
    </view>

    <view
      v-if="cartList.length === 0"
      class="cart_empty"
    >
      <image
        class="empty_image"
        mode="widthFix"
        src="@/static/cart_empty.gif"
      />
      <navigator
        url="/pages/index/main"
        open-type="switchTab"
        hover-class="none"
        class="empty_button"
      >去首页看看</navigator>
    </view>
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
      cartList: [{}],
    };
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      this.cartList.forEach((item) => {
        if (item.goods_selected) {
          totalPrice += item.goods_price * item.goods_count;
        }
      });
      return totalPrice;
    },
    account() {
      let account = 0;
      this.cartList.forEach((item) => {
        if (item.goods_selected) {
          account += item.goods_count;
        }
      });

      return account;
    },
  },
  onShow() {
    this.cartList = uni.getStorageSync("cartList") || [];
  },
  methods: {
    changeSelectHandle(goods_id) {
      const index = this.cartList.findIndex(
        (item) => item.goods_id === goods_id
      );
      this.cartList[index].goods_selected = !this.cartList[index]
        .goods_selected;
    },
  },
};
</script>

<style lang="less">
.cart_list {
  .cart_item {
    display: flex;
    padding: 0 20rpx;
    border-bottom: 1rpx solid #ddd;
    &:last-child {
      border-bottom: none;
    }
    .cart_item_left {
      width: 78rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cart_item_right {
      flex: 1;
      position: relative;
      .cart_count {
        display: flex;
        align-items: center;
        position: absolute;
        right: 20rpx;
        bottom: 20rpx;
        .iconfont {
          color: #666;
          font-size: 40rpx;
        }
        .icon-zengjia {
          font-size: 34rpx;
        }
        .cart_count_text {
          // 用最小宽度确保大部分情况下都是对齐的，特殊情况也能正常显示数字
          min-width: 80rpx;
          text-align: center;
          padding: 0 5rpx;
        }
      }
    }
  }
}
</style>