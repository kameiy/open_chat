<template>
    <div id="home">
        <h1>Home</h1>
        <v-alert type="error" v-model="hasError" dismissible>{{ errorMessage }}</v-alert>
        <v-list>
            <v-list-item v-for="(room, index) in rooms" :key="index">
                <v-list-item-content>
                    <v-list-item-title>
                        <router-link v-bind:to="{ name: 'room', params: {id: room.id}}">{{ room.name }}</router-link>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    data () {
    return {
        rooms: [],
        hasError: false,
        errorMessage: "",
    }
  },
  async created () {
      await this.getRooms()
  },
  methods: {
    // ルーム一覧取得
    getRooms: async function(){
        const self = this
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;
        const roomsRef = db.collection("users").doc(user.uid).collection("rooms");
        const querySnapshot = await roomsRef.get()
        if(querySnapshot.exists){
            querySnapshot.forEach((roomSnapshot)=>{
                self.rooms.push({id: roomSnapshot.id, name: roomSnapshot.data().name})
            })
        }else{
            this.hasError = true
            this.errorMessage = "ルーム一覧の取得に失敗しました"
        }
    }
  }
}
</script>
<style>

</style>
