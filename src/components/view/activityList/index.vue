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
        @load="getProductInfoListByActivityMore"
        v-else
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          class="sk-cell"
          @click.native="nextProdPage(item.id)"
        >
         <van-row type="flex">
           <van-col span="4">
             <img class="m1" :src="item.logopath"/>
           </van-col>
           <van-col span="20">
             <van-row>
               <span style="font-szie: 16px">{{item.name}}</span>
               <van-tag type="danger" v-if="item.ishot == 1">热门口子</van-tag>
               <van-tag style="background: #FFBF61" v-else>推荐口子</van-tag>
             </van-row>
             <van-row type="flex">
               <van-col span="10"><span>额度:{{item.lowamountrange}}-{{item.highamountrange}}</span></van-col>
               <van-col span="7"><span>成功率:<i style="color:red">{{item.successrate}}</i></span></van-col>
               <van-col span="7"><span>{{item.interestratetype}}<i style="color:red">{{item.interestratevalue}}</i></span></van-col>
             </van-row>
             <van-row>
               <span>{{item.strategy}}</span>
             </van-row>
           </van-col>
         </van-row>
        </van-cell>
      </van-list>
  </div>
</template>

<script>
import { sendMessage } from '@/utils/hybrid'
import { getProductInfoListByActivityMore } from '@/api/activityList'
export default {
  data () {
    return {
      form: {
        ActivityID: '1',
        pageIndex: 0,
        pageSize: 10
      },
      isHas: false,
      loading: true,
      finished: false,
      list: [],
      toast1: undefined
    }
  },
  created () {
    sendMessage('tbshowmenu', true)
  },
  mounted () {
    this.toast1 = this.$toast.loading({
      duration: 0,
      mask: true,
      message: '加载中...'
    })
    this.checkCategoryID()
    this.getProductInfoListByActivityMore()
  },
  methods: {
    // 判断是否有类Id传来
    checkCategoryID () {
      if (this.$route.query.keyvalue) {
        this.form.ActivityID = this.$route.query.keyvalue
      }
    },
    // 获取更多列表的接口
    getProductInfoListByActivityMore () {
      this.form.pageIndex++
      return new Promise((resolve, reject) => {
        getProductInfoListByActivityMore(this.form).then(res => {
          this.loading = false
          const data = res.object
          document.title = res.title
          if (data.length > 0) {
            this.isHas = true
          }
          for (let i = 0; i < data.length; i++) {
            this.list.push(data[i])
          }
          if (data.length < this.form.pageSize) {
            this.finished = true
          }
          this.toast1.clear()
          resolve(1)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    // 点击产品跳转到其他页面
    nextProdPage (id) {
      this.$router.push({path: '/cutDetails', query: {keyvalue: id}})
    }
  }
}
</script>

<style>
@import url('../../../assets/css/common.css');
.cutList {
  border: 1px solid #f2f2f2;
  padding-top: 10px;
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
</style>
