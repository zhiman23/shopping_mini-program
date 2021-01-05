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
    };
  },
  onLoad() {
	  uni.request({
		  url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
		  success:(res)=>{
			  this.movies=res.data.message
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
</style>
