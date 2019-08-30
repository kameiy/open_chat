<template>
    <div id="home">
        <h1>Home</h1>
        <v-alert type="error" v-model="hasError" dismissible>{{ errorMessage }}</v-alert>
        <Discription></Discription>
    </div>
</template>
<script>
import firebase from 'firebase'
import Discription from './Discription.vue'
export default {
    components: { Discription },
    data () {
    return {
        hasError: false,
        errorMessage: "",
    }
  },
  async created () {
  },
  methods: {
  }
}
</script>
<style>

</style>
