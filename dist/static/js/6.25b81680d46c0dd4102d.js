webpackJsonp([6],{PjVf:function(s,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("vLgD");var e={data:function(){return{BalanceAmount:"",FrozenAmount:"",UserKey:"c61d197542354f7b80154a53e6ba1298",isHas:!1,loading:!1,finished:!0,list:[]}},mounted:function(){this.checkToken(),this.getUserWallet()},methods:{checkToken:function(){this.$route.query.token&&(this.UserKey=this.$route.query.token)},getUserWallet:function(){var s,t=this,a=this.$toast.loading({duration:0,mask:!0,message:"加载中..."});(s={UserKey:this.UserKey},Object(n.a)({url:"/api/APP/GetUserWallet",method:"post",data:s})).then(function(s){t.BalanceAmount=s.BalanceAmount?s.BalanceAmount.toFixed(2):0,t.FrozenAmount=s.FrozenAmount?s.FrozenAmount.toFixed(2):0,s.object.forEach(function(s){s.Amount=s.Amount?s.Amount.toFixed(2):0,s.Balance=s.Balance?s.Balance.toFixed(2):0}),t.list=s.object,t.list.length>0&&(t.isHas=!0),a.clear()}).catch(function(s){console.log(s)})}}},c={render:function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"myBonus"},[s.isHas?n("div",{staticClass:"myBonus-cont"},[n("div",{staticClass:"myBonus-cont-d1"},[n("span",{staticClass:"s1"},[s._v("可用")]),s._v(" "),n("span",{staticClass:"s2"},[s._v(s._s(s.BalanceAmount))]),s._v(" "),n("span",{staticClass:"s3"},[s._v("冻结："+s._s(s.FrozenAmount))]),s._v(" "),n("div",{staticStyle:{clear:"both"}})]),s._v(" "),n("div",{staticClass:"myBonus-cont-d2"},[n("van-row",{staticClass:"mb-row",attrs:{type:"flex"}},[n("van-col",{staticClass:"mb-col",attrs:{span:"9"}},[n("span",{staticClass:"s1"},[s._v("操作时间")])]),s._v(" "),n("van-col",{staticClass:"mb-col",attrs:{span:"5",align:"center"}},[n("span",{staticClass:"s1"},[s._v("交易类型")])]),s._v(" "),n("van-col",{staticClass:"mb-col",attrs:{span:"5",align:"center"}},[n("span",{staticClass:"s1"},[s._v("收支")])]),s._v(" "),n("van-col",{staticClass:"mb-col",attrs:{span:"5",align:"center"}},[n("span",{staticClass:"s1"},[s._v("余额")])])],1),s._v(" "),n("van-list",{attrs:{finished:s.finished},model:{value:s.loading,callback:function(t){s.loading=t},expression:"loading"}},s._l(s.list,function(t){return n("van-row",{key:t.ID,staticClass:"mb-row",attrs:{type:"flex"}},[n("van-col",{staticClass:"mb-col",attrs:{span:"9"}},[n("span",{staticClass:"s2"},[s._v(s._s(t.CreateDate))])]),s._v(" "),n("van-col",{staticClass:"mb-col",attrs:{span:"5",align:"center"}},[n("span",{staticClass:"s2"},[s._v(s._s(t.RechargeType))])]),s._v(" "),n("van-col",{staticClass:"mb-col",attrs:{span:"5",align:"center"}},[t.Amount>0?n("span",{staticClass:"s2",staticStyle:{color:"#7ED321"}},[s._v("+"+s._s(t.Amount))]):n("span",{staticClass:"s2",staticStyle:{color:"#F5A623"}},[s._v(s._s(t.Amount))])]),s._v(" "),n("van-col",{staticClass:"mb-col",attrs:{span:"5",align:"center"}},[n("span",{staticClass:"s2"},[s._v(s._s(t.Balance))])])],1)}))],1)]):n("div",{staticClass:"cl-d1",attrs:{align:"center"}},[n("img",{staticClass:"m1",attrs:{src:a("b11x")}}),s._v(" "),n("span",{staticClass:"s1"},[s._v("暂无记录")])])])},staticRenderFns:[]};var l=a("VU/8")(e,c,!1,function(s){a("uvzA")},null,null);t.default=l.exports},uvzA:function(s,t){}});
//# sourceMappingURL=6.25b81680d46c0dd4102d.js.map