<script setup>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

</script>


<template>
    <div id="sidebar" class="containter bg-black">
        <nav style="height:100%;" class="nav flex-column">

            <router-link style="height: 8%;" to="/dash" class="d-flex align-items-center justify-content-center p-3">
                <img src="../assets/debtnote-icon.png" alt="" width="30" height="30"  class="d-inline-block">
                <span class="ms-2 white" style="font-size: 1.5rem;">Debtnote</span>
            </router-link>

            <div style="height: 90%;" class="d-flex flex-column justify-content-between white ms-3 fs-5">

                <div class="d-flex flex-column">
                    <router-link  to="/dash">
                        <i class="bi bi-wallet2"></i>
                        Dash</router-link>

                    <router-link  to="/borrow">
                        <i class="bi bi-box-arrow-in-left"></i>
                        Borrowed</router-link>

                    <router-link  to="/lend">
                        <i class="bi bi-box-arrow-right"></i>
                        Lended</router-link>

                    <router-link  to="/friends">
                        <i class="bi bi-people"></i>
                        Friends</router-link>
                </div>

                <div class="d-flex flex-column">
                    
                    <router-link to="/settings">
                        <i class="bi bi-gear"></i>
                        Settings</router-link>
                    
                    <a @click="firebase.auth().signOut()">
                        <i class="bi bi-box-arrow-right"></i>
                        Sign Out</a>
                </div>
                
            </div>

        </nav>
    </div>
</template>

<style lang="scss" scoped>

#sidebar{
    // width: 15rem;
    height: 100vh;
    // background: rgb(53,54,58);
    
    a{
        color: white !important;
        margin-bottom: .7rem !important;
        &:hover{
            cursor: pointer;
        }
    }
    .router-link-active{
        font-weight: bold;
    }
}

</style>