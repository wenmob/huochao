<template>
  <div class="cutDetails">
    <!--没有产品显示-->
    <div class="cl-d1" align="center" v-if="!isDetail">
      <img class="m1" src="../../../assets/images/emoji.png"/>
      <span class="s1">产品不存在</span>
    </div>

    <van-cell class="cut-cell" v-if="isDetail">
      <van-row>
        <van-col span="4">
          <img class="m1" :src="details.LogoPath"/>
        </van-col>
        <van-col span="10">
          <span class="s1" style="font-size: 15px">{{details.Name}}</span>
          <span class="s2">{{details.ApplyCount}}人申请</span>
        </van-col>
        <van-col span="9">
          <div class="d1">
            <img class="m2" src="../../../assets/images/meb.png"/>
            <span class="s3">成功率：</span>
            <span class="s4">{{details.SuccessRate}}</span>
          </div>
        </van-col>
      </van-row>
    </van-cell>
    <!--简介-->
    <div class="cd-d1" v-if="isDetail">
      <p>{{markString1}}</p>
      <p>征信要求：{{details.RequestForCredit === '' ? '无' : details.RequestForCredit}}</p>
      <!-- <p>申请攻略：{{details.ProductIntroduction}}</p> -->
    </div>
    <!--额度、期限、费用-->
    <div class="cd-d2" v-if="isDetail">
      <van-row type="flex">
        <van-col span="8" class="cd-d2-col col1" align="center">
          <span class="s1">额度</span>
          <span class="s2">{{details.LowAmountRange}}-{{details.HighAmountRange}}</span>
        </van-col>
        <van-col span="8" class="cd-d2-col col1" align="center">
          <span class="s1">期限</span>
          <span class="s2">{{details.LoanTerm}}</span>
        </van-col>
        <van-col span="8" class="cd-d2-col col2" align="center">
          <span class="s1">费用</span>
          <span class="s3">{{details.CostDescription}}</span>
        </van-col>
      </van-row>
      <van-row type="flex">
        <van-col span="8" class="cd-d2-col col3" align="center">
          <span class="s4">放款速度</span>
          <span class="s2">{{details.LoanSpeed}}</span>
        </van-col>
        <van-col span="8" class="cd-d2-col col3" align="center">
          <span class="s4">审核方式</span>
          <span class="s2">{{details.AuditMethod}}</span>
        </van-col>
        <van-col span="8" class="cd-d2-col" align="center">
          <span class="s4">到账方式</span>
          <span class="s3">{{details.PaymentMethod}}</span>
        </van-col>
      </van-row>
    </div>
    <!--申请攻略-->
    <div class="cd-d3" v-if="isDetail">
      <span class="s1">产品介绍</span>
      <div style="height: 120px" v-html="details.ProductIntroduction">
      </div>
    </div>
    <!--同类产品、更多-->
    <div class="cd-d4" v-if="isDetail">
      <span class="s1">同类产品</span>
      <a class="a1" @click="nextMore">更多</a>
      <div style="clear:both"></div>
    </div>
    <!--没有同类产品显示-->
    <div class="cl-d1" align="center" v-if="!isHas && isDetail">
      <img class="m1" src="../../../assets/images/emoji.png"/>
      <span class="s1">暂无记录</span>
    </div>
     <!--列表展示-->
      <van-list
        v-model="loading"
        :finished="finished"
        v-else
      >
        <van-cell
          v-for="item in likeProd"
          :key="item.ID"
          class="sk-cell"
          @click.native="nextProdPage(item.ID)"
        >
         <van-row type="flex">
           <van-col span="4">
             <img class="m1" :src="item.LogoPath"/>
           </van-col>
           <van-col span="20">
             <van-row>
               <span style="font-szie: 16px">{{item.Name}}</span>
               <van-tag type="danger" v-if="item.IsHot == 1">热门口子</van-tag>
               <van-tag style="background: #FFBF61" v-else>推荐口子</van-tag>
             </van-row>
             <van-row type="flex">
               <van-col span="10"><span>额度:{{item.LowAmountRange}}-{{item.HighAmountRange}}</span></van-col>
               <van-col span="7"><span>成功率:<i style="color: red">{{item.SuccessRate}}</i></span></van-col>
               <van-col span="7"><span>{{item.InterestRateType}}<i style="color: red">{{item.InterestRateValue}}</i></span></van-col>
             </van-row>
             <van-row>
               <span>{{item.Strategy}}</span>
             </van-row>
           </van-col>
         </van-row>
        </van-cell>
      </van-list>
      <div class="footer" align="center" v-if="isDetail">
        <van-button type="danger" style="width: 100%; font-size: 16px;" @click="registProd(details.URLAddress)">立即申请</van-button>
      </div>
  </div>
