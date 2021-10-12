<script setup>
// import X from '@/components/X.vue'
import { computed, defineProps, ref,  watchEffect,  } from 'vue'
const props = defineProps({user:String, id:String})

import { useStore } from 'vuex'
const store = useStore()
const noteState = computed(()=> store.getters.getNote)

const data = ref({})
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

function fetchData(){
    const rowRef = firebase.database().ref(`users/${props.user}/notes/${props.id}/operations/${noteState.value.activePage}/${noteState.value.activeRow}`)
    
    rowRef.once('value', snap => {
        if (snap.val()) data.value = snap.val()
        else console.error('RowDetails: Unable to fetch data')
    })
    
}
watchEffect(()=> fetchData())

</script>
    
<template>
    <div v-if="data" class="container">
        
    </div>
</template>
    
<style lang="scss" scoped>
    
</style>