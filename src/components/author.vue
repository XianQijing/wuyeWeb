<template>
  <div class="author"></div>
</template>
<script>
export default {
  name: 'author',
  created () {
    // var redirect = decodeURIComponent(this.$route.query.redirect || '/')
    // localStorage.setItem('openid', 2)
    // localStorage.clear()
    this.$router.push({
      path: sessionStorage.getItem('url')
    })
  },
  methods: {
    
  }
}
</script>
