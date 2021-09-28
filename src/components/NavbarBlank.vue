<template>
    <nav class="navbar navbar-dark bg-black">
        <div class="container">

            <router-link to="/" class="white navbar-brand">
                <img src="../assets/debtnote-icon.png" alt="" width="30"  class="d-inline-block align-text-top">
                <span class="ms-2 fw-normal">Debtnote</span>
            </router-link>

            <div>
                
                <router-link to="/register" class="btn btn-sm btn-outline-light rounded-pill">
                    Sign Up
                </router-link>

                <router-link to="/login" class="btn btn-sm btn-light rounded-pill ms-3">
                    Sign In
                </router-link>

            </div>

        </div>
    </nav>
</template>
