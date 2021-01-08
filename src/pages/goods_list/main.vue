<template>
  <view>商品列表{{ cid }}</view>
</template>

<script>
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
    getListData() {
      uni.request({
        url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
        data: {
          cid: this.cid,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
        success: (res) => {
          // console.log(res.data.message);
          const { goods } = res.data.message;
          this.goods = goods;
        },
      });
    },
   }
};
</script>

<style>
</style>