<script setup>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { ref } from "vue"

import { useRouter } from 'vue-router'
const router = useRouter()

const emailForm = ref('')
const passwordForm = ref('')

function signIn(){
    firebase.auth().signInWithEmailAndPassword(emailForm.value, passwordForm.value)
        .then(()=> router.push('/dash'))
        .catch(e => alert(e.message))
}

</script>

<template>
    <div class="container-fluid d-flex justify-content-center  mt-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4   mt-5">
            <form @submit.prevent="signIn">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input v-model="emailForm" type="email" class="form-control bg-my border-dark text-light rounded-pill" id="exampleInputEmail1" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model="passwordForm" type="password" class="form-control bg-my border-dark text-light rounded-pill" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-outline-light rounded-pill">Log In</button>
            </form>
        </div>
    </div>
</template>