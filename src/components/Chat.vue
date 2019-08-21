<template>
    <div id="chat">
        <h1>{{ roomname }}</h1>
        <div v-if="isFirst">
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
        <v-form class="d-flex align-center">
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
        }
    },
    created () {
        this.getData();
    },
    methods: {
        isFirst: function(){
            return true
        },
        registerName: function(){
            const roomid = this.$route.params.id;
            const db = firebase.firestore();
            const user = firebase.auth().currentUser;
            const userRef = db.collection("rooms").doc(roomid).collection("users").doc(user.uid)
            userRef.set({name: this.name})
        },
        getData: async function(){
            const self = this;
            const roomid = this.$route.params.id;
            const db = firebase.firestore();
            const user = firebase.auth().currentUser;

            // get room info
            const roomRef = db.collection("rooms").doc(roomid)
            const roomSnap = await roomRef.get()
            this.roomname = roomSnap.data().name

            // get user disp name
            const userRef = db.collection("rooms").doc(roomid).collection("users").doc(user.uid);
            const userSnapshot = await userRef.get()
            this.name = userSnapshot.data().name

            // get messages
            const messagesRef = db.collection("rooms").doc(roomid).collection("messages");
            messagesRef.orderBy("created").onSnapshot({next: function(querySnapshot){
                self.messages = [];
                querySnapshot.docs.forEach(function(doc) {
                    let data = doc.data()
                    data.isMine = data.author == user.uid? 1: 0
                    self.messages.push(data)
                });
            }});
        },
        sendmessage: async function(){
            const roomid = this.$route.params.id;
            const db = firebase.firestore();
            const messegesRef = db.collection("rooms").doc(roomid).collection("messages");
            const user = firebase.auth().currentUser;
            messegesRef.add({name: this.name, text: this.input, author: user.uid, created: new Date()});
            this.input = ""
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
