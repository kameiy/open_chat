<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn to="/">Home</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn to="/mypage">マイページ</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn to="/newroom">ルーム作成</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="openInquiry">問い合わせ</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="openAdministrator">運営者情報</v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div v-if="isSignedIn">
              <p>Login as: {{ user.email }}</p>
              <v-btn @click="signOut">ログアウト</v-btn>
            </div>
            <div v-else>
              <v-btn @click="signIn">ログイン</v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h1>Open Chat</h1>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <div v-if="isSignedIn">
          <router-view/>
        </div>
        <div v-else>
          <Discription></Discription>
          <v-btn @click="signIn">ログイン</v-btn>
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
import Discription from './components/Discription.vue'

export default {
  name: 'app',
  components: { Discription },
  data () {
    return {
      user: null,
      isSignedIn: null,
      drawer: false,
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
    openInquiry () {
      window.open("https://forms.gle/HHb55u3bMY8pFxZc7", '_blank')
    },
    openAdministrator () {
      window.open("https://computer-consultant-1979.business.site", '_blank')
    }
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
