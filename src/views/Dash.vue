<script setup>
import { watchEffect, computed, ref } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import { useStore } from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser )

import { useRouter } from 'vue-router'
const router = useRouter()

const userNotes = ref()
const sharedNotes = ref({})
const loading = ref(true)

watchEffect(()=> {
    if (user.value.name) {
        firebase.database().ref('/users').child(user.value.name).on('value', snap => {
            userNotes.value = snap.val()
            loading.value = false
        })
    } else if (user.value.name===null){
        router.push('/')
    }
    if (userNotes.value){
        if (userNotes.value.shared){
            let sharedRefs = userNotes.value.shared
            // console.log('sharedRefs:',sharedRefs)
            for (let ref in sharedRefs){
                let user = sharedRefs[ref]
                firebase.database().ref(`/users/${user}/notes/${ref}`).on('value', snap => {
                    if(snap.val()) {
                        let data = {
                            user: user,
                            name: snap.val().name,
                            type: snap.val().type
                        }
                        sharedNotes.value[ref] = data

                        // console.log(sharedNotes.value)
                    }else console.error(`404: Unable to fetch shared note\nUser: ${user}\nRef: ${ref}`);
                })

            }
        }
    }
})

</script>

<template>
    <div class="container">
        <div v-if="loading" class="row justify-content-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="row justify-content-center">
            <div v-if="userNotes" class="col-11 col-md-8 col-lg-6 col-xl-5">
                
                <!-- Your Notes  -->
                <div class="row my-3">
                    <!-- Header -->
                    <div class="row align-items-center">
                        <div class="col h1 p-0">Your notes</div>

                        <router-link to="/create" class="col fs-5 text-end">
                            <i class="bi bi-plus-square"></i>
                            Add note
                        </router-link>

                    </div>
                    <!-- Notes -->
                    <div v-if="userNotes.notes" class="col-12 p-2 bg-my rounded">
                        <div v-for="note, id in userNotes.notes" :key="id" class="col p-2">
                            <router-link :to="`/note/${user.name}/${id}`" class="d-flex justify-content-between align-items-center text-white">
                                <div class="h4">{{note.name}}</div>

                                <div v-if="note.type==='private'">
                                    <i class="bi bi-lock fs-5 me-2"></i>
                                </div>
                                <div v-if="note.type==='public'">
                                    <i class="bi bi-unlock fs-5 me-2"></i>
                                </div>
                            </router-link>
                            <div class="spacer"></div>
                        </div>
                    </div>
                    <div v-else class="col-12 p-4 text-center">
                        You haven't created any note yet
                    </div>
                </div>

                <!-- Shared Notes -->
                <div v-if="sharedNotes" class="row ">
                    <div class="col h2 p-0">Shared notes</div>
                    <div class="col-12 p-2 bg-my rounded">
                        <div v-for="note, id in sharedNotes" :key="id" class="col p-2">
                            <router-link :to="`/note/${note.user}/${id}`" class="d-flex justify-content-between align-items-center text-white">
                                <div class="h4">{{note.name}}</div>

                                <div class="d-flex align-items-center gap-2">
                                    <div class="p">{{note.user}}</div>
                                    <div v-if="note.type==='private'">
                                        <i class="bi bi-lock fs-5 me-2"></i>
                                    </div>
                                    <div v-if="note.type==='public'">
                                        <i class="bi bi-unlock fs-5 me-2"></i>
                                    </div>
                                </div>

                            
                            </router-link>
                            <div class="spacer"></div>

                        </div>
                    </div>
                </div>


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