<template>
  <div id="app">
    <h1>Open Chat</h1>
    <div v-if="isSignedIn">
      <button @click="signOut">ログアウト</button>
      <p>User: {{ user.displayName }}</p>
      <router-view/>
    </div>
    <div v-else>
      <button @click="signIn">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'app',
  data () {
    return {
      user: null,
      isSignedIn: null,
    }
  },
  created () {
    this.onAuthStateChanged()
  },
  methods: {
    // ログイン状況が変更されたら呼ばれる
    onAuthStateChanged () {
      firebase.auth().onAuthStateChanged( user => {
        this.user = user;
        this.isSignedIn = user ?
          true : false;
      })
    },
    // ログインしてるか
    isUserSignedIn () {
      return !!firebase.auth().currentUser || false;
    },
    // Google認証でログイン
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    // ログアウト
    signOut () {
      firebase.auth().signOut()
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
