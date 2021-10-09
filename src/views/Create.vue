<script setup>
import { computed, ref } from '@vue/reactivity'

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useStore } from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser)

const private_mode = ref(true)

const fetched_users = ref()
const auth_users = ref([])
const input_users = ref()
const input_name = ref('')

firebase.database().ref('/users').once('value')
    .then(res => fetched_users.value = Object.keys(res.val()))

function grant_permission(){
    if(input_users.value)
        if(fetched_users.value.includes(input_users.value) && input_users.value != user.value.name) 
            auth_users.value.push(input_users.value)
}

function createNote(){
    if(input_name.value){
        var note_data = {name: input_name.value}
        if (private_mode.value){
            note_data.type = 'private'
            if (auth_users.value.length > 0) note_data.members = auth_users.value
        } else note_data.type = 'public'

        console.log(note_data)
        firebase.database().ref(`/users/${user.value.name}/notes`).push(note_data)
        router.push('/dash')
    }
}

</script>

<template>
    <div class="container">
        <div class="row p-3 justify-content-center">
            <div class="col-12 col-md-7 col-lg-5 ">

                <div class="row h2">Create new note</div>

                <div class="row">
                    <input v-model="input_name" type="text" class="bg-my text-white form-control border-dark" placeholder="Name">
                </div>

                <div class="row mt-3">
                    <div class="form-check form-switch">
                        <input v-model="private_mode" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked>
                        <label class="form-check-label" for="flexSwitchCheckDefault">Private mode <span v-if="private_mode" class="text-dark">(only authorized users can read/write)</span></label>
                    </div>
                </div>

                <div v-if="private_mode" class="row mt-3 ">
                    <div class="p-0 h4">Authorized users</div>
                    <div class="input-group p-0">
                        <input v-model="input_users" class="form-control bg-my border-dark text-white" list="datalistOptions" placeholder="Type to search users...">
                        <button @click="grant_permission" class="btn btn-outline-secondary rounded" type="button" >Add</button>
                        <datalist id="datalistOptions">
                            <option v-for="user in fetched_users" :key="user" :value="user" > </option>
                        </datalist>
                    </div>
                    <div class="row mt-2 ">
                        <div v-for="user, id in auth_users" :key="id" class="col-12 mb-2" @click="auth_users.splice(id,1)">
                            <i class="bi bi-x danger"></i>
                            {{user}} 
                        </div>
                    </div>
                </div>

                <div class="d-flex mt-3 gap-3 justify-content-end">
                    <button class="btn btn-outline-danger rounded-pill" @click="router.push('/dash')">Cancel</button>
                    <button class="btn btn-outline-primary rounded-pill" @click="createNote">Create</button>
                </div>

            </div>
        </div>
    </div>
</template>