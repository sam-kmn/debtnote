<script setup>
import { watchEffect, computed, ref } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import { useStore } from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser )

import { useRouter } from 'vue-router'
const router = useRouter()

const data = ref()

watchEffect(()=> {
    if (user.value.name) {
        firebase.database().ref('/users').child(user.value.name).on('value', snap => {
            data.value = snap.val()
        })
    } else if (user.value.name===null){
        router.push('/')
    }
})

</script>


<template>
    <div class="container">
        <div class="row justify-content-center">
            <div v-if="data" class="col-12 col-md-7 col-lg-5 pt-3">

                <div class="row"><span class="h1">Your notes</span></div>
                

                <div v-if="data.notes" class="bg-my rounded py-3 mb-3 overflow-auto" style="max-height: 30rem;">
                    <div class="col-12 ps-4 mb-3 " v-for="note, id in data.notes" :key="id" >
                        <router-link :to="`/note/${user.name}/${id}`" class="d-flex justify-content-between align-items-center text-white">
                            <div class="h4">{{note.name}}</div>
                            <!-- <div v-if="note.type==='private' && note.members" class="me-2">
                                {{Object.keys(note.members).length}}
                                <i class="bi bi-people-fill"></i>
                            </div> -->
                            <div v-if="note.type==='private'">
                                <i class="bi bi-lock fs-5 me-2"></i>
                                <!-- <span class="badge bg-secondary me-2">Private</span> -->
                            </div>
                            <div v-if="note.type==='public'">
                                <i class="bi bi-unlock fs-5 me-2"></i>
                                <!-- <span class="badge bg-secondary me-2">Public</span> -->
                            </div>
                        </router-link>
                        <div class="spacer"></div>
                    </div>
                </div>
                <div v-else class="bg-my mb-3 rounded p-2 text-center">
                    <span class="p">You have not created any note yet</span>
                </div>
                
                <router-link to="/create" class="fs-5">
                    <i class="bi bi-plus-square"></i>
                    Add note
                </router-link>

                <!-- <div class="row p-2 justify-content-evenly">
                    <div class="col-3 m-2 bg-my rounded" v-for="note, id in data.notes" :key="id">
                        <div class="row rounded note-header">{{note.type}}</div>
                        <router-link :to="'/note/' + id" class="row h4 p-4 overflow-auto white">{{note.name}}</router-link>
                    </div>
                </div> -->

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.note-header{
    border-bottom: 1px solid rgb(41, 41, 41);
    background-color: rgb(19, 19, 19) !important;
    color: gray;
    padding-left: .3rem;
}
</style>