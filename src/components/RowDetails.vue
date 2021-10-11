<script setup>
// import X from '@/components/X.vue'
import { defineProps, ref } from 'vue'
const props = defineProps({user:String, noteID:String, direction:String ,rowID:String})

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
const rowRef = firebase.database(`users/${props.user}/notes/${props.noteID}/operations/${props.direction}/${props.rowID}`)
const data = ref({})
data.value = await rowRef.once('value')

</script>
    
<template>
    <div v-if="data">{data}</div>
</template>
    
<style lang="scss" scoped>
    
</style>