<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="less">
/* css3 变量 */
page {
  --mainColor: #eb4450;
}
.price {
  color: var(--mainColor);
  &::before {
    content: "¥";
    font-size: 80%;
    margin-right: 3rpx;
  }
}
</style>
