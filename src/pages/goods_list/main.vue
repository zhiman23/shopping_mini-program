<template>
  <view>
    <!-- 搜索框 -->
    <search />
    <!-- tab栏 -->
    <tabs :tabsData="tabsData" @change="getTabsIndex" />
    <!-- 商品列表 -->
    <view class="goods_list">
      <view class="goods_item">
        <image class="goods_image" src="" mode="" />
        <view class="goods_info">
          <view class="goods_name"
            >商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</view
          >
          <view class="goods_price">9999</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import search from "@/components/search/index";
import tabs from "@/components/tabs/index";

import { getGoodsList } from "@/api";
export default {
  components: {
    search,
    tabs,
  },
  data() {
    return {
      tabsData: [
        { id: 1, text: "综合" },
        { id: 2, text: "销量" },
        { id: 3, text: "价格" },
      ],
      cid: "",
      pagenum: 1,
      pagesize: 10,
      goods: [],
    };
  },
  onLoad({ cid }) {
    this.cid = cid || 999;
    this.getListData();
  },
  methods: {
    // 获取商品列表数据
    async getListData() {
      const res = await getGoodsList({
        cid: this.cid,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      const { goods } = res.data.messge;
      this.goods = goods;
    },
    getTabsIndex(index) {
      console.log("由子组件传递过来的索引", index);
    },
  },
};
</script>

<style lang="less">
.goods_list {
  .goods_item {
    padding: 20rpx;
    display: flex;
    .goods_image {
      width: 191rpx;
      height: 191rpx;
      background-color: #ddd;
    }

    .goods_info {
      flex: 1;
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods_name {
        font-size: 28rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .goods_price {
      font-size: 24rpx;
      color: #ea4350;
      &::before {
        content: "¥";
        font-size: 80%;
        margin-right: 4rpx;
      }
    }
  }
}
</style>