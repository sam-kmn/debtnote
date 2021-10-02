<script setup>
import { ref } from '@vue/reactivity'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import { useRouter } from 'vue-router'
const router = useRouter()

// import { useStore } from 'vuex'
// const store = useStore()
// const user = computed(()=> store.getters.getUser)

const data = ref(null)
const debters_total = ref({})
const total = ref(0)
const loading = ref(true)

firebase.auth().onAuthStateChanged(user => {
    if (user){
        firebase.database().ref('/users').child(user.displayName).child('borrow').on('value', snap => {
            if (snap.val()) {
                data.value = snap.val()
                for (let debter in data.value){
                    
                    let debter_total = 0
                    for (let operation in data.value[debter]){
                        debter_total += data.value[debter][operation].amount
                    }
                    debters_total.value[debter] = debter_total
                }
                for (let debter in debters_total.value){
                    total.value += debters_total.value[debter]
                }
            }
            loading.value = false
        })
    } else router.push('/login')
})

</script>

<template>

    <div class="container-fluid">
        <div v-if="loading">
            <div class="row justify-content-center mt-5">
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

        <div v-if="!loading && data" class="container p-5">
            <div class="row align-items-center rounded bg-black mb-3 p-2"><h1 class="m-0">Total borrowed: {{total}}</h1></div>
            <div class="row bg-black rounded px-2 py-4">
                <div class="col-12"><h1>Debts you owe: </h1></div>
                <div class="col">
                    <div v-for="total, person in debters_total" :key="person">
                        <div class="spacer my-3"></div>
                        <div class="d-flex align-items-center justify-content-between">
                            <h3 class="ms-3 m-0">{{person}}: {{total}}</h3>
                            <button class="btn btn-outline-light rounded-pill">Details</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- {{data}} -->
        </div>

        <div v-if="!loading && !data" class="text-center py-5 px-md-3 px-lg-5">
            <h1>Whoops, there's nothing in here</h1>
            <h2>You haven't borrowed any money</h2>
            <span class="display-1">🙈</span>
            <div class="spacer my-3"></div>
            <p class="h5">If you wish to borrow money from your friend:</p>
            <div class="row d-md-none align-items-center justify-content-center">
                <p class="col-12">
                    Tap on menu button in upper-right corner 
                    <i class="bi bi-list display-6 bg-black rounded px-2 ms-2 shadow"></i>
                </p>
                <p class="col-12">
                    Then go to 
                    <router-link to="/friends" class="white bg-black shadow rounded fs-5 px-2 py-1 ms-2">
                        <i class="bi bi-people "></i> 
                        Friends
                    </router-link>
                </p>
            </div>
            <div class="row d-none d-md-block align-items-center justify-content-center">
                <p class="col-12">
                    Go to  
                    <router-link to="/friends" class="white bg-black shadow rounded fs-5 px-2 py-1 ms-2">
                        <i class="bi bi-people "></i> 
                        Friends
                    </router-link>
                </p>
            </div>

        </div>
    </div>

</template>