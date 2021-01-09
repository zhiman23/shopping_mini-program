<template>
  <view>商品列表{{ cid }}</view>
</template>

<script>
import { getGoodsList } from "@/api";
export default {
  data() {
    return {
      cid: "",
      pagenum: 1,
      pagesize: 10,
      goods: [],
    };
  },
  onLoad({ cid }) {
    this.cid = cid;
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
  },
};
</script>

<style>
</style>