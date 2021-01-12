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
@import "@/styles/iconfont.css";
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
.divider {
  height: 20rpx;
  background-color: #f9f9f9;
}
.opentype_button_wrap {
  position: relative;
  .opentype_button {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
