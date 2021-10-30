    
<script setup>
// import X from '@/components/X.vue'
import { defineProps } from 'vue'
const props = defineProps({code:String})
    
</script>
    
<template>
    <div class="containter">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 p-3 text-center">
                <div v-if="props.code=='401'">
                    <div class="col-12 fs-4 fw-bold">This debtnote is private</div>
                    <div class="col-12 fs-6">You are not authorized to see note</div>
                    <img class="col-8 mt-5" src="../assets/401.svg" style="object-fit: cover;"  alt="404 error">
                </div>
                <div v-if="props.code=='404'">
                    <div class="col-12 fs-4 fw-bold">This debtnote doesn't exists</div>
                    <div class="col-12 fs-6">Make sure you typed URL right</div>
                    <img class="col-8 mt-5" src="../assets/404.svg" style="object-fit: cover;"  alt="404 error">
                </div>

            </div>
        </div>
    </div>
    
</template>
    
<style lang="scss" scoped>
    
</style>