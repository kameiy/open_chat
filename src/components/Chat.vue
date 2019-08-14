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
        this.roomname = $route.params.id;
    },
    methods: {
        sendmessage: function(){
            this.messages.push({author: this.name, text: this.input})
            this.input = ""
        }
    }
}
</script>
<style>

</style>
