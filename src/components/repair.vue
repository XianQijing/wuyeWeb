<template>
  <div class="repair">
      <div class="mainbody2">
      <div class="detail1">
        <div class="input"><span>&nbsp;&nbsp;联系人</span><input readonly="readonly" type="text" placeholder="请输入您的姓名" v-model="name" ></div>
        <div class="input"><span>&nbsp;&nbsp;联系方式</span><input readonly="readonly" type="text" @blur="blur" placeholder="请输入您的联系方式" v-model="phone"></div>

        <div class="input">
          <span>&nbsp;&nbsp;关联房屋</span>
          <button @click="show2 = true">{{selHouse}}<van-icon name="arrow" /></button>
          <van-popup v-model="show2" position="bottom">
            <van-picker :columns="house" @change="onChange1" value-key="name"/>
          </van-popup>
        </div>
        <div class="input">
          <span>&nbsp;&nbsp;选择上门时间</span>
          <button @click="show = true">{{this.time}}<van-icon name="arrow" /></button>
          <van-popup v-model="show" position="bottom">
            <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              :min-date="minDate"
              @confirm="confirm('time')"
              :formatter="formatter"
              @cancel="cancel('time')"
            />
          </van-popup>
        </div>

        <div class="input">
          <span>&nbsp;&nbsp;报修类型</span>
          <button @click="show1 = true">{{this.oType}}<van-icon name="arrow" /></button>
          <van-popup v-model="show1" position="bottom">
            <van-picker show-toolbar :columns="columns" @confirm="onChange" @cancel="cancel('otype')" />
          </van-popup>
        </div>
      </div>
      <div></div>
    </div>
    <!-- <p style="border:0.1rem solid #F5F5F5"></p> -->
    <div class="shadow">
      <div class="edit">
        <p>描述下您所遇到的问题</p>
        <textarea name="edit" id="edit" cols="38" rows="7" maxlength="200" v-model="edit" placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"></textarea>
        <p style="padding-bottom: 0;text-align: right;">{{this.lo}}/200</p>
      </div>
      <!-- <p style="border:0.1rem solid #F5F5F5"></p> -->
      <div style="text-align:left;padding: 0.1rem 0;background: white;">
        <span v-for="(img, index) in src" :key="index">
          <div style="display:inline-block;margin-bottom: 0.05rem;">
            <!-- <p class="shanchu">删除</p> -->
            <van-icon name="close" @click="dele($event, index)"/>
            <img :src="img" class="upLoad">
          </div>
        </span>
        <div style="display:inline-block" v-if="src.length < 5">
          <button class="upLoad"><van-icon name="photograph" /><p>{{this.long}}/5</p></button>
          <input type="file" id="pic" accept="image/*" @change="onRead" multiple>
        </div>
      </div>
    </div>
    <!-- <p style="border:0.1rem solid #F5F5F5"></p> -->
    <div class="btn">
      <button @click="submit">立即报修</button>
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Popup, Icon, Uploader, Toast, Picker, Loading } from 'vant'
import url from '../assets/Req.js'
export default {
  name: 'repair',
  data () {
    return {
      show1: false,
      num: 1,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      show: false,
      time: '请选择上门时间',
      edit: '',
      src: [],
      long: 0,
      pic: [],
      columns: [],
      oType: '请选择报修方式',
      name: '',
      phone: '',
      lo: 0,
      id: '',
      openId: '',
      citys: [],
      room: '',
      house: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
          // defaultIndex: 2
        }
      ],
      show2: false, // 关联房屋
      selHouse: ''
    }
  },
  watch: {
    edit: function (val) {
      this.lo = val.length
    }
  },
  mounted () {
    this.openId = decodeURIComponent(this.$route.query.openId || '/')
    this.axios.get(url + 'tenement-wechat/serviceAccept/getType').then(res => {
      this.columns = res.data
    })
    if (this.openId) {
      this.axios.get(url + 'tenement-wechat/wechat/ownerByOpenId/' + this.openId).then(res => {
        this.name = res.data[0].name
        this.phone = res.data[0].phone
        this.id = res.data[0].id
        this.axios.get(url + 'tenement-wechat/serviceAccept/getRoomTwo/' + res.data[0].id).then(res => {
          this.citys = res.data
          this.house[0].values = Object.keys(this.citys)
          this.house[1].values = this.citys[Object.keys(this.citys)[0]]
          this.selHouse = Object.keys(this.citys)[0] + ',' + this.citys[Object.keys(this.citys)[0]][0].name
          this.room = this.citys[Object.keys(this.citys)[0]][0].id
        })
      })
    }
  },
  methods: {
    // 手机验证
    blur (e) {
      var reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (!reg.test(e.target.value)) {
        Toast.fail('请输入正确的手机号')
      }
    },
    onChange (value, index) {
      this.oType = value
      this.show1 = false
    },
    onChange1 (picker, values) {
      picker.setColumnValues(1, this.citys[values[0]])
      this.selHouse = values[0] + ',' + values[1].name
      this.room = picker.getColumnValue(1).id
    },
    not () {
      document.getElementById('notpay').className = 'active'
      document.getElementById('readypay').className = ''
      this.num = 1
    },
    already () {
      document.getElementById('notpay').className = ''
      document.getElementById('readypay').className = 'active'
      this.num = 2
    },
    goBack () {
      window.history.back()
    },
    confirm () {
      this.time = this.currentDate.getFullYear() + '-' + format((this.currentDate.getMonth() + 1)) + '-' + format(this.currentDate.getDate()) + ' ' + format(this.currentDate.getHours()) + ':' + format(this.currentDate.getMinutes()) + ':' + format(this.currentDate.getSeconds())
      this.show = false
    },
    cancel (msg) {
      if (msg === 'time') {
        this.show = false
      } else if (msg === 'otype') {
        this.show1 = false
      } else {
        this.show2 = false
      }
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value
    },
    // 添加图片
    onRead (e) {
      let _this = this
      for (var i = 0; i < e.target.files.length; i++) {
        if (!e || !window.FileReader) return // 看支持不支持FileReader
        let reader = new FileReader()
        if (_this.pic.length > 4) {
          console.log('嘿嘿')
        } else {
          reader.readAsDataURL(e.target.files[i]) // 这里是最关键的一步，转换就在这里
          reader.onloadend = function () {
            _this.src.push(this.result)
            _this.long = _this.src.length
          }
          _this.pic.push(e.target.files[i])
        }
      }
    },
    // 删除图片
    dele (e, index) {
      this.src.splice(index, 1)
      this.pic.splice(index, 1)
      this.long = this.src.length
    },
    // 提交
    submit () {
      let formData = new FormData()
      let picName = []
      if (this.pic.length) {
        this.pic.forEach(v => {
          formData.append('file', v)
          picName.push({'name': v.name})
        })
      }
      if (this.time && this.oType && this.name && this.phone && this.edit.length > 9) {
        var serviceAccept = {
          'serviceClasses': this.oType,
          'receiverTime': this.time,
          'problem': this.edit,
          'serviceAcceptImgs': picName,
          'customer': this.id,
          'room': this.room
        }
        this.axios.post(url + 'tenement-wechat/serviceAccept/serviceAccept', serviceAccept).then(res => {
          if (res.data === true) {
            if (this.pic.length === 1) {
              this.axios.post(url + 'tenement-wechat/wechat/uploadFile', formData).then(res => {
                if (res.status === 200) {
                  this.$router.push({name: 'Success', query: {msg: 1}})
                } else {
                  Toast.fail('图片上传失败')
                }
              })
            } else if (this.pic.length > 1) {
              this.axios.post(url + 'tenement-wechat/wechat/uploadFiles', formData).then(res => {
                if (res.status === 200) {
                  this.$router.push({name: 'Success', query: {msg: 1}})
                } else {
                  Toast.fail('图片上传失败')
                }
              })
            } else {
              this.$router.push({name: 'Success', query: {msg: 1}})
            }
          } else {
            Toast.fail('报修失败')
          }
        })
      } else {
        Toast.fail('请保证信息完整')
      }
    }
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Picker.name]: Picker,
    [Loading.name]: Loading
  }
}
function format (str) {
  str = str.toString()
  var addtime
  if (str.length < 2) {
    addtime = '0' + str
  } else {
    addtime = str
  }
  return addtime
}
</script>

