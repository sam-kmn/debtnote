<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

import { useStore } from "vuex";
const store = useStore()

import { useRouter } from "vue-router";
const router = useRouter()

const step = ref(1)
const valid = ref(false)

const emailForm = ref('')
const passwordForm = ref('')
const usernameForm = ref('')



firebase.auth().onAuthStateChanged(user => {
    if (user)
        if(user.uid && !user.displayName) step.value = 2;
    
})


function stepOne(){
    firebase.auth().createUserWithEmailAndPassword(emailForm.value, passwordForm.value)
        .then(()=> step.value = 2)
        .catch(error => alert(error.message))
}

watch(usernameForm, ()=> verifyUsername())
async function verifyUsername(){
    let regex = /[~`!@#$%^&*+=[\]\\';,/{}()|\\":<>?\s]/g
    if (usernameForm.value && !regex.test(usernameForm.value) ) {
        const usersDB = await firebase.database().ref('users').once('value')
        if (usersDB.val()){
            const users = Object.keys(usersDB.val())
            if (users.includes(usernameForm.value)) valid.value = false
            else valid.value = true
        } else valid.value = true 
    } else valid.value = false
}

async function stepTwo(){
    if (valid.value){
        const user = firebase.auth().currentUser
        if (user){
            await user.updateProfile({displayName: usernameForm.value})
            await firebase.database().ref('/users').child(usernameForm.value).set({uid: user.uid})
            await store.dispatch('setUser', {name: user.displayName, uid: user.uid} )
            router.push('/dash')
        }


    }
}


</script>


<template>
    <div class="container-fluid d-flex justify-content-center  mt-5">
        <div class="col-xs-10 col-sm-7 col-md-6 col-lg-5 col-xl-4   mt-5">
            <div v-if="step===1">

                <h1 class="text-center">Step 1</h1>
                <div class="text-center mb-5">
                    <i class="bi bi-circle-fill"></i>
                    <i class="bi bi-dash-lg"></i>
                    <i class="bi bi-circle"></i>
                </div>

                <form @submit.prevent="stepOne">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" v-model="emailForm" class="form-control bg-dark text-light rounded-pill" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" v-model="passwordForm" class="form-control bg-dark text-light rounded-pill" id="exampleInputPassword1">
                    </div>
                    <button type="submit" class="btn btn-outline-light rounded-pill">Submit</button>
                </form>
            </div>
            
            <div v-if="step===2">

                <div>
                    <h1 class="text-center">Step 2</h1>
                    <div class="text-center mb-5">
                        <i class="bi bi-circle-fill"></i>
                        <i class="bi bi-dash-lg"></i>
                        <i class="bi bi-circle-fill"></i>
                    </div>
                </div>

                <form @submit.prevent="stepTwo">
                    <div>
                        <h2 class="text-center">What's your name?</h2>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <input @change="verifyUsername" v-model="usernameForm" type="text" class="form-control text-light rounded-pill bg-dark" :class="{danger: !valid}">
                        <button class="btn btn-dark" type="submit">
                            <i v-if="valid" class="bi bi-check-circle display-6 success"></i>
                            <i v-else class="bi bi-x-circle display-6 danger"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>