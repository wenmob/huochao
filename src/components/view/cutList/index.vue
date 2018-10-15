<template>
  <div class="cutList">
    <!--没有记录时的显示-->
    <div class="cl-d1" align="center" v-if="!isHas">
      <img class="m1" src="../../../assets/images/emoji.png"/>
      <span class="s1">暂无记录</span>
    </div>
    <!--有记录时的显示-->
    <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="true"
        v-else
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
               <van-col span="8"><span>成功率：<i style="color:red">97%</i></span></van-col>
               <van-col span="6"><span>费用<i style="color:red">0.04%</i></span></van-col>
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
      isHas: true,
      loading: false,
      finished: false,
      list: []
    };
  },
  methods: {
    onLoad() {
      console.log(this.list);
      this.list = [
        {
          id: 1,
          img: require("@/assets/images/icon4.png"),
          type: 0
        },
        {
          id: 2,
          img: require("@/assets/images/icon4.png"),
          type: 0
        },
        {
          id: 3,
          img: require("@/assets/images/icon4.png"),
          type: 1
        },
        {
          id: 4,
          img: require("@/assets/images/icon4.png"),
          type: 0
        }
      ];
      this.loading = false;
      this.finished = true;
    }
  }
};
</script>

<style>
.cutList {
  border: 1px solid #f2f2f2;
  padding-top: 20px;
}
.cl-d1 .m1 {
  display: block;
  margin-top: 100px;
}
.cl-d1 .s1 {
  display: block;
  color: #999999;
  font-size: 16px;
  margin-top: 10px;
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
