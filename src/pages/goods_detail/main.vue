<template>
  <view
    ><view>
      <!-- 商品轮播图 -->
      <swiper class="swiper" indicator-dots indicator-active-color="#EB4450">
        <swiper-item v-for="(item, index) in pics" :key="item.pics_id">
          <image
            class="swiper_image"
            :src="item.pics_big_url"
            mode="aspectFit"
            @tap="previewImageHandle(index)"
          />
        </swiper-item>
      </swiper>
      <!-- 商品信息 -->
      <view class="info">
        <view class="info_head">
          <text class="price">{{ goods_price }}</text>
          <view class="iconfont icon-zhuanfa"></view>
          <view class="iconfont icon-shoucang1"></view>
        </view>
        <view class="info_name">
          {{ goods_name }}
        </view>
      </view>
      <view class="divider"></view>
      <!-- 图文详情 -->
      <view class="detail">
        <view class="detail_head">图文详情</view>
        <!-- rich-text 类似于 v-html -->
        <rich-text :nodes="goods_introduce"></rich-text>
      </view>
      <!-- 底部固定栏 -->
      <view class="bottom">
        <view class="icon_item">
          <view class="iconfont icon-kefu"></view>
          <text class="icon_item_text">联系客服</text>
        </view>
        <view class="icon_item">
          <view class="iconfont icon-gouwuche"></view>
          <text class="icon_item_text">购物车</text>
        </view>
        <view class="button_item">加入购物车</view>
        <view class="button_item">立即购买</view>
      </view>
    </view></view
  >
</template>

<script>
import { getGoodsDetail, getGoodsList } from "@/api";
export default {
  data() {
    return {
      goods_id: "",
      pics: [],
      goods_price: "",
      goods_name: "",
      goods_introduce: "",
    };
  },
  onLoad({ goods_id }) {
    this.goods_id = goods_id;
    this.getGoodsDetailData();
  },
  methods: {
    async getGoodsDetailData() {
      const res = await getGoodsDetail({ goods_id: this.goods_id });
      let { pics, goods_price, goods_name, goods_introduce } = res.data.message;
      //按需绑定到data中
      this.pics = pics;
      this.goods_price = goods_price;
      this.goods_name = goods_name;
      const { system } = uni.getSystemInfoSync();
      const isIOS = system.toLowerCase().includes("ios");
      if (isIOS) {
        goods_introduce = goods_introduce.replace(/\.webp/g, ".jpg");
      }
      this.goods_introduce = goods_introduce.replace(
        /<img/g,
        '<img class="rich_img"'
      );
    },
    previewImageHandle(current) {
      const urls = this.pics.map((item) => item.pics_big);
      console.log(urls);
      uni.previewImage({ current, urls });
    },
  },
};
</script>

<style lang="less">
.swiper,
.swiper_image {
  width: 750rpx;
  height: 750rpx;
}
.info {
  padding: 20rpx;
  .info_head {
    display: flex;
    .price {
      flex: 1;
      font-size: 36rpx;
    }
    .iconfont {
      font-size: 40rpx;
      color: #666;
      margin-left: 20rpx;
    }
  }
  .info_name {
    margin-top: 20rpx;
    font-size: 30rpx;
    line-height: 1.5;
  }
}
// 商品图文详情
.detail_head {
  height: 88rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rich_img {
  display: block;
}

.bottom {
  border-top: 1rpx solid #ddd;
  height: 96rpx;
  position: fixed;
  width: 750rpx;
  background-color: #fff;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20rpx;
  box-sizing: border-box;
  .icon_item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .iconfont {
      font-size: 44rpx;
    }
    .icon_item_text {
      font-size: 20rpx;
    }
  }
  .button_item {
    background-color: #fba923;
    width: 196rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 26rpx;
    border-radius: 30rpx;
    &:last-child {
      background-color: var(--mainColor);
    }
  }
}
</style>