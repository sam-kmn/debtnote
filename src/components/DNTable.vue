<script setup>
import {defineProps, ref, computed } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({operations:Object})

const store = useStore()
const state = computed(()=> store.getters.getNote)


const total = ref(0)
if (props.operations){
    for (let operation in props.operations){
        let amount = parseInt(props.operations[operation].amount, 10)
        total.value = total.value + amount
    }
}

function rowClick(idx){
    store.state.note.activeRow = idx
    store.state.note.activeComp = 'row'
}


</script>

<template>
    <!-- <div class="row justify-content-center mb-2">
        <div class="col-2 p-2 fs-4 bg-my border border-dark">Total</div>
        <div class="col-2 p-2 fs-4 bg-my border border-dark">{{total}}</div>
    </div> -->
    <table v-if="props.operations" class="table table-dark table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th v-if="state.activeType === 'all'" scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Title</th>
            </tr>
        </thead>
        <tbody>
            <tr class="fs-5" v-show="operation.type === state.activeType || state.activeType==='all'" v-for="operation, idx, i in props.operations" :key="idx" @click="rowClick(idx)">
                <th scope="row">{{i+1}}</th>
                <td v-if="state.activeType === 'all'">
                    <i v-if="operation.type === 'in'" class="bi bi-box-arrow-in-left success"></i>
                    <i v-if="operation.type === 'out'" class="bi bi-box-arrow-right danger"></i>
                </td>
                <td>{{operation.date}}</td>
                <td>{{operation.amount}}</td>
                <td>{{operation.title}}</td>
            </tr>
        </tbody>
    </table>
    
    <div v-else class="col text-center p-5 fs-5">Your debtnote is empty</div>
</template>

<style lang='scss' scoped>

.table-dark{
    --bs-table-bg: #1a1a1a;
    border-color: rgb(39, 39, 39);
}

</style>