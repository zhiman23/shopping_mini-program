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
          <goodsitem :item="item" />
          <view class="cart_count">
            <view
              @tap="changeCount(item.goods_id, -1)"
              class="iconfont icon-jianshao"
            ></view>
            <text class="cart_count_text">{{ item.goods_count }}</text>
            <view
              @tap="changeCount(item.goods_id, 1)"
              class="iconfont icon-zengjia"
            ></view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="cartList.length" class="bottom">
      <radio
        color="#EB4450"
        :checked="isSelectAll"
        class="bottom_select"
        @tap="changeSelectAllHandle"
      />
      <text class="select_text">全选</text>
      <text class="total_text">合计：</text>
      <text class="total_price price">{{ totaiPrice }}</text>
      <view class="account" @tap="goToPayHandle">结算{{ account }}</view>
    </view>

    <view v-if="cartList.length === 0" class="cart_empty">
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
        >去首页看看</navigator
      >
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
    isSelectAll(){
      return this.cartList.every((item)=>item.goods_selected)
    },
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
    changeCount(goods_id, number) {
      const index = this.cartList.findIndex(
        (item) => item.goods_id === goods_id
      );
      if (number === -1 && this.cartList[index].goods_count === 1) {
        uni.showModal({
          content: "是否删除当前商品？",
          confirmText: "删除",
          confirmColor: "#ccc",
          // 记得修改成箭头函数
          success: (res) => {
            if (res.confirm) {
              // console.log("用户点击确定");
              this.cartList.splice(index, 1);
            }
          },
        });
      } else {
        this.cartList[index].goods_count += number;
      }
    },
    changeSelectAllHandle() {
      const di = !this.isSelectAll;
      this.cartList.forEach((item) => {
        item.goods_selected = di;
      });
    },
    goToPayHandle() {
      if (this.account === 0) {
        uni.showToast({
          title: "请选择商品",
          icon: "none",
          duration: 1000,
        });
      } else {
        // 通过 API 的方式跳转页面
        uni.navigateTo({ url: "/pages/pay/main" });
      }
    },
  },
  watch: {
    cartList: {
      deep: true,
      handler: (val) => {
        uni.setStorageSync("cartList", val);
      },
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