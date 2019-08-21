import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import 'firebase/firestore';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBpR-TG9sDspsTDlxGfeGqCUv1AAPpFbns",
  authDomain: "openchat-a2013.firebaseapp.com",
  databaseURL: "https://openchat-a2013.firebaseio.com",
  projectId: "openchat-a2013",
  storageBucket: "openchat-a2013.appspot.com",
  messagingSenderId: "145657697673",
  appId: "1:145657697673:web:801ace7a1b558ba3"
}
const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.firestore();

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
