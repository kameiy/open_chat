<template>
    <div id="chat">
        <h1>{{ roomname }}</h1>
        <v-alert type="error" v-model="hasError" dismissible>{{ errorMessage }}</v-alert>
        <div v-if="!registerd">
            <v-form>
                <v-text-field label="チャットルームでのアカウント名" v-model="name" :rules="[rules.required]"></v-text-field>
                <v-btn @click="registerName">OK</v-btn>
            </v-form>
        </div>
        <div class="message" v-for="(message, index) in messages" :key="index" v-bind:class="{ 'mine': message.isMine }">
            <div class="username" v-if="index>0 && messages[index-1].author != message.author">{{message.name}}</div>
            <div class="username" v-if="index == 0">{{message.name}}</div>
            <v-chip outlined>{{ message.text }}</v-chip>
        </div>
        <v-form v-if="registerd" class="d-flex align-center">
            <v-textarea class="pa-10" v-model="input" rows="1"></v-textarea>
            <v-btn class="pa-2" @click="sendmessage">送信</v-btn>
        </v-form>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    data () {
        return {
            registerd: false,
            roomname: "私の部屋",
            name: "",
            input: "",
            messages: [],
            rules: {
                required: value => !!value || 'Required.',
            },
            hasError: false,
            errorMessage: "",
        }
    },
    created () {
        this.getData();
    },
    methods: {
        registerName: function(){
            if(!this.validateName()){
                this.hasError = true
                this.errorMessage = "表示名を入力してください"
                return
            }
            const roomid = this.$route.params.id;
            const db = firebase.firestore();
            const user = firebase.auth().currentUser;
            const userRef = db.collection("rooms").doc(roomid).collection("users").doc(user.uid)
            try {
                userRef.set({name: this.name})
            } catch (error) {
                this.hasError = true
                this.errorMessage = "表示名登録に失敗しました"
                return
            }
            this.registerd = true;
        },
        getData: async function(){
            const self = this;
            const roomid = this.$route.params.id;
            const db = firebase.firestore();
            const user = firebase.auth().currentUser;

            // get room info
            const roomRef = db.collection("rooms").doc(roomid)
            const roomSnap = await roomRef.get()
            if(roomSnap.exists){
                this.roomname = roomSnap.data().name
            }else{
                this.hasError = true
                this.errorMessage = "ルーム情報取得に失敗しました"
                return
            }

            // get user disp name
            const userRef = db.collection("rooms").doc(roomid).collection("users").doc(user.uid);
            try {
                const userSnapshot = await userRef.get()
                if(userSnapshot.exists){
                    this.registerd = true
                    this.name = userSnapshot.data().name
                }
            } catch (error) {
                this.hasError = true
                this.errorMessage = "表示名取得に失敗しました"
                return
            }

            // get messages
            const messagesRef = db.collection("rooms").doc(roomid).collection("messages");
            messagesRef.orderBy("created").onSnapshot({next: function(querySnapshot){
                self.messages = [];
                querySnapshot.docs.forEach(function(doc) {
                    let data = doc.data()
                    data.isMine = data.author == user.uid? 1: 0
                    self.messages.push(data)
                });
            }, error: function(error){
                this.hasError = true
                this.errorMessage = "メッセージ取得に失敗しました"
            }});
        },
        sendmessage: async function(){
            if(!this.validateMessage()){
                this.hasError = true
                this.errorMessage = "メッセージを入力してください"
                return
            }
            const roomid = this.$route.params.id;
            const db = firebase.firestore();
            const messegesRef = db.collection("rooms").doc(roomid).collection("messages");
            const user = firebase.auth().currentUser;
            try {
                messegesRef.add({name: this.name, text: this.input, author: user.uid, created: new Date()});
            } catch (error) {
                this.hasError = true
                this.errorMessage = "メッセージ送信に失敗しました"
                return
            }
            this.input = ""
        },
        validateMessage: function(){
            return !(this.input == "")
        },
        validateName: function(){
            return !(this.name == "")
        }
    }
}
</script>
<style>
.message{
    text-align: left;
}
.message.mine{
    text-align: right;
}
</style>
