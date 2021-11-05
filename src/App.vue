<script setup>
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import NavbarTop from '../src/components/NavbarTop.vue'
import NavbarBlank from '../src/components/NavbarBlank.vue'
import { computed } from '@vue/reactivity';

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

import {useStore} from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser)

import { useRouter } from 'vue-router';
const router = useRouter()

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // console.log('User status: ✅')
        if (!user.displayName){
            console.error('Registration is not complete')
            router.push('/register')
        } else {
            store.dispatch('setUser', {name: user.displayName, uid: user.uid} )
                // .then(router.push('/dash'))
        }

    } else {
        // console.log('User status: ❌')
        store.dispatch('delUser')
    }
})

</script>

<template>
    <div v-if="user.uid">
        <navbar-top/>
        <router-view/>
    </div>
    <div v-else>
        <navbar-blank/>
        <router-view/>
    </div>
</template>

<style lang="scss">
@import "bootstrap/scss/_functions";
@import "bootstrap/scss/_variables";

@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-icons/font/bootstrap-icons.css';

@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,700;1,100;1,300;1,400;1,700&display=swap');

html {
    background: black;
    // background: $dark;
}
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Poppins";
    background: black;
    // background: $dark;
    color: white;
}

a{
    text-decoration: none !important;
}

.white{
    color: white !important;
}
.danger{
    color: $danger !important;
}
.success{
    color: $success !important;
}
.bg-my{
    background-color: #1a1a1a !important;
}

.hover:hover{
    color: $primary !important;
}
.hover-danger:hover{
    color: $danger !important;
}
.hover-success:hover{
    color: $success !important;
}

.spacer{
    border-bottom: .1rem rgb(61, 61, 61) solid;
}

</style>
