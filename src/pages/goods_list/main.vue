<template>
  <view>
    <!-- 搜索框 -->
    <search />
    <!-- tab栏 -->
    <tabs :tabsData="tabsData" @change="getTabsIndex" />
    <!-- 商品列表 -->
    <view class="goods_list">
      <goodsitem v-for="item in goods" :key="item.goods_id" :item="item" />
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
    };
  },
  onLoad({ cid }) {
    this.cid = cid || 999;
    this.getListData();
  },
  onReachBottom() {
    console.log("页面准备触底时触发");
  },
  methods: {
    // 获取商品列表数据
    async getListData() {
      const res = await getGoodsList({
        cid: this.cid,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      const { goods } = res.data.message;

      this.goods = goods;
    },
    getTabsIndex(index) {
      console.log("由子组件传递过来的索引", index);
    },
  },
};
</script>

<style lang="less">
</style>