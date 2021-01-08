<template>
  <view>
    <!-- 搜索栏 -->
    <search />
    <!-- 分类主体 -->
    <view class="cate">
      <!-- 左侧 -->
      <scroll-view class="cate_left" scroll-y>
        <view
          v-for="(item, index) in cateLeft"
          :key="item.cat_id"
          class="cate_left_item"
          @tap="changeTabs(index)"
          :class="{
            active: activeIndex === index,
          }"
        >
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view class="cate_right" scroll-y>
        <view class="floor" v-for="item in cateRight" :key="item.cat_id">
          <view class="title">{{ item.cat_name }}</view>
          <view class="list">
            <navigator
            :url="`pages/goods_list/main?cid=${item2.cat_id}`"
              class="item"
              v-for="item2 in item.children"
              :key="item2.cat_id"
            >
              <image
                class="item_image"
                lazy-load
                :src="item2.cat_icon"
                mode="aspectFill"
              />
              <text class="item_text">{{ item2.cat_name }}</text>
            </navigator>
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
      activeIndex: 0,
      cateAll: [],
    };
  },
  onLoad() {
    //获取本地存储中的分类缓存
    const cateAll = uni.getStorageSync("cateAll") || [];

    if (cateAll.length === 0) {
      this.getCateData();
    } else {
      //获取现在的时间戳
      const now = Date.now();
      const old = uni.getStorageSync("cateAllTime");
      if (now - old >= 10 * 60 * 1000) {
        this.getCateData();
      } else {
        this.initData(cateAll);
      }
    }
  },
  methods: {
    changeTabs(index) {
      this.activeIndex = index;
      //  2. 更换右边展示的内容
      this.cateRight = this.cateAll[index].children;
    },
    getCateData() {
      uni.request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
        success: (res) => {
          console.log(res.data.message);
          const cateAll = res.data.message;
          // 为了方便在不同的函数中都能找到分类数据，把 cateAll 保存到页面组件中
          uni.setStorageSync("cateAll", cateAll);
          // 把保存到本地存储的时间也存起来
          uni.setStorageSync("cateAllTime", Date.now());
          // this.cateLeft=cateAll.map(({cat_name,cat_id})=>({cat_name,cat_id}))
          //  左边的数据--一级分类
        },
      });
    },
    //  更新 cateAll， cateLeft ，cateRight 三个数据
    initData(cateAll) {
      // 为了方便在不同的函数中都能找到分类数据，把 cateAll 保存到页面组件中
      this.cateAll = cateAll;
      // 通过数组的 map 方法映射一份精简过的数据
      // 第一个 ({ cate_name, cate_id })      从 item 中解构出来两个属性
      // 第二个 => ({ cate_name, cate_id })   箭头函数后面的表示返回一个对象
      // this.cateLeft = cateAll.map(({ cat_name, cat_id }) => ({
      //   cat_name,
      //   cat_id,
      // }));
      // 左边的数据 - 一级分类
      this.cateLeft = cateAll.map((item) => {
        return {
          cat_name: item.cat_name,
          cat_id: item.cat_id,
        };
      });
      // 右边的数据 - 二级分类
      this.cateRight = cateAll[0].children;
    },
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
    .cate_left_item {
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active {
        color: #eb4450;
        &::before {
          content: "";
          width: 4rpx;
          height: 44rpx;
          background-color: #eb4450;
          position: absolute;
          left: 0;
        }
      }
    }
  }
  .cate_right {
    flex: 1;
    height: calc(100vh - 100rpx);
    background-color: #fff;
    .floor {
      .title {
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
      .list {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 33.33%;
          padding: 20rpx 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .item_image {
            width: 120rpx;
            height: 120rpx;
          }
          .item_text {
            margin-top: 5rpx;
            font-size: 22rpx;
          }
        }
      }
    }
  }
}
</style>