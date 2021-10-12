<script setup>
import NoteCreator from '../components/NoteCreator.vue'
import DNTable from '../components/DNTable.vue'
import RowDetails from '../components/RowDetails.vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import {computed, defineProps, ref} from 'vue'
const props = defineProps({ user:String, id:String })


import { useStore } from 'vuex'
const store = useStore()
store.commit('resetNote')
const user = computed(()=> store.getters.getUser)
const state = computed(()=> store.getters.getNote)

const data = ref()
const loading = ref(true)
const error = ref(0)

const input_amount = ref(0)
const input_title = ref('')
const input_desc = ref('')

const input_date = ref('')
let d = new Date()
input_date.value = d.toISOString().split('T')[0]

firebase.database().ref(`/users/${props.user}/notes/${props.id}`).on('value', snap=> {
    if (snap.val()){
        if (snap.val().type==='public') { data.value = snap.val() }
        else if (snap.val().type==='private') {
            if (user.value.name){
                if ( user.value.name === props.user) { data.value = snap.val() }
                else {
                    if (snap.val().members){
                        let members = Object.values(snap.val().members)
                        if (members.includes(user.value.name)) { data.value = snap.val() }
                        else { error.value = 401 }
                    } else { error.value = 401 }
                }
            } else { error.value = 401 }
        }
    } else { error.value = 404 }
    loading.value = false
})


function addRow(){
    if (input_title.value, input_amount.value)
        firebase.database().ref(`users/${user.value.name}/notes/${props.id}/operations/${state.value.activePage}`).push({
            'title': input_title.value,
            'amount': input_amount.value,
            'desc': input_desc.value,
            'date': input_date.value})
            .then(()=> store.state.note.activeComp = 'table')
            .catch(error => alert(error.message))
}


// function deleteRow(){
//     firebase.database().ref(`users/${user.value.name}/notes/${props.id}/operations/${active_row.value}`).remove()
//         .catch(error => alert(error.message))  
// }

</script>


<template>
    <div class="container">
        <div v-if="loading" class="row justify-content-center p-5">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="row justify-content-center ">
            <div v-if="data" class="col-12 col-md-10 col-lg-7 col-xl-6 p-3">

                <!-- Navbar -->
                <div class="row justify-content-between align-items-center">
                    <!-- Note name -->
                    <div class="col d-flex align-items-center">
                        <span class="h2 me-2">{{data.name}}</span>
                        <i v-if="data.type==='public'" class="bi bi-unlock fs-3"></i>
                        <i v-if="data.type==='private'" class="bi bi-lock fs-3"></i>
                    </div>

                    <!-- Paginantion out/in -->
                    <div class="col">
                        <nav>
                            <ul class="pagination pagination-sm m-0">

                                <li class="page-item" :class="{ active: state.activePage=='out' }">
                                    <a @click="store.state.note.activePage = 'out'" class="page-link" href="#">Out</a>
                                </li>

                                <li class="page-item" :class="{ active: state.activePage=='in' }">
                                    <a @click="store.state.note.activePage = 'in'" class="page-link" href="#">In</a>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>

                    <!-- Add / Settings -->
                    <div class="col-auto d-flex gap-3 fs-2">
                        <!-- <div @click="deleteRow"><i class="bi bi-dash-circle hover-danger"></i></div> -->
                        <div @click="store.state.note.activeComp='update'"><i class="bi bi-plus-circle hover"></i></div>
                        <div @click="store.state.note.activeComp='settings'"><i class="bi bi-gear hover"></i></div>
                    </div>

                </div>

                <!-- {{state}} -->
                
                <!-- Update (add row) compontent -->
                <div v-if="state.activeComp==='update'" class="row mt-3 justify-content-center ">
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
                        <button @click="store.state.note.activeComp='table'" class="btn btn-outline-danger rounded-pill">Cancel</button>
                        <button @click="addRow" class="btn btn-outline-primary rounded-pill">Add row</button>
                    </div>
                </div>
                <!-- Table -->
                <div v-if="state.activeComp==='table' && data.operations" class="row mt-3">
                    <DNTable v-if="state.activePage=='out' && data.operations.out" :operations='data.operations.out'  />
                    <DNTable v-if="state.activePage=='in' && data.operations.in" :operations='data.operations.in' />    
                </div>

                <!-- Empty table -->
                <div v-if="state.activeComp==='table' && !data.operations" class="col text-center p-5 fs-5">This debtnote is completely empty</div> 

                <div v-if="state.activeComp==='settings'" class="mt-3">
                    <NoteCreator :user="props.user" :id="props.id" >
                        Edit this note
                    </NoteCreator>
                </div>

                <!-- Row -->
                <div v-if="state.activeComp==='row'">
                    <RowDetails />
                </div>

            </div>
            <!-- Errors -->
            <div v-else class="col-12 col-md-8 col-lg-6 p-3 text-center">
                <div v-if="error==401">
                    <div class="col-12 fs-4 fw-bold">This debtnote is private</div>
                    <div class="col-12 fs-6">You are not authorized to see note</div>
                    <img class="col-8 mt-5" src="../assets/401.svg" style="object-fit: cover;"  alt="404 error">
                </div>
                <div v-if="error==404">
                    <div class="col-12 fs-4 fw-bold">This debtnote doesn't exists</div>
                    <div class="col-12 fs-6">Make sure you typed URL right</div>
                    <img class="col-8 mt-5" src="../assets/404.svg" style="object-fit: cover;"  alt="404 error">
                </div>

            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>

.page-link{
    background-color: #1a1a1a;
    border-color: #313131;
}
.page-item.active .page-link{
    color: black;
}
</style>