<style scoped>
.repair {
  font-size: 0.34rem;
  background: white;
  height: 100%;
}
.tit {
  height: 2rem!important;
}
.input input{
  border: none;
  text-align: right;
  margin-right: 0.5rem;
  font-size: 0.3rem;
  /* height: 94%; */
  color: rgba(178,178,178,1);
}
.input {
  display: flex;
  justify-content: space-between;
  border: none;
  border-bottom:1px solid #FFF7F4F8;
}
.input span{
  font-size: 0.32rem;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:1rem;
}
.input input::-webkit-input-placeholder {
  color: rgba(178,178,178,1);
}
.setOption {
  margin-top: 1.5rem
}
.input button {
  border: none;
  background: white;
  color: rgba(178,178,178,1);
  font-size: 0.32rem;
  /* margin-right: 0.5rem; */
}
.van-icon-arrow::before {
  vertical-align: middle;
  margin-left: 0.15rem
}
textarea {
  border: none;
}
textarea::-webkit-input-placeholder{
  font-size:0.28rem;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(184,184,184,1);
}
#pic {
  opacity: 0;
  width: 1.52rem;
  height: 1.52rem;
  background: pink;
  vertical-align: middle;
  /* position: relative;
  left: -1.8rem; */
  margin-left: -2rem;
}
.upLoad {
  width: 1.52rem;
  height: 1.52rem;
  background: white;
  border: 1px solid #eeeeee;
  vertical-align: middle;
  margin: 0 0.4rem;
}
/* .upLoad p{
  margin: 0;
} */
p {
  margin: 0;
}
.btn {
  margin-top: 0;
  padding: 0.1rem 0;
}
.van-icon-close {
  position: absolute;
  color: red;
  background: white;
  border-radius: 70px;
  margin: 0rem 1.79rem;
}
.van-icon-arrow[data-v-178749c6]::before {
    vertical-align: middle;
    margin-left: 0rem!important;
}
/* .shanchu {
  position: absolute;
  display: inline-block;
  height: 1.52rem;
  width: 1.52rem;
  padding: 0.5rem 0.8rem;
} */
</style>
