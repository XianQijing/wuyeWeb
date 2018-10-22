<template>
  <div class="charge" v-if="charge.length > 0">
    <div class="all">
      <p>{{charge[0].time}}</p>
      <div class="price">
        <img src="../assets/dianfei.png" style="width:0.54rem">
        <span>费用合计：{{all}}</span>
      </div>
    </div>

    <div class="detail" v-for="(item, index) in charge" :key="index">
      <p>{{item.time}}</p>
      <div class="price1">
        <img :src="changeImg(item.pay_Name)" style="width:0.54rem">
        <span class="title" :class="changeClass(item.pay_Name)">{{item.pay_Name}}：<span :class="changeClass(item.pay_Name)">{{item.total}}</span>元</span>
      </div>
      <div class="use" v-if="item.last_read">
        <span>本月用量：{{item.last_read}}</span><span>市价：{{item.univalence}}</span>
      </div>
    </div>

    <div class="btn">
      <button @click="pay">立即缴费</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import url from '../assets/Req.js'
export default {
  name: 'charge',
  data () {
    return {
      charge: [],
      openId: '',
      all: 0
    }
  },
  created () {
    this.openId = decodeURIComponent(this.$route.query.openId || '/')
    this.axios.get(url + 'tenement-wechat/wechat/getPriceByOpenId/' + this.openId).then(res => {
      this.charge = res.data
      this.charge.forEach(v => {
        this.all += v.total
      })
    })
  },
  methods: {
    pay () {
      Toast.fail('尚未开通')
    },
    changeClass (msg) {
      if (msg === '水费') {
        return 'waterPri'
      } else if (msg === '电费') {
        return 'meterPri'
      } else if (msg === '物业费') {
        return 'wuyePri'
      } else {
        return 'housePri'
      }
    },
    changeImg (msg) {
      if (msg === '水费') {
        return require('../assets/water.png')
      } else if (msg === '电费') {
        return require('../assets/meter.png')
      } else if (msg === '物业费') {
        return require('../assets/wuye.png')
      } else {
        return require('../assets/house.png')
      }
    }
  },
  components: {
    [Toast.name]: Toast
  }
}
</script>

<style scoped>
.charge {
  font-size: 0.34rem;
  margin: 0.3rem 0;
  background: #EFEFF4!important;
  margin-bottom: 1.3rem;
}
.all {
  background: white;
  box-shadow:4px 5px 9px rgba(4,0,0,0.11);
}
.all p {
  text-align: left;
  padding-left: 0.28rem;
  padding-top: 0.23rem;
  font-size: 0.24rem;
  color: rgba(102,102,102,1);;
}
.price span{
  vertical-align: super;
  font-size:0.36rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(0,0,0,1);
  line-height:12px;
}
.price {
  padding: 0.58rem 0 1rem 0;
}
.detail {
  background: white;
  box-shadow:4px 5px 9px rgba(4,0,0,0.11);
  margin: 0.2rem 0.1rem;
  border-radius:20px;
  }
.detail p {
  text-align: left;
  padding-left: 0.28rem;
  padding-top: 0.23rem;
  font-size: 0.24rem;
  color: rgba(102,102,102,1);;
}
.title {
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(57,185,246,1);
  line-height:12px;
  font-size: 0.18rem;
  vertical-align: super;
}
.price1 {
  padding: 0.23rem 0 0.23rem 0;
  vertical-align: super;
}
.title span {
  font-size:0.38rem;
  font-family:PingFang-SC-Regular;
  font-weight:bold;
  /* color:rgba(0,173,255,1); */
  line-height:12px;
}
.use {
  display: flex;
  justify-content: space-between;
  padding: 0 0.24rem 0.28rem 0.24rem;
}
.use span{
  font-size:0.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(102,102,102,1);
  line-height:12px;
}
.meterPri {
  color:rgba(255,161,6,1);
}
.wuyePri {
  color:rgba(22,197,190,1);
}
.housePri {
  color:rgba(246,153,91,1);
}
</style>
