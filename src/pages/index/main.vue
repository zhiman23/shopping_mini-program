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
      <swiper-item 
	  v-for="item in movies" 
	  :key="item.goods_id">
        <image 
		class="swiper_image" 
		:src="item.image_src" 
		mode="aspectFill"/>
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
        <image
          class="nav_image"
          :src="item.image_src"
          mode="aspectFill"
        />
      </navigator>
    </view>
  </view>
</template>

<script>
import search from "@/components/search/index";
export default {
  components: {
    search,
  },
  data() {
    return {
	  movies: [],
	  navi:[],
    };
  },
  onLoad() {
	  //轮播图
	  uni.request({
		  url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
		  success:(res)=>{
			  this.movies=res.data.message
		  }
	  }),
	  //导航栏
	  uni.request({
		  url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
		  success:(res)=>{
			  this.navi=res.data.message
		  }
	  })
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
</style>
