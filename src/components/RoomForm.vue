<template>
    <div>
        <v-alert type="error" v-model="hasError" dismissible>{{ errorMessage }}</v-alert>
        <v-form>
            <v-text-field label="チャットルーム名" v-model="roomname" :rules="[rules.required]"></v-text-field>
            <v-text-field label="チャットルームでのアカウント名" v-model="nickname" :rules="[rules.required]"></v-text-field>
            <v-btn @click="createroom">作成</v-btn>
        </v-form>
    </div>
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
            hasError: false,
            errorMessage: "",
        }
    },
    created () {
    },
    methods: {
        createroom: async function(){
            if(!this.validateRoom()){
                this.hasError = true
                this.errorMessage = "チャットルーム名を入力してください"
                return
            }
            if(!this.validateNickname()){
                this.hasError = true
                this.errorMessage = "チャットルームでのアカウント名を入力してください"
                return
            }
            const self = this
            const user = firebase.auth().currentUser;

            // DBにルーム作成
            const db = firebase.firestore();
            const batch = db.batch();
            
            // create room
            const roomRef = db.collection("rooms").doc()
            batch.set(roomRef, { name: this.roomname, owner: user.uid })
            // add user
            const userRef = roomRef.collection("users").doc(user.uid)
            batch.set(userRef, {name: this.nickname})
            // add room to user info
            const userInfoRef = db.collection("users").doc(user.uid).collection("rooms").doc(roomRef.id)
            batch.set(userInfoRef, {name: this.roomname})
            batch.commit().then(function(){
                // 作成したルームへ移動
                self.$router.push({ name: 'room', params: { id: roomRef.id } })
            }).catch(function(error){
                console.log(error)
                self.hasError = true
                self.errorMessage = "チャットルーム作成に失敗しました"
                return
            })
        },
        validateRoom(){
            return !(this.roomname == "")
        },
        validateNickname(){
            return !(this.nickname == "")
        }
    }
}
</script>
<style>

</style>
