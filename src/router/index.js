import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import ChatRoom from '@/components/Chat'
import RoomForm from '@/components/RoomForm'
import MyPage from '@/components/MyPage'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/room/:id', name: "room", component: ChatRoom },
    { path: '/newroom', component: RoomForm },
    { path: '/mypage', component: MyPage },
  ]
})

export default router