</template>

<script>
import { sendMessage } from '@/utils/hybrid'
import { getProductInfoDetails, getProductInfoListByCategory, saveProductAccessRecord } from '@/api/cutDetails'
export default {
  data () {
    return {
      ProductID: '',
      details: {
        LogoPath: '',
        Name: '-',
        ApplyCount: '-',
        SuccessRate: '-',
        Strategy: '',
        ProductTypeName: '',
        PaymentmethodName: '',
        RequestForCredit: '',
        ProductIntroduction: '',
        LowAmountRange: '',
        HighAmountRange: '',
        PaymentMethod: '',
        AuditMethod: '',
        LoanSpeed: '',
        LoanTerm: '',
        CategoryID: '',
        URLAddress: ''
      },
      loading: false,
      finished: true,
      likeProd: [],
      isHas: false,
      isDetail: false
    }
  },
  inject: ['reload'],
  computed: {
    markString1 () {
      let str = ''
      if (this.details.Strategy) {
        str = str + this.details.Strategy
      }
      // if (this.details.ProductTypeName) {
      //   if (str) {
      //     str = str + '，' + this.details.ProductTypeName
      //   } else {
      //     str = str + this.details.ProductTypeName
      //   }
      // }
      // if (this.details.PaymentmethodName) {
      //   if (str) {
      //     str = str + '，' + this.details.PaymentmethodName
      //   } else {
      //     str = str + this.details.PaymentmethodName
      //   }
      // }
      return str
    }
  },
  created () {
    sendMessage('show_share')
  },
  mounted () {
    this.initPage()
    this.saveProductAccessRecord()
  },
  methods: {
    // 判断是否有id传来
    checkProductId () {
      if (this.$route.query.keyvalue) {
        this.ProductID = this.$route.query.keyvalue
        console.log(this.ProductID)
      }
    },
    // 初始化界面
    initPage () {
      this.checkProductId()
      let toast1 = this.$toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...'
      })
      this.getProductInfoDetails().then(res => {
        if (res === '产品信息不存在') {
          toast1.clear()
          this.isDetail = false
          this.$toast.fail(res)
          return
        }
        this.getProductInfoListByCategory(res).then(r => {
          toast1.clear()
          console.log('加载消失')
          if (r === '没有值') {
            this.isHas = false
          } else if (r === '有值') {
            this.isHas = true
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取产品详情的页面
    getProductInfoDetails () {
      return new Promise((resolve, reject) => {
        getProductInfoDetails({ProductID: this.ProductID}).then(res => {
          // console.log(res)
          if (res.code === 12000) {
            const data = res.rows
            document.title = res.title
            if (data.RequestForCredit === '&nbsp;' || data.RequestForCredit === null) {
              data.RequestForCredit = ''
            }
            // data.ProductIntroduction = data.ProductIntroduction.replace(/<[^>]+>/g, '') // 去掉所有的html标记
            this.details = {...data}
            this.isDetail = true
            resolve(data.CategoryID)
          } else if (res.code === 12001) {
            resolve('产品信息不存在')
          }
        }).catch(error => {
          reject(error)
          console.log(error)
        })
      })
    },
    // 获取同类产品
    getProductInfoListByCategory (CategoryID) {
      return new Promise((resolve, reject) => {
        getProductInfoListByCategory({ProductCategoryID: CategoryID}).then(res => {
          if (res.code === 12000) {
            const data = res.object
            this.likeProd = data
            console.log('有类别的情况')
            resolve('有值')
          } else if (res.code === 12001) {
            this.likeProd = []
            console.log('没有类别的情况')
            resolve('没有值')
          }
        }).catch(error => {
          reject(error)
          console.log(error)
        })
      })
    },
    // 调用访问记录
    saveProductAccessRecord () {
      return new Promise((resolve, reject) => {
        saveProductAccessRecord({ProductID: this.ProductID}).then(res => {
          console.log(res)
          resolve(4)
        }).catch(error => {
          reject(error)
          console.log(error)
        })
      })
    },
    // 点击产品跳转到其他页面
    nextProdPage (id) {
      // this.$route.query.keyvalue = id
      // this.initPage()
      // document.body.scrollTop = document.documentElement.scrollTop = 0 + 'px'
      this.$router.push({path: '/cutDetails', query: {keyvalue: id}})
    },
    // 点击更多
    nextMore () {
      this.$router.push({path: '/cutList', query: {keyvalue: this.details.CategoryID}})
    },
    // 跳转到申请页面
    registProd (url) {
      window.location.href = url
    }
  }
}
</script>

<style>
@import url('../../../assets/css/common.css');
.cutDetails {
  position: relative;
  padding-bottom: 64px;
}
.cutDetails .footer{
  position: fixed;
  width: calc(100% - 30px);
  height: 54px;
  bottom: 0px;
  left: 0px;
  padding: 10px 15px 0px 15px;
  background-color: rgba(255,255,255, .9);
  z-index: 2000;
}
.cut-cell {
  color: #666666;
  background: #fff;
}
.cut-cell .m1 {
  float: left;
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 8px;
}
.cut-cell .s1 {
  display: block;
  margin-top: 10px;
}
.cut-cell .s2 {
  display: block;
  font-size: 13px;
  color: #666666;
  margin-top: 0px;
}
.cut-cell .d1 {
  width: 142px;
  height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin-top: 14px;
}
.cut-cell .m2 {
  float: left;
  width: 18px;
  margin-top: 13px;
  margin-left: 12px;
}
.cut-cell .s3 {
  float: left;
  color: #858585;
  font-size: 13px;
  margin-left: 6px;
  margin-top: 10px;
}
.cut-cell .s4 {
  float: left;
  color: #ff1c1c;
  font-size: 20px;
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
  font-size: 14px;
  margin-top: 5px;
}
.cd-d2-col .s2 {
  display: block;
  color: #666666;
  font-size: 14px;
  margin-top: 15px;
}
.cd-d2-col .s3 {
  display: block;
  color: red;
  font-size: 14px;
  margin-top: 15px;
}
.cd-d2-col .s4 {
  display: block;
  color: #333333;
  font-size: 14px;
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
  font-size: 14px;
  color: #333333;
  display: block;
}
.cd-d4 {
  padding: 10px 15px;
  margin-top: 10px;
  background: #fff;
  border-bottom: 1px solid #f7f7f7;
}
.cd-d4 .s1 {
  float: left;
  color: #333333;
  font-size: 14px;
}
.cd-d4 .a1 {
  float: right;
  color: #666666;
  font-size: 14px;
  margin-top: 2px;
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
.cl-d1 {
  padding-top: 40px;
  padding-bottom: 30px;
}
.cl-d1 .m1 {
  display: block;
}
.cl-d1 .s1 {
  display: block;
  color: #999999;
  font-size: 16px;
  margin-top: 10px;
}
</style>
