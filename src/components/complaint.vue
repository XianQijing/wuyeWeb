<template>
  <div class="complaint">
    <p class="ss">问题和意见</p>
    <div class="problem">
      <textarea name="problem" v-model="edit" maxlength="200" cols="40" rows="6" placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"></textarea>
      <p style="padding-bottom: 0;text-align: right;padding-right:20px;color:rgba(178,178,178,1);">{{this.long}}/200</p>
    </div>
    <div class="picture">
      <p class="sele"><span>图片（选填，提供问题截图）</span><span style="color:rgba(178,178,178,1);">{{this.lo}}/4</span></p>
        <span v-for="(img, index) in src" :key="index">
          <div style="display:inline-block;">
            <!-- <p class="shanchu">删除</p> -->
            <van-icon name="close" @click="dele($event, index)"/>
            <img :src="img" class="upLoad">
          </div>
        </span>
        <div style="display:inline-block">
          <button class="upLoad"><van-icon name="photograph" /><p>{{this.lo}}/4</p></button>
          <input type="file" id="pic" accept="image/*" @change="onRead">
        </div>
      </div>
      <div class="btn">
        <button @click="sumbit">提交</button>
      </div>
  </div>
</template>
<script>
import { Icon, Toast } from 'vant'
import url from '../assets/Req.js'
export default {
  name: 'complaint',
  data () {
    return {
      edit: '',
      long: 0,
      src: [],
      lo: 0,
      pic: [],
      openId: ''
    }
  },
  mounted () {
    this.openId = decodeURIComponent(this.$route.query.openId || '/')
  },
  methods: {
    onRead (e) {
      let _this = this
      var files = e.target.files[0]
      if (!e || !window.FileReader) return // 看支持不支持FileReader
      let reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        // this.long = _this.src.length
        if (_this.src.length > 3) {
          console.log('嘿嘿')
        } else {
          _this.src.push(this.result)
          _this.lo = _this.src.length
          _this.pic.push(files)
        }
      }
    },
    // 删除图片
    dele (e, index) {
      this.src.splice(index, 1)
      this.pic.splice(index, 1)
      this.lo = this.src.length
    },
    // 提交
    sumbit () {
      let formData = new FormData()
      let picName = []
      if (this.pic.length) {
        this.pic.forEach(v => {
          formData.append('file', v)
          picName.push({'name': v.name})
        })
      }
      if (this.edit.length > 9) {
        this.axios.post(url + 'tenement-wechat/feedbackMessage/feedbackMessage', {
          'content': this.edit,
          'feedbackMessageImages': picName
        }).then(res => {
          if (res.data === true) {
            if (this.pic.length === 1) {
              this.axios.post(url + 'tenement-wechat/wechat/uploadFile', formData).then(res => {
                if (res.status === 200) {
                  this.$router.push({name: 'Success', query: {msg: 2}})
                } else {
                  Toast.fail('图片上传失败')
                }
              })
            } else if (this.pic.length > 1) {
              this.axios.post(url + 'tenement-wechat/wechat/uploadFiles', formData).then(res => {
                if (res.status === 200) {
                  this.$router.push({name: 'Success', query: {msg: 2}})
                } else {
                  Toast.fail('图片上传失败')
                }
              })
            } else {
              this.$router.push({name: 'Success', query: {msg: 2}})
            }
          } else {
            Toast.fail('报修失败')
          }
        })
      } else {
        Toast.fail('请填写10个字以上的投诉理由')
      }
    }
  },
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  watch: {
    edit: function (val) {
      this.long = val.length
    }
  }
}
</script>
<style scoped>
.complaint {
  font-size: 0.34rem;
}
.ss {
  border: none;
  color: rgba(178,178,178,1);
  font-size: 0.32rem;
  text-align: left;
  padding: 0.2rem 0.15rem;
}
textarea {
  border: none;
  font-size: 0.32rem;
}
.problem {
  background: white;
  width: 100%;
  border-top:1px solid #F7F4F8;
  border-bottom:1px solid #F7F4F8;
  padding: 20px 0 0 0;
}
/* .problem p{
  text-align: right
} */
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
.van-icon-close {
  position: absolute;
  color: red;
  background: white;
  border-radius: 70px;
  margin: 0rem 1.79rem;
}
.picture {
  text-align:left;
  padding: 0.1rem 0;
  background: white;
  margin-top: 20px;
}
.sele {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 10px 10px;
  font-size: 0.32rem;
}

</style>
