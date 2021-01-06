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
       <view
          v-for="item in cateLeft"
          :key="item.cat_id"
          class="cate_left_item"
        >
          {{ item.cat_name }}
        </view>
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
  },
  data(){
    return {
      cateLeft:[],
    }
  },
  onLoad(){
    uni.request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories",
      success:(res)=>{
        console.log(res.data.message);
        const cateAll=res.data.message;
        // this.cateLeft=cateAll.map((item)=>{
        //   return {
        //     cat_name:item.cat_name,
        //     cat_id:item.cat_id
        //   }
        // })
        this.cateLeft=cateAll.map(({cat_name,cat_id})=>({cat_name,cat_id}))
      }
    })
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