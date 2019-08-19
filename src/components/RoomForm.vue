<template>
    <form>
        <input type="text" v-model="roomname" placeholder="チャットルーム名"/>
        <input type="text" v-model="nickname" placeholder="チャットルームでのアカウント名"/>
        <button @click="createroom">作成</button>
    </form>
</template>
<script>
import firebase from 'firebase'
export default {
    data () {
        return {
            roomname: "",
            nickname: ""
        }
    },
    created () {
    },
    methods: {
        createroom: async function(){
            const user = firebase.auth().currentUser;
            let data  = { 
                    name: this.roomname,
                    owner: user.uid,
                    messages: [],
                    users: [
                        {
                            id: user.uid,
                            name: this.nickname
                        }
                    ]
                };
            console.log(data);
            // DBにルーム作成
            const db = firebase.firestore();
            const roonRef = await db.collection("rooms").add(data);
            // 作成したルームへ移動
            this.$router.push({ name: 'room', params: { id: roonRef.id } })
        }
    }
}
</script>
<style>

</style>
