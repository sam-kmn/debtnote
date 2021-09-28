<script setup>
import NavbarTop from '../src/components/NavbarTop.vue'
import NavbarLeft from '../src/components/NavbarLeft.vue'
import NavbarBlank from '../src/components/NavbarBlank.vue'

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

import {useStore} from 'vuex'
import { computed } from '@vue/reactivity';
const store = useStore()
const user = computed(()=> store.getters.getUser)


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('User status: ✅')
    } else {
        console.log('User status: ❌')
    }
})

console.log(user.value)

</script>

<template>
    <div v-if="user.uid" class="d-flex flex-column flex-md-row">
        <navbar-top class="d-md-none" />
        <navbar-left class="d-none d-md-block" />
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
    background: $dark;
}
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Poppins";
    background: $dark;
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


</style>
