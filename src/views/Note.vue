<script setup>
import NoteCreator from '../components/NoteCreator.vue'
import RowCreator from '../components/RowCreator.vue'
import DNTable from '../components/DNTable.vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

import {computed, defineProps, ref} from 'vue'
const props = defineProps({ user:String, id:String })

import { useRouter } from 'vue-router'
const router = useRouter()

import { useStore } from 'vuex'
const store = useStore()
store.commit('resetNote')
const user = computed(()=> store.getters.getUser)
const state = computed(()=> store.getters.getNote)

const data = ref()
const loading = ref(true)


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
                        else { router.push('/error/401') }
                    } else { router.push('/error/401') }
                }
            } else { router.push('/error/401') }
        }
    } else { router.push('/error/404') }
    loading.value = false
})


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
                    <div class="col d-flex align-items-center overflow-scroll">
                        <i v-if="data.type==='public'" class="bi bi-unlock fs-3"></i>
                        <i v-if="data.type==='private'" class="bi bi-lock fs-3"></i>
                        <div class="col h3 m-0 ">{{data.name}}</div>
                    </div>

                    <!-- Paginantion out/in -->
                    <div v-if="state.activeComp != 'update'" class="col">
                        <nav>
                            <ul class="pagination pagination-sm m-0">

                                <li class="page-item" :class="{ active: state.activeType=='in' }">
                                    <a @click="store.state.note.activeType = 'in'" class="page-link" href="#">In</a>
                                </li>

                                <li class="page-item" :class="{ active: state.activeType=='out' }">
                                    <a @click="store.state.note.activeType = 'out'" class="page-link" href="#">Out</a>
                                </li>

                                <li class="page-item" :class="{ active: state.activeType=='all' }">
                                    <a @click="store.state.note.activeType = 'all'" class="page-link" href="#">All</a>
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

                <!-- Table -->
                <div v-if="state.activeComp==='table' && data.operations" class="row mt-3">
                    <DNTable v-if="data.operations" :operations='data.operations'  />
                    <!-- <DNTable v-if="state.activeType=='in' && data.operations.in" :operations='data.operations.in' />     -->
                </div>

                <!-- Empty table -->
                <div v-if="state.activeComp==='table' && !data.operations" class="col text-center p-5 fs-5">This debtnote is completely empty</div> 

                <div v-if="state.activeComp==='settings'" class="mt-3">
                    <NoteCreator :user="props.user" :id="props.id" >
                        Edit this note
                    </NoteCreator>
                </div>

                <!-- Row Creator -->
                <div v-if="state.activeComp==='update'" >
                    <RowCreator :user="props.user" :id="props.id"/>
                </div>

                <!-- Row Focus -->
                <div v-if="state.activeComp==='row' && state.activeRow">
                    <RowCreator :user="props.user" :id="props.id" />
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