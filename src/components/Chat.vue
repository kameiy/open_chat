<template>
    <div id="chat">
        <h1>Chat Room</h1>
        <h1>{{ roomname }}</h1>
        {{ $route.params.id }}
        <ul id="chat">
            <li v-for="(message, index) in messages" :key="index">
                <p>author: {{ message.author }}</p>
                <p>text: {{ message.text }}</p>
            </li>
        </ul>
        <form>
            <textarea v-model="input"></textarea>
            <input type="submit" value="送信" v-on:click="sendmessage">
        </form>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    data () {
        return {
            roomname: "",
            name: "keiko",
            input: "",
            messages: [
                {
                    id: "a",
                    author: "a-san",
                    text: "あん"
                },
                {
                    id: "b",
                    author: "b-san",
                    text: "なん"
                }
            ]
        }
    },
    created () {
        this.getMessages();
    },
    methods: {
        getMessages: async function(){
            const roomid = this.$route.params.id;
            const db = firebase.firestore();
            const messagesRef = db.collection("rooms").doc(roomid);
            const messagesSnapshot = await messagesRef.get();
            if (messagesSnapshot.exists) {
                console.log("Document data:", messagesSnapshot.data());
                this.messages = messagesSnapshot.data().messages;
            } else {
                console.log("No such document!");
            }
        },
        sendmessage: function(){
            this.messages.push({author: this.name, text: this.input})
            this.input = ""
        }
    }
}
</script>
<style>

</style>
