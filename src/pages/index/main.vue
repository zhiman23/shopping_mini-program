<template>
  <view class="content">
    <!-- 头部搜索框 -->
    <search />
    <!-- 轮播图 -->
    <swiper
      class="swiper"
      autoplay
      indicator-dots
      interval="3000"
      duration="1000"
      circular
      indicator-color="#CCC"
      indicator-active-color="#EA4350"
    >
      <swiper-item v-for="item in swiperData" :key="item.goods_id">
        <image class="swiper_image" :src="item.image_src" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <!-- 入口导航 -->
    <view class="nav">
      <navigator
        v-for="item in navi"
        :key="item.name"
        class="nav_item"
        hover-class="none"
        :open-type="item.open_type"
        :url="item.navigator_url"
      >
        <image class="nav_image" :src="item.image_src" mode="aspectFill" />
      </navigator>
    </view>
    <!-- 首页楼层 -->
    <view v-for="(item, index) in floorData" :key="index" class="floor">
      <!-- 楼层标题 -->
      <view class="floor_title">
        <image
          class="floor_title_image"
          :src="item.floor_title.image_src"
          mode="aspectFill"
        />
      </view>
      <!-- 楼层列表 -->
      <view class="floor_list">
        <navigator
          class="floor_list_item"
          v-for="item2 in item.product_list"
          :key="item2.name"
          :open-type="item2.open_type"
          :url="item2.navigator_url"
          hover-class="none"
        >
          <!-- 注意，小程序中属性绑定用反引号会报错 -->
          <image
            class="floor_list_image"
            :src="item2.image_src"
            mode="aspectFill"
            :style="'width:' + item2.image_width + 'rpx'"
          />
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import search from "@/components/search/index";
import { homeSwiper } from "@/api";

export default {
  components: {
    search,
  },
  data() {
    return {
      swiperData: [],
      navi: [],
      floorData: [],
    };
  },
  async onLoad() {
    //轮播图
    const res = await homeSwiper();
    this.swiperData = res.data.message;

    //导航栏
    uni.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
      success: (res) => {
        this.navi = res.data.message;
      },
    }),
      //首页导航
      uni.request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
        success: (res) => {
          res.data.message.forEach((item) => {
            item.product_list.forEach((item2) => {
              item2.navigator_url = item2.navigator_url.replace("?", "/main?");
            });
          });
          this.floorData = res.data.message;
        },
      });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.swiper {
  width: 750rpx;
  height: 340rpx;
}

.swiper image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.nav_image {
  display: inline-block;
  width: 128rpx;
  height: 140rpx;
  margin-top: 20rpx;
}
.floor {
  margin-top: 10rpx;
  .floor_title {
    .floor_title_image {
      width: 750rpx;
      height: 60rpx;
    }
  }

  .floor_list {
    // 检测浮动的子元素，清除浮动带来的影响
    overflow: hidden;
    .floor_list_item {
      // 浮动实现环绕效果
      float: left;
      margin-left: 13rpx;
      margin-bottom: 10rpx;
      &:nth-child(1) {
        // 第一个导航链接里面的图片变高
        .floor_list_image {
          height: 386rpx;
        }
      }
      .floor_list_image {
        height: 188rpx;
        vertical-align: top;
      }
    }
  }
}
</style>
