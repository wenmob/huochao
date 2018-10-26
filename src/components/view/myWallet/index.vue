<template>
  <div class="myBonus">
    <!--没有记录时的显示-->
    <div class="cl-d1" align="center" v-if="!isHas">
      <img class="m1" src="../../../assets/images/emoji.png"/>
      <span class="s1">暂无记录</span>
    </div>

    <div class="myBonus-cont" v-else>
      <!--第一部分-->
      <div class="myBonus-cont-d1">
        <span class="s1">可用</span>
        <span class="s2">{{BalanceAmount}}</span>
        <span class="s3">冻结：{{FrozenAmount}}</span>
        <div style="clear: both"></div>
      </div>
      <!--第二部分-->
      <div class="myBonus-cont-d2">
        <van-row type="flex" class="mb-row">
          <van-col span="9" class="mb-col">
            <span class="s1">操作时间</span>
          </van-col>
          <van-col span="5" class="mb-col" align="center">
            <span class="s1">交易类型</span>
          </van-col>
          <van-col span="5" class="mb-col" align="center">
            <span class="s1">收支</span>
          </van-col>
          <van-col span="5" class="mb-col" align="center">
            <span class="s1">余额</span>
          </van-col>
        </van-row>
        <van-list
          v-model="loading"
          :finished="finished"
        >
          <van-row type="flex" class="mb-row" v-for="item in list" :key="item.ID">
            <van-col span="9" class="mb-col">
              <span class="s2">{{item.CreateDate}}</span>
            </van-col>
            <van-col span="5" class="mb-col" align="center">
              <span class="s2">{{item.RechargeType}}</span>
            </van-col>
            <van-col span="5" class="mb-col" align="center">
              <span class="s2" style="color: #7ED321" v-if="item.Amount > 0">+{{item.Amount}}</span>
              <span class="s2" style="color: #F5A623" v-else>{{item.Amount}}</span>
            </van-col>
            <van-col span="5" class="mb-col" align="center">
              <span class="s2">{{item.Balance}}</span>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from '@/utils/hybrid'
import { getUserWallet } from '@/api/myWallet'
export default {
  data  () {
    return {
      BalanceAmount: '',
      FrozenAmount: '',
      UserKey: 'c61d197542354f7b80154a53e6ba1298',
      isHas: false,
      loading: false,
      finished: true,
      list: []
    }
  },
  created () {
    sendMessage('hide_share')
  },
  mounted () {
    this.checkToken()
    this.getUserWallet()
  },
  methods: {
    // 判断是否有token传来
    checkToken () {
      if (this.$route.query.token) {
        this.UserKey = this.$route.query.token
      }
    },
    // 获取我的钱包
    getUserWallet () {
      let toast1 = this.$toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...'
      })
      getUserWallet({UserKey: this.UserKey}).then(res => {
        this.BalanceAmount = res.BalanceAmount ? res.BalanceAmount.toFixed(2) : 0
        this.FrozenAmount = res.FrozenAmount ? res.FrozenAmount.toFixed(2) : 0
        res.object.forEach(ele => {
          ele.Amount = ele.Amount ? ele.Amount.toFixed(2) : 0
          ele.Balance = ele.Balance ? ele.Balance.toFixed(2) : 0
        })
        this.list = res.object
        if (this.list.length > 0) {
          this.isHas = true
        }
        toast1.clear()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style>
  .myBonus {
    border: 1px solid #F2F2F2;
  }
  .cl-d1 .m1 {
    display: block;
    margin-top: 100px;
  }
  .cl-d1 .s1{
    display: block;
    color: #999999;
    font-size: 15px;
    margin-top: 10px;
  }
  .myBonus-cont-d1 {
    height: 60px;
    background: #fff;
  }
  .myBonus-cont-d1 .s1{
    float: left;
    display: inline-block;
    font-size: 14px;
    color: #666666;
    margin-left: 30px;
    margin-top: 20px;
  }
  .myBonus-cont-d1 .s2{
    float: left;
    display: inline-block;
    color: #333333;
    font-size: 19px;
    margin-left: 16px;
    margin-top: 19px;
  }
  .myBonus-cont-d1 .s3{
    float: right;
    display: inline-block;
    font-size: 14px;
    color: #666666;
    margin-right: 30px;
    margin-top: 20px;
  }
  .myBonus-cont-d2 {
    margin-top: 15px;
    background: #fff;
  }
  .mb-row {
    border-bottom: 1px solid #F2F2F2;
  }
  .mb-col {
    padding: 10px 15px;
  }
  .mb-col .s1 {
    color: #666666;
    font-size: 11px;
  }
  .mb-col .s2 {
    color: #666666;
    font-size: 11px;
  }
</style>
