<template>
  <div class="messageDesc">
    <div class="md-cont">
      <!--标题的内容-->
      <div class="md-cont-d1">
        <span class="md-title">
          {{form.Title}}
        </span>
        <div class="md-cont-d2">
          <span class="s1">阅读：{{form.ReadNumber}}</span>
          <span class="s2">来自：{{form.Source}}</span>
          <div style="clear:both"></div>
        </div>
      </div>
      <!--内容-->
      <div class="md-cont-d3" v-html="form.Content">
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
import { getNewsDetails, saveNewsAccessRecord } from '@/api/messageDesc'
export default {
  data () {
    return {
      NewsID: '6',
      form: {
        Title: '',
        ReadNumber: '',
        Source: '',
        Content: ''
      }
    }
  },
  mounted () {
    this.checkNewsID()
    this.getNewsDetails()
    this.saveNewsAccessRecord()
  },
  methods: {
    // 判断是否有NewsID传来
    checkNewsID () {
      if (this.$route.query.keyvalue) {
        this.NewsID = this.$route.query.keyvalue
      }
    },
    // 获取资讯详情
    getNewsDetails () {
      let toast1 = this.$toast.loading({
        duration: 0,
        mask: true,
        message: '加载中...'
      })
      return new Promise((resolve, reject) => {
        getNewsDetails({NewsID: this.NewsID}).then(res => {
          const data = res.rows
          this.form = {...data}
          toast1.clear()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    // 调用访问记录
    saveNewsAccessRecord () {
      return new Promise((resolve, reject) => {
        saveNewsAccessRecord({NewsID: this.NewsID}).then(res => {
          console.log(res)
          resolve(4)
        }).catch(error => {
          reject(error)
          console.log(error)
        })
      })
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
