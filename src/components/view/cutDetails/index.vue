<template>
  <div class="cutDetails">
    <van-cell class="sk-cell">
      <van-row>
        <van-col span="4">
          <img class="m1" src="../../../assets/images/icon2.png"/>
        </van-col>
        <van-col span="10">
          <span class="s1" style="font-size: 15px">点币达</span>
          <span class="s2">782人申请</span>
        </van-col>
        <van-col span="10">
          <div class="d1">
            <img class="m2" src="../../../assets/images/meb.png"/>
            <span class="s3">成功率：</span>
            <span class="s4">97%</span>
          </div>
        </van-col>
      </van-row>
    </van-cell>
    <!--简介-->
    <div class="cd-d1">
      <p>芝麻分满580，无需要面签.极速</p>
      <p>征信要求：无</p>
      <p>平台名称：点币达信贷有限公司</p>
    </div>
    <!--额度、期限、费用-->
    <div class="cd-d2">
      <van-row type="flex">
        <van-col span="8" class="cd-d2-col col1" align="center">
          <span class="s1">额度</span>
          <span class="s2">1000-10000</span>
        </van-col>
        <van-col span="8" class="cd-d2-col col1" align="center">
          <span class="s1">期限</span>
          <span class="s2">7-14天</span>
        </van-col>
        <van-col span="8" class="cd-d2-col col2" align="center">
          <span class="s1">费用</span>
          <span class="s3">0.04%</span>
        </van-col>
      </van-row>
      <van-row type="flex">
        <van-col span="8" class="cd-d2-col col3" align="center">
          <span class="s4">放款速度</span>
          <span class="s2">2小时</span>
        </van-col>
        <van-col span="8" class="cd-d2-col col3" align="center">
          <span class="s4">审核方式</span>
          <span class="s2">自动审核</span>
        </van-col>
        <van-col span="8" class="cd-d2-col" align="center">
          <span class="s4">到账方式</span>
          <span class="s3">银行卡</span>
        </van-col>
      </van-row>
    </div>
    <!--申请攻略-->
    <div class="cd-d3">
      <span class="s1">申请攻略</span>
      <div style="height: 120px" align="center">
        <span style="line-height: 120px; color: #666666">图文介绍</span>
      </div>
    </div>
    <!--同类产品、更多-->
    <div class="cd-d4">
      <span class="s1">同类产品</span>
      <a class="a1">更多</a>
      <div style="clear:both"></div>
    </div>
     <!--列表展示-->
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          class="sk-cell"
        >
         <van-row type="flex">
           <van-col span="4">
             <img class="m1" :src="item.img"/>
           </van-col>
           <van-col span="20">
             <van-row>
               <span style="font-szie: 16px">点币达</span>
               <van-tag type="danger" v-if="item.type == 0">热门口子</van-tag>
               <van-tag style="background: #FFBF61" v-else>推荐口子</van-tag>
             </van-row>
             <van-row type="flex">
               <van-col span="10"><span>额度：1000-10000</span></van-col>
               <van-col span="8"><span>成功率：<i style="color: red">97%</i></span></van-col>
               <van-col span="6"><span>费用<i style="color: red">0.04%</i></span></van-col>
             </van-row>
             <van-row>
               <span>芝麻分满580，无需要面签，极速</span>
             </van-row>
           </van-col>
         </van-row>
        </van-cell>
      </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: true,
      list: [
        {
          id: 1,
          img: require("../../../assets/images/icon4.png"),
          type: 0
        },
        {
          id: 2,
          img: require("../../../assets/images/icon4.png"),
          type: 1
        }
      ]
    };
  }
};
</script>

<style lang="postcss" scoped>
.sk-cell {
  color: #666666;
  background: #fff;
}
.sk-cell .m1 {
  float: left;
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.sk-cell .s1 {
  display: block;
  margin-top: 10px;
}
.sk-cell .d1 {
  width: 150px;
  height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin-top: 14px;
}
.sk-cell .m2 {
  float: left;
  width: 20px;
  margin-top: 12px;
  margin-left: 12px;
}
.sk-cell .s3 {
  float: left;
  color: #858585;
  font-size: 14px;
  margin-left: 6px;
  margin-top: 10px;
}
.sk-cell .s4 {
  float: left;
  color: #ff1c1c;
  font-size: 24px;
  margin-top: 8px;
}
.cd-d1 {
  background: #fff;
  padding: 10px 15px;
  line-height: 30px;
}
.cd-d1 p {
  margin: 0px;
  padding: 0px;
  color: #666666;
  font-size: 13px;
}
.cd-d2 {
  margin-top: 10px;
  background: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.cd-d2-col {
  height: 80px;
}
.cd-d2-col .s1 {
  display: block;
  color: #333333;
  font-size: 15px;
  margin-top: 5px;
}
.cd-d2-col .s2 {
  display: block;
  color: #666666;
  font-size: 15px;
  margin-top: 15px;
}
.cd-d2-col .s3 {
  display: block;
  color: red;
  font-size: 15px;
  margin-top: 15px;
}
.cd-d2-col .s4 {
  display: block;
  color: #333333;
  font-size: 15px;
  margin-top: 16px;
}
.col1 {
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.col2 {
  border-bottom: 1px solid #eeeeee;
}
.col3 {
  border-right: 1px solid #eeeeee;
}
.cd-d3 {
  margin-top: 10px;
  background: #fff;
  padding: 15px 15px;
}
.cd-d3 .s1 {
  font-size: 15px;
  color: #333333;
  display: block;
}
.cd-d4 {
  padding: 10px 15px;
  margin-top: 20px;
  background: #fff;
  border-bottom: 1px solid #f7f7f7;
}
.cd-d4 .s1 {
  float: left;
  color: #333333;
  font-size: 15px;
}
.cd-d4 .a1 {
  float: right;
  color: #666666;
  font-size: 14px;
  margin-top: 3px;
}
.sk-cell {
  color: #666666;
  background: #fff;
}
.sk-cell .m1 {
  float: left;
  width: 50px;
  height: 50px;
}
.sk-cell .dr {
  float: left;
  margin-left: 10px;
}
</style>
