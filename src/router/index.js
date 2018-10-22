import Vue from 'vue'
import Router from 'vue-router'
import Contract from '@/components/contract'
import Charge from '@/components/charge'
import Repair from '@/components/repair'
import Complaint from '@/components/complaint'
import Success from '@/components/success'
import Car from '@/components/car'
// import Author from '@/components/author'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Contract',
      component: Contract
      // meta: {
      //   requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
      // }
    }, {
      path: '/charge',
      name: 'Charge',
      component: Charge,
      meta: {
        requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
      }
    }, {
      path: '/repair',
      name: 'Repair',
      component: Repair,
      meta: {
        requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
      }
    }, {
      path: '/complaint',
      name: 'Complaint',
      component: Complaint,
      meta: {
        requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
      }
    }, {
      path: '/success',
      name: 'Success',
      component: Success
    }, {
      path: '/car',
      name: 'Car',
      component: Car
    }
  ]
})
