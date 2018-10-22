<template>
  <div class="contract">
    <div class="search">
      <input type="number" placeholder="请输入手机号" v-model="phone" @focus="deletshow = true" @blur="deletshow = false">
      <div id="del" v-show="deletshow" @click="phone = ''"><img src="../assets/delet.png" alt=""></div>
      <input type="text" placeholder="请输入签订合同时的编号" v-model="contractNum" @focus="otype = true" @blur="otype = false">
      <div id="del1" v-show="otype" @click="contractNum = ''"><img src="../assets/delet.png" alt=""></div>
      <button @click="find">绑定</button>
    </div>
    <!-- <van-popup v-model="show">
      <div class="pop">
        <p>是否设为我的默认账号</p>
      </div>
      <div class="btn">
        <button style="background:#3EB144" @click="yes('yes')">是</button>
        <button style="background:#C3C1C4" @click="yes('no')">否</button>
      </div>
    </van-popup> -->

    <!-- <div v-for="(item, index) in test" :key="index">
      <input type="text" v-model="item.edit" @change="aa">
    </div> -->
  </div>
</template>
<script>
import { Popup, Icon, Toast } from 'vant'
import url from '../assets/Req.js'
export default {
  name: 'contract',
  data () {
    return {
      num: [],
      show: false,
      contractNum: '',
      deletshow: false,
      phone: '',
      otype: false,
      openId: '',
      test: [
        {
          edit: ''
        },
        {
          edit: ''
        }
      ]
    }
  },
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  mounted () {
    var href = window.location.href
    var num1 = href.indexOf('?')
    var idd = href.substr(num1 + 1)
    var addressId = idd.substr(idd.indexOf('=') + 1)
    this.openId = addressId.replace(/#\//, '')
  },
  methods: {
    find () {
      // var redirect = decodeURIComponent(this.$route.query.redirect || '/')
      // console.log(decodeURIComponent('%2Fcharge%3FopenId%3Doq1uB5xrNQOOJL0Uh5AyopGsGnFg'))
      if (!this.contractNum) {
        Toast.fail('请输入合同')
      } else if (!this.phone) {
        Toast.fail('请输入手机')
      } else {
        Toast.loading({
          mask: true,
          message: '加载中...',
          duration: 0
        })
        this.axios.put(url + 'tenement-wechat/wechat/ownerByPhone/' + this.contractNum + '/' + this.phone + '/' + this.openId).then(res => {
          Toast.clear()
          localStorage.setItem('phone', this.phone)
          localStorage.setItem('contractNum', this.contractNum)
          this.$router.push({name: 'Success', query: {msg: 3}})
          // console.log(res)
        })
      }
    }
  }
}
</script>
<style scoped>
.contract {
  margin: 0.2rem 0.1rem;
  background: #EFEFF4!important;
  font-size: 0.34rem;
}
.search {
  background: white;
  padding-top: 0.74rem;
  height: 100%;
}
.search input {
  height: 0.6rem;
  background:rgba(255,255,255,1);
  border:1px solid rgba(181,181,181,1);
  border-radius:30px;
  width: 4.15rem;
  background-image: url(../assets/search.png);
  background-repeat: no-repeat;
  background-size: 0.7rem;
  padding-left: 0.8rem;
  padding-right: 0.7rem;
  font-size:0.24rem;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(157,153,153,1);
  line-height:12px;
  margin-bottom: 0.2rem;
}
.search button {
  width: 5.65rem;
  height: 0.6rem;
  background:rgba(62,177,68,1);
  border-radius:30px;
  font-size:0.28rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:12px;
  border: none;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
}
.btn {
  display: flex;
  justify-content: space-between;
  padding: 0.56rem 0.58rem 0.15rem 0.58rem;
  width: 3.4rem;
}
.btn button {
  width: 0.91rem;
  height: 0.32rem;
  color: white;
  font-size:0.24rem;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.van-icon-close::before {
  content: "\F014";
  vertical-align: sub;
  margin-left: 5px;
  /* color: white; */
}
#del {
  display: inline;
  position: absolute;
  right: 1rem;
  top: 1.01rem;
}
#del img {
  width: 0.5rem;
}
#del1 {
  display: inline;
  position: absolute;
  right: 1rem;
  margin-top: 0.06rem;
}
#del1 img {
  width: 0.5rem;
}
</style>
