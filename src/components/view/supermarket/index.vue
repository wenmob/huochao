<template>
  <div class="supermarket">
    <!--8个选项-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="sk-d1">
    <van-row type="flex">
      <van-col span="6" align="center" v-for="item1 in listHead1" :key="item1.id" @click.native="nextPager(item1.url, item1.title)">
        <img class="sk-h-m" :src="item1.imapath"/>
        <span class="sk-h-s">{{item1.title}}</span>
      </van-col>
    </van-row>

    <van-row type="flex" style="margin-top: 12px" v-if="listHead.length > 4">
      <van-col span="6" align="center" v-for="item2 in listHead2" :key="item2.id" @click.native="nextPager(item2.url, item2.title)">
        <img class="sk-h-m" :src="item2.imapath"/>
        <span class="sk-h-s">{{item2.title}}</span>
      </van-col>
    </van-row>
    </div>
    <!--今日下款-->
    <div class="sk-d2">
      <van-row type="flex">
        <van-col span="8" class="sk-d2-1">
          <img class="m1" src="../../../assets/images/money.png"/>
          <span class="s1">今日下款</span>
        </van-col>
        <van-col span="16">
          <van-swipe :autoplay="5000" vertical style="width: 100%; height: 40px" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in listToday" :key="index" @click.native="nextOther(item.urladdress)">
              <van-col span="15" class="sk-d2-2">
                <span class="s1">{{item.name}}</span>
              </van-col>
              <van-col span="8" class="sk-d2-2">
                <span class="s1" style="color: red">成功率{{item.successrate}}</span>
              </van-col>
              <!-- <van-col span="3" class="sk-d2-2">
                <span class="s2">18:05</span>
              </van-col> -->
            </van-swipe-item>
          </van-swipe>
        </van-col>
      </van-row>
    </div>
    <!--最新口子、推荐口子、热门口子-->
    <div class="sk-d3">
      <van-row type="flex" class="sk-d3-head">
        <van-col span="6"
        align="center"
        class="d1"
        :style="catIndex === index ? 'background: #fff' : 'background:  #f2f2f2'"
        v-for="(item,index) in listObeject"
        :key="index"
        @click.native="catProd(index)">
          <span>{{item.Name}}</span>
        </van-col>
      </van-row>
      <!--列表展示@load="getCatAndProJsonLit"-->
      <van-list
        v-model="loading"
        :finished="finished"
      >
        <van-cell
          v-for="item in listProd"
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

    </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAdvertisementListByPosition, getTodayPayProduct, getCatAndProJsonLit } from '@/api/supermarket'
export default {
  data () {
    return {
      isLoading: false, // 是否处于下拉刷新状态
      loading: true,
      finished: false,
      listHead: [], // 头部广告list
      listToday: [], // 今日下款list
      listObeject: [], // 类别和产品
      catIndex: 0,
      listProd: [] // 类别对应的产品
    }
  },
  inject: ['reload'],
  computed: {
    listHead1 () {
      let arr = []
      arr = this.listHead.filter((ele, index) => {
        if (index <= 3) {
          return true
        } else {
          return false
        }
      })
      return arr
    },
    listHead2 () {
      let arr = []
      if (this.listHead.length > 4) {
        arr = this.listHead.filter((ele, index) => {
          if (index > 3) {
            return true
          } else {
            return false
          }
        })
      }
      return arr
    }
  },
  mounted () {
    this.initOnLoad()
  },
  methods: {
    // 初始化界面
    initOnLoad () {
      let toast1 = this.$toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...'
      })
      Promise.all([this.getAdvertisementList(), this.getTodayPayProduct(), this.getCatAndProJsonLit()]).then(res => {
        console.log(res)
        toast1.clear()
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取头部的广告栏
    getAdvertisementList () {
      return new Promise((resolve, reject) => {
        getAdvertisementListByPosition({ADPosition: 'H5CSTop'}).then(res => {
          const data = res.object
          this.listHead = data
          resolve(1)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取今日下款
    getTodayPayProduct () {
      return new Promise((resolve, reject) => {
        getTodayPayProduct().then(res => {
          const data = res.object
          this.listToday = data
          resolve(2)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取产品类别和产品
    getCatAndProJsonLit () {
      return new Promise((resolve, reject) => {
        getCatAndProJsonLit().then(res => {
          const data = res.object
          this.loading = false
          this.listObeject = data
          if (this.listObeject.length > 0) {
            this.listProd = data[0].ProLit
            this.finished = true
          }
          resolve(3)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 点击头部的选择栏
    nextPager (url, name) {
      document.title = name
      window.location.href = url
    },
    // 点击今日下款跳转到其他页面
    nextOther (url) {
      window.location.href = url
    },
    // 点击类别对应的产品列表
    catProd (n) {
      this.catIndex = n
      this.listProd = this.listObeject[n].ProLit
    },
    // 点击产品跳转到其他页面
    nextProdPage (id) {
      this.$router.push({path: '/cutDetails', query: {keyvalue: id}})
    },
    // 下拉刷新的效果
    onRefresh () {
      this.keepAlive = false
      Promise.all([this.getAdvertisementList(), this.getTodayPayProduct(), this.getCatAndProJsonLit()]).then(res => {
        this.$toast('刷新成功')
        this.isLoading = false
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
@import url('../../../assets/css/common.css');
.supermarket {
  border: 1px solid #f2f2f2;
}
.sk-d1 {
  background: #fff;
  padding: 26px 13px;
}
.sk-d2 {
  margin-top: 10px;
  background: #fff;
  padding: 10px 13px;
}
.sk-h-m {
  width: 45px;
  height: 45px;
  display: block;
}
.sk-h-s {
  display: block;
  font-size: 13px;
  margin-top: 7px;
}
.sk-d2-1 {
  position: relative;
  height: 40px;
  border-right: 1px solid #ccc;
}
.sk-d2-1 .m1 {
  position: absolute;
  width: 20px;
  top: 7px;
  left: 38px;
}
.sk-d2-1 .s1 {
  position: absolute;
  font-size: 14px;
  left: 70px;
  top: 10px;
  font-weight: 600;
  color: #666666;
}
.sk-d2-2 .s1 {
  float: left;
  font-size: 14px;
  color: #666666;
  margin-left: 16px;
  margin-top: 10px;
}
.sk-d2-2 .s2 {
  float: left;
  font-size: 14px;
  color: #666666;
  margin-left: 18px;
  margin-top: 13px;
}
.sk-d3 {
  margin-top: 10px;
}
.sk-d3-head {
  font-size: 14px;
  font-weight: 500;
  color: #999999;
}
.sk-d3-head .d1 {
  padding: 15px 0px;
}
</style>
