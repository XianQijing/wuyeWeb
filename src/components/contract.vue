<template>
  <div class="contract">
    <div class="search">
      <!-- <input type="number" placeholder="请输入手机号" v-model="phone" @focus="deletshow = true" @blur="deletshow = false">
      <div id="del" v-show="deletshow" @click="phone = ''"><img src="../assets/delet.png" alt=""></div>
      <input type="text" placeholder="请输入签订合同时的编号" v-model="contractNum" @focus="otype = true" @blur="otype = false">
      <div id="del1" v-show="otype" @click="contractNum = ''"><img src="../assets/delet.png" alt=""></div>
      <button @click="find">绑定</button> -->
      <van-field v-model="phone" type="number" placeholder="请输入手机号" clearable left-icon="contact"/>
      <van-field v-model="contractNum" placeholder="请输入签订合同时的编号" left-icon="search" clearable/>
    </div>
    <button @click="find">绑定</button>
  </div>
</template>
<script>
import { Popup, Icon, Toast, Field } from 'vant'
import url from '../assets/Req.js'
export default {
  name: 'contract',
  data () {
    return {
      num: [],
      show: false,
      contractNum: '',
      // deletshow: false,
      phone: '',
      // otype: false,
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
    [Toast.name]: Toast,
    [Field.name]: Field
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
          if (res.data === true) {
            localStorage.setItem('phone', this.phone)
            localStorage.setItem('contractNum', this.contractNum)
            this.$router.push({name: 'Success', query: {msg: 3}})
          } else {
            Toast.fail('请输入正确的合同号')
          }
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
  height: 3.29rem;
}
.van-field {
  border: 0.02rem solid #eeeeee;
  width: 6.01rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  /* height: ; */
}
button {
  width: 6.01rem;
  height: 0.96rem;
  border: none;
  border-radius: 0.5rem;
  margin-top: 0.3rem;
  background: #60AFFD;
  color: white;
}
</style>
