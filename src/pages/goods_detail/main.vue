<template>
  <view>商品详情页</view>
</template>

<script>
import { getGoodsDetail, getGoodsList } from "@/api";
export default {
  data() {
    return {
      goods_id: "",
    };
  },
  onLoad({ goods_id }) {
    this.goods_id = goods_id;
    this.getGoodsDetailData();
  },
  methods: {
    async getGoodsDetailData() {
      const res = await getGoodsDetail({ goods_id: this.goods_id });
      console.log(res.data.message);
    },
  },
};
</script>

<style>
</style>