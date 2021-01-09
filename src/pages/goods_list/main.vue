<template>
  <view>
    <!-- 搜索框 -->
    <search />
    <!-- tab栏 -->
    <tabs :tabsData="tabsData" @change="getTabsIndex" />
    <!-- 商品列表 -->
    <view class="goods_list">
      <goodsitem v-for="item in goods" :key="item.goods_id" :item="item" />
      <!-- 条件渲染：准备一个底部的提示盒子 -->
      <view class="tips" v-if="hasMore === false">😀我也是有底线的~</view>
    </view>
  </view>
</template>

<script>
import search from "@/components/search/index";
import tabs from "@/components/tabs/index";
import goodsitem from "@/components/goodsitem/index";

import { getGoodsList } from "@/api";
export default {
  components: {
    search,
    tabs,
    goodsitem,
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
      hasMore: true,
    };
  },
  onLoad({ cid }) {
    this.cid = cid || 999;
    this.getListData();
  },
  onReachBottom() {
    if (this.hasMore === true) {
      console.log("页面准备触底时触发");
      // 页码加 1
      this.pagenum += 1;
      // 重新发送请求
      this.getListData();
    }
  },
  methods: {
    // 获取商品列表数据
    async getListData() {
      const res = await getGoodsList({
        cid: this.cid,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      const { goods, total } = res.data.message;
      this.goods = [...this.goods, ...goods];
      // 如果总条数 等于 当前数组长度
      if (total === this.goods.length) {
        // 更新标记，已经没有更多数据了。
        this.hasMore = false;
      }
    },
    getTabsIndex(index) {
      console.log("由子组件传递过来的索引", index);
    },
  },
};
</script>

<style lang="less">
.tips {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>