<template>
  <div class="messageDesc">
    <div class="md-cont">
      <!--标题的内容-->
      <div class="md-cont-d1">
        <span class="md-title">
          {{form.Title}}
        </span>
        <div class="md-cont-d2">
          <!-- <span class="s1">阅读：{{form.ReadNumber}}</span> -->
          <span class="s2">{{form.CreateDate}}</span>
          <div style="clear:both"></div>
        </div>
      </div>
      <!--内容-->
      <div class="md-cont-d3" v-html="form.MessageContent">

      </div>
    </div>

  </div>
</template>

<script>
import { sendMessage } from "@/utils/hybrid";
import { getPushMsgDetails } from "@/api/siteMessage";
export default {
  data() {
    return {
      PushMsgID: "5",
      form: {
        Title: "",
        CreateDate: "",
        MessageContent: ""
      }
    };
  },
  created() {
    sendMessage("show_share");
  },
  mounted() {
    this.checkNewsID();
    this.getNewsDetails();
  },
  methods: {
    // 判断是否有NewsID传来
    checkNewsID() {
      if (this.$route.query.keyvalue) {
        this.PushMsgID = this.$route.query.keyvalue;
      }
    },
    // 获取站内信息
    getNewsDetails() {
      let toast1 = this.$toast.loading({
        duration: 0,
        mask: true,
        message: "加载中..."
      });
      return new Promise((resolve, reject) => {
        getPushMsgDetails({ PushMsgID: this.PushMsgID })
          .then(res => {
            const data = res.rows;
            document.title = res.title;
            this.form = { ...data };
            toast1.clear();
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  }
};
</script>

<style>
.messageDesc {
  width: 100%;
  height: 100%;
  background: #fff;
}
.md-cont {
  padding: 15px;
}
.md-cont-d1 {
  padding-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
}
.md-title {
  color: #333333;
  font-size: 26px;
  display: block;
}
.md-cont-d2 {
  margin-top: 10px;
}
.md-cont-d2 .s1 {
  float: left;
  color: #999999;
  font-size: 14px;
}
.md-cont-d2 .s2 {
  float: right;
  color: #999999;
  font-size: 14px;
}
.md-cont-d3 {
  padding-top: 15px;
}
.md-cont-d3 .s1 {
  display: block;
  font-size: 14px;
  color: #666666;
  line-height: 1.8;
}
.md-cont-d3 .d1 {
  margin-top: 15px;
}
</style>
