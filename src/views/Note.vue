<script setup>
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import {computed, defineProps, ref} from 'vue'
const props = defineProps({id:String})

import { useStore } from 'vuex'
const store = useStore()
const user = computed(()=> store.getters.getUser)

const data = ref()

const update = ref(false)
const input_amount = ref(0)
const input_title = ref('')
const input_desc = ref('')

const input_date = ref('')
let d = new Date()
input_date.value = d.toISOString().split('T')[0]

if(user.value.name){
    firebase.database().ref(`/users/${user.value.name}/notes/${props.id}`).on('value', snap=> {
        data.value = snap.val()
    })
}


function addRow(){
    if (input_title.value, input_amount.value)
        firebase.database().ref(`users/${user.value.name}/notes/${props.id}/operations`).push({
            'title': input_title.value,
            'amount': input_amount.value,
            'desc': input_desc.value,
            'date': input_date.value})
            .then(()=> update.value = false)
            .catch(error => alert(error.message))
}

// function deleteRow(){
//     firebase.database().ref(`users/${user.value.name}/notes/${props.id}/operations/${active_row.value}`).remove()
//         .catch(error => alert(error.message))  
// }

</script>


<template>
    <div class="container">
        <div class="row justify-content-center ">
            <div v-if="data" class="col-12 col-md-8 col-lg-6 p-3 ">

                <!-- Navbar -->
                <div class="row justify-content-between align-items-center">
                    <div class="col d-flex align-items-center">
                        <span class="h2 me-2">{{data.name}}</span>
                        <i v-if="data.type==='public'" class="bi bi-unlock fs-3"></i>
                        <i v-if="data.type==='private'" class="bi bi-lock fs-3"></i>
                    </div>

                    <div class="col-auto d-flex gap-3 fs-2">
                        <!-- <div @click="deleteRow"><i class="bi bi-dash-circle hover-danger"></i></div> -->
                        <div @click="update=true"><i class="bi bi-plus-circle hover"></i></div>
                        <div><i class="bi bi-gear hover"></i></div>
                    </div>
                </div>
                
                <!-- Update (add row) compontent -->
                <div v-if="update" class="row mt-3 justify-content-center ">
                    <div class="col-11 mb-3">
                        <span class="h3">Title</span>
                        <input v-model="input_title" type="text" class="form-control bg-my border-dark text-white" maxlength="6" placeholder="Max 6 characters.">
                    </div>
                    <div class="col-11 mb-3">
                        <span class="h3">Description</span>
                        <input v-model="input_desc" type="text" class="form-control bg-my border-dark text-white" maxlength="30" placeholder="Max 30 characters.">
                    </div>
                    <div class="col-6">
                        <span class="h3">Amount</span>
                        <input v-model="input_amount" type="text" class="form-control bg-my border-dark text-white" placeholder="Amount">
                    </div>
                    <div class="col-5">
                        <span class="h3">Date</span>
                        <input v-model="input_date" type="date" class="form-control bg-my border-dark text-white" placeholder="Date">
                    </div>
                    <div class="col-12 d-flex justify-content-center gap-3 mt-4">
                        <button @click="update=false" class="btn btn-outline-danger rounded-pill">Cancel</button>
                        <button @click="addRow" class="btn btn-outline-primary rounded-pill">Add entry</button>
                    </div>
                </div>

                <!-- Table -->
                <div v-else class="row mt-3">
                    <table v-if="data.operations" class="table table-dark table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Title</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="operation, idx, i in data.operations" :key="idx">
                                <th scope="row">{{i+1}}</th>
                                <td>{{operation.date}}</td>
                                <td>{{operation.amount}}</td>
                                <td>{{operation.title}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="col text-center p-5 fs-5">Your debtnote is empty</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>

.table-dark{
    --bs-table-bg: #1a1a1a;
    border-color: rgb(39, 39, 39);
}

</style>