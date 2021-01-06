<template>
  <view>
    <!-- 搜索栏 -->
    <search />
    <!-- 分类主体 -->
    <view class="cate">
      <!-- 左侧 -->
      <scroll-view class="cate_left" scroll-y>
        <view
          v-for="item in cateLeft"
          :key="item.cat_id"
          class="cate_left_item"
        >
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view class="cate_right" scroll-y>
        <view class="floor" v-for="item in cateRight" :key="item.cat_id">
          <view class="title">{{ item.cat_name }}</view>
          <view class="list">
            <view
              class="item"
              v-for="item2 in item.children"
              :key="item2.cat_id"
            >
              <image class="item_image" lazy-load :src="item2.cat_icon" mode="aspectFill" />
              <text class="item_text">{{ item2.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import search from "@/components/search/index.vue";
export default {
  components: {
    search,
  },
  data() {
    return {
      cateLeft: [],
      cateRight: [],
    };
  },
  onLoad() {
    uni.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
      success: (res) => {
        console.log(res.data.message);
        const cateAll = res.data.message;
        // this.cateLeft=cateAll.map(({cat_name,cat_id})=>({cat_name,cat_id}))
        //  左边的数据--一级分类
        this.cateLeft = cateAll.map((item) => {
          return {
            cat_name: item.cat_name,
            cat_id: item.cat_id,
          };
        });
        // 右边的数据--二级数据
        this.cateRight = cateAll[0].children;
      },
    });
  },
};
</script>

<style lang="less" scoped>
.cate {
  display: flex;
  .cate_left {
    height: calc(100vh - 100rpx);
    width: 182rpx;
    background-color: #f3f3f3;
    .cate_left_item{
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .cate_right {
    flex: 1;
    height: calc(100vh - 100rpx);
    background-color: #fff;
    .floor{
      .title{
        // height: 100rpx;
        display: flex;
        justify-content: center;
        font-size: 26rpx;
         &::before,
        &::after {
          content: "/";
          color: #ccc;
          margin: 0 5px;
        }
      }
      .list{
        display: flex;
        flex-wrap:wrap;
        .item{
          width: 33.33%;
          padding: 20rpx 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .item_image{
            width: 120rpx;
            height: 120rpx;
          }
          .item_text{
            margin-top: 5rpx;
            font-size: 22rpx;
          }
        }
      }
    }
  }
}
</style>