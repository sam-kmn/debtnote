<script setup>
import { computed, ref } from '@vue/reactivity'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import { useStore } from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser )

const data = ref()

if(user.value.name){
    firebase.database().ref('/users').child(user.value.name).on('value', snap => {
        data.value = snap.val()
    })

}

</script>


<template>
    <div class="container">
        <div v-if="data" class="col-12">

            <span class="h1">Your notes</span>

            <div v-if="data.notes" class="bg-dark rounded py-3">
                <div class="col-12 ps-4 mb-3" v-for="note, id in data.notes" :key="id" >
                    <router-link :to="'/note/' + id" class="h5 white">{{note.name}}</router-link>
                    <div class="spacer"></div>
                </div>
            </div>
            <div v-else class="bg-dark rounded p-2 text-center">
                <span class="p">You have not created any note yet</span>
            </div>
        </div>
    </div>
</template>