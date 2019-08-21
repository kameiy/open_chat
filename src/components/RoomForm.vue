<template>
    <v-form>
        <v-text-field label="チャットルーム名" v-model="roomname" :rules="[rules.required]"></v-text-field>
        <v-text-field label="チャットルームでのアカウント名" v-model="nickname" :rules="[rules.required]"></v-text-field>
        <v-btn @click="createroom">作成</v-btn>
    </v-form>
</template>
<script>
import firebase from 'firebase'
export default {
    data () {
        return {
            roomname: "",
            nickname: "",
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
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
                };
            console.log(data);
            // DBにルーム作成
            const db = firebase.firestore();
            const roomRef = await db.collection("rooms").add(data);

            // user add
            const userRef = roomRef.collection("users").doc(user.uid)
            userRef.set({name: this.nickname})

            // create messages
            roomRef.collection(messages)

            // 作成したルームへ移動
            this.$router.push({ name: 'room', params: { id: roomRef.id } })
        }
    }
}
</script>
<style>

</style>
