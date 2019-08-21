<template>
    <div id="home">
        <h1>Home</h1>
        <v-list>
            <v-list-item v-for="(room, index) in rooms" :key="index">
                <v-list-item-content>
                    <v-list-item-title>
                        <router-link v-bind:to="{ name: 'room', params: {id: room.uid}}">{{ room.name }}</router-link>
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
      rooms: [
          {
              id: "a",
              name: "にゃんにゃんルーム"
          },
          {
              id: "b",
              name: "ばぶばぶルーム"
          }
      ]
    }
  },
  async created () {
      await this.getRooms()
  },
  methods: {
    // ルーム一覧取得
    getRooms: async function(){
        const db = firebase.firestore();
        const user = firebase.auth().currentUser;
        const userRef = db.collection("users").doc(user.uid);
        const userSnapshot = await userRef.get();
        if (userSnapshot.exists) {
            console.log("Document data:", userSnapshot.data());
            this.rooms = userSnapshot.data().rooms;
        } else {
            console.log("No such document!");
        }
    }
  }
}
</script>
<style>

</style>
