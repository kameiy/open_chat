import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import ChatRoom from '@/components/Chat'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/room/:id', name: "room", component: ChatRoom }
  ]
})

export default router