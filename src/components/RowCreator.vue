    
<script setup>

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import {ref, computed, defineProps} from 'vue'
const props = defineProps({ user:String, id:String })

import { useStore } from 'vuex'
const store = useStore()
const state = computed(()=> store.getters.getNote)
const input = ref({
    title: '',
    desc: '',
    date: '',
    amount: 1,
    type: 'out'
})

if (state.value.activeType === 'in') input.value.type = 'in';

let d = new Date()
input.value.date = d.toISOString().split('T')[0]

if (state.value.activeRow){
    const rowRef = firebase.database().ref(`users/${props.user}/notes/${props.id}/operations/${state.value.activeRow}`)

    rowRef.once('value', snap => {
        if (snap.val()) {
            let data = snap.val()
            input.value = {
                title: data.title,
                desc: data.desc,
                date: data.date,
                amount: data.amount,
                type: data.type
            }
        } else console.error('RowDetails: Unable to fetch data');
    })
}

function addRow(){
    if (input.value.title && input.value.amount){

        const path = firebase.database().ref(`users/${props.user}/notes/${props.id}/operations`)
        if (state.value.activeRow){
            path.child(state.value.activeRow).set(input.value)
                .then(()=> store.state.note.activeComp = 'table')
                .catch(error => alert(error.message))
        } else {
            path.push(input.value)
                .then(()=> store.state.note.activeComp = 'table')
                .catch(error => alert(error.message))
        }
    }
}

function deleteRow(){
    firebase.database().ref(`users/${props.user}/notes/${props.id}/operations/${state.value.activeRow}`).remove()
        .then(cancel())
        .catch(err => alert(err))
}

function cancel(){
    let d = new Date()
    input.value = {
        title: '',
        desc: '',
        amount: 1,
        date: d.toISOString().split('T')[0]
    }
    store.state.note.activeComp='table'
    store.state.note.activeRow=''
}

</script>
    
<template>
    <div class="container-fluid p-0">
        <form class="row mt-5 justify-content-center ">
            <!-- Title & Type -->
            <div class="col-11 mb-3 d-flex justify-content-between align-items-end">
                <div class="col-5">
                    <span class="h3">Title</span>
                    <input required v-model="input.title" type="text" class="mt-1 form-control bg-my border-dark text-white" maxlength="10" placeholder="Max 10 characters.">
                </div>

                <div class="col-5 d-flex flex-column">
                    <span class="h3">Type</span>
                    <div class="d-flex gap-3">

                        <button class="btn  btn-outline-success" @click="input.type='in'" :class="{ 'btn-success': input.type==='in', 'text-white': input.type==='in' }" >
                            In <i class="bi bi-box-arrow-in-left"></i>
                        </button>

                        <button class="btn btn-outline-danger" @click="input.type='out'" :class="{ 'btn-danger': input.type==='out', 'text-white': input.type==='out' }">
                            Out <i class="bi bi-box-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Description -->
            <div class="col-11 mb-3">
                <span class="h3">Description</span>
                <input v-model="input.desc" type="text" class="mt-1 form-control bg-my border-dark text-white" maxlength="30" placeholder="Max 30 characters.">
            </div>
            <!-- Amount -->
            <div class="col-6">
                <span class="h3">Amount</span>
                <input v-model="input.amount" type="text" class="mt-1 form-control bg-my border-dark text-white" placeholder="Amount">
            </div>
            <!-- Date -->
            <div class="col-5">
                <span class="h3">Date</span>
                <input v-model="input.date" type="date" class="mt-1 form-control bg-my border-dark text-white" placeholder="Date">
            </div>
            <!-- Buttons -->
            <div class="col-12 d-flex justify-content-center gap-3 mt-4">
                <button type="button" @click="cancel" class="btn btn-outline-secondary rounded-pill">Cancel</button>
                <button type="submit" v-if="state.activeRow" @click="deleteRow" class="btn btn-outline-danger rounded-pill">Delete</button>
                <button type="submit" @click="addRow" class="btn btn-outline-primary rounded-pill">
                    <span v-if="state.activeRow">Update</span>
                    <span v-else>Add</span>
                </button>
            </div>
        </form>
    </div>
</template>
    
<style lang="scss" scoped>
    
</style>