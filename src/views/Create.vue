<script setup>
import { ref } from '@vue/reactivity'

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const private_mode = ref(true)

const fetched_users = ref()
const auth_users = ref([])
const input_users = ref()

firebase.database().ref('/users').once('value')
    .then(res => fetched_users.value = Object.keys(res.val()))

function grant_permission(){
    if(input_users.value)
        if(fetched_users.value.includes(input_users.value)) 
            auth_users.value.push(input_users.value)
    
}

</script>

<template>
    <div class="container">
        <div class="row p-3 justify-content-center">
            <div class="col-12 col-md-7 col-lg-5 ">

                <div class="row h2">Create new note</div>

                <div class="row">
                    <input type="text" class="bg-my text-white form-control border-dark" placeholder="Name">
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
                    <div class="row row-cols-2">
                        <div v-for="user in auth_users" :key="user" class="col">{{user}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>