<template>
  <div class="supermarket">
    <!--8个选项-->
    <div class="sk-d1">
    <van-row type="flex">
      <van-col span="6" align="center" v-for="item1 in listHead1" :key="item1.id" @click.native="nextPager(item1.url)">
        <img class="sk-h-m" :src="item1.imapath"/>
        <span class="sk-h-s">{{item1.title}}</span>
      </van-col>
    </van-row>

    <van-row type="flex" style="margin-top: 12px" v-if="listHead.length > 4">
      <van-col span="6" align="center" v-for="item2 in listHead2" :key="item2.id" @click.native="nextPager(item2.url)">
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
          <van-swipe :autoplay="3000" vertical style="width: 100%; height: 40px">
            <van-swipe-item v-for="(item,index) in listToday" :key="index">
              <van-col span="8" class="sk-d2-2">
                <span class="s1">{{item.name}}</span>
              </van-col>
              <van-col span="9" class="sk-d2-2">
                <span class="s1" style="color: red">利率{{item.successrate}}</span>
              </van-col>
              <van-col span="3" class="sk-d2-2">
                <span class="s2">18:05</span>
              </van-col>
            </van-swipe-item>
          </van-swipe>
        </van-col>
      </van-row>
    </div>
    <!--最新口子、推荐口子、热门口子-->
    <div class="sk-d3">
      <van-row type="flex" class="sk-d3-head">
        <van-col span="8" align="center" class="d1" style="background: #fff">
          <span>最新口子</span>
        </van-col>
        <van-col span="8" class="d1" align="center">
          <span>推荐口子</span>
        </van-col>
        <van-col span="8" class="d1" align="center">
          <span>热门口子</span>
        </van-col>
      </van-row>
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
  </div>
</template>

<script>
import { getAdvertisementListByPosition, getTodayPayProduct } from '@/api/supermarket'
export default {
  data () {
    return {
      loading: false,
      finished: true,
      listHead: [],
      listToday: [],
      list: [
        {
          id: 1,
          img: require('@/assets/images/icon4.png'),
          type: 0
        },
        {
          id: 2,
          img: require('@/assets/images/icon4.png'),
          type: 1
        }
      ]
    }
  },
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
    this.getAdvertisementList()
    this.getTodayPayProduct()
  },
  methods: {
    onLoad () {},
    // 获取头部的广告栏
    getAdvertisementList () {
      getAdvertisementListByPosition({ADPosition: 'H5CSTop'}).then(res => {
        this.listHead = res
      }).catch(err => {
        this.$toast.fail(err)
      })
    },
    // 获取今日下款
    getTodayPayProduct () {
      getTodayPayProduct().then(res => {
        this.listToday = res
      }).catch(err => {
        this.$toast.fail(err)
      })
    },
    // 点击头部的选择栏
    nextPager (url) {
      alert(url)
    }
  }
}
</script>

<style>
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
  display: block;
}
.sk-h-s {
  display: block;
  font-size: 13px;
  margin-top: 7px;
}
.sk-d2-1 {
  height: 40px;
  border-right: 1px solid #ccc;
}
.sk-d2-1 .m1 {
  float: left;
  width: 20px;
  margin-top: 10px;
  margin-left: 13px;
}
.sk-d2-1 .s1 {
  float: left;
  font-size: 14px;
  margin-left: 10px;
  margin-top: 10px;
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
.sk-cell {
  color: #666666;
  background: #fff;
  font-size: 13px;
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
