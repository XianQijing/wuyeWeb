<template>
  <div class="success">
    <div class="img">
      <img src="static/success.png" alt="">
      <p>{{this.tips}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tips: ''
    }
  },
  mounted () {
    if (this.$route.query.msg === 1) {
      this.tips = '我们的维修人员将在12小时内联系处理请保持电话通畅'
    } else if (this.$route.query.msg === 2) {
      this.tips = '投诉成功'
    } else {
      this.tips = '绑定成功，请返回操作页面'
    }
  }
}
</script>

<style scoped>
img {
  width: 2.02rem;
}
.img {
  position: relative;
  top: 1.13rem;
  width: 100%;
}
p {
  font-size:0.34rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(102,102,102,1);
  padding: 0.34rem 0.73rem 0 0.73rem;
}
</style>
