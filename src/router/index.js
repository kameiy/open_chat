import Vue from 'vue'
import Router from 'vue-router'

import ChatRoom from '@/components/Chat'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/chatroom/:id', component: ChatRoom }
  ]
})

export default router