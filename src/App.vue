<template>
  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>
    <v-app-bar app>
      <h1>Open Chat</h1>
      <div v-if="isSignedIn">
        <v-btn @click="signOut">ログアウト</v-btn>
      </div>
      <div v-else>
        <v-btn @click="signIn">ログイン</v-btn>
      </div>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <div v-if="isSignedIn">
          <p>User: {{ user.displayName }}</p>
          <router-view/>
        </div>
        <div v-else>
        </div>
      </v-container>
    </v-content>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
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
