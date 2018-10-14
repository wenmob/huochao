<template>
  <div class="messageDesc">
    <div class="md-cont">
      <!--标题的内容-->
      <div class="md-cont-d1">
        <span class="md-title">
          新口子，额度独立申请，基本首次下款为1000元
        </span>
        <div class="md-cont-d2">
          <span class="s1">阅读：123213</span>
          <span class="s2">来自：最新口子</span>
          <div style="clear:both"></div>
        </div>
      </div>
      <!--内容-->
      <div class="md-cont-d3">
        <span class="s1">想要了解更多热门资讯、玩机技巧、数码评测、科普深扒，可以
          点击右上角关注我们的百家号：雷科技
        </span>
        <div class="d1">
          <img width="100%" src="../../../assets/images/news1.jpg" />
          <img width="100%" src="../../../assets/images/news2.jpg" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>
  .messageDesc {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .md-cont{
    padding: 15px;
  }
  .md-cont-d1 {
    padding-bottom: 15px;
    border-bottom: 1px solid #EEEEEE;
  }
  .md-title {
    color: #333333;
    font-size: 26px;
    display: block;
  }
  .md-cont-d2 {
    margin-top: 10px;
  }
  .md-cont-d2 .s1{
    float: left;
    color: #999999;
    font-size: 14px;
  }
  .md-cont-d2 .s2{
    float: right;
    color: #999999;
    font-size: 14px;
  }
  .md-cont-d3 {
    padding-top: 15px;
  }
  .md-cont-d3 .s1{
    display: block;
    font-size: 14px;
    color: #666666;
    line-height: 1.8;
  }
  .md-cont-d3 .d1{
    margin-top: 15px;
  }
</style>
