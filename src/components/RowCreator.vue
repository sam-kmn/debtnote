    
<script setup>
// import X from '@/components/X.vue'
// import { defineProps } from 'vue'
// const props = defineProps({})

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import {ref, computed, defineProps} from 'vue'
const props = defineProps({ user:String, id:String })

import { useStore } from 'vuex'
const store = useStore()
const state = computed(()=> store.getters.getNote)

const input_amount = ref(0)
const input_title = ref('')
const input_desc = ref('')

const input_date = ref('')
let d = new Date()
input_date.value = d.toISOString().split('T')[0]

function addRow(){
    if (input_title.value, input_amount.value)
        firebase.database().ref(`users/${props.user}/notes/${props.id}/operations/${state.value.activePage}`).push({
            'title': input_title.value,
            'amount': input_amount.value,
            'desc': input_desc.value,
            'date': input_date.value})
            .then(()=> store.state.note.activeComp = 'table')
            .catch(error => alert(error.message))
}
</script>
    
<template>
    <div class="container">
        <div class="row mt-3 justify-content-center">
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
    </div>
</template>
    
<style lang="scss" scoped>
    
</style>