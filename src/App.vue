<script setup>
import NavbarTop from '../src/components/NavbarTop.vue'
</script>

<template>
    <navbar-top class="d-md-none" />
    <router-view/>
</template>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-icons/font/bootstrap-icons.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,700;1,100;1,300;1,400;1,700&display=swap');
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Poppins";
}

a{
    text-decoration: none !important;
}

.white{
    color: white !important;
}

</style>
