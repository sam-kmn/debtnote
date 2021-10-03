<script setup>
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import {computed, defineProps, ref} from 'vue'
const props = defineProps({id:String})

import { useStore } from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser)

const data = ref()

if(user.value.name){
    firebase.database().ref(`/users/${user.value.name}/notes/${props.id}`).on('value', snap=> {
        data.value = snap.val()
    })
}

</script>


<template>
    <div class="container">
        <div v-if="data">{{data}}</div>
    </div>
</template>