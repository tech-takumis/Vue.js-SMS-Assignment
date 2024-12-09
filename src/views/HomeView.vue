<script setup>
import { onMounted } from 'vue'
import Message from '../components/Message.vue'
import {useSms} from '../stores/sms_store.js'

const store = useSms()
onMounted(()=>{
  store.getUsers()
})
</script>

<template>
  <main>
    <Message />
  </main>
</template>
