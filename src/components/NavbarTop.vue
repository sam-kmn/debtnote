<template>
    <nav class="navbar navbar-dark bg-black">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <router-link to="/" class="white">
                    <img src="../assets/debtnote-icon.png" alt="" width="30"  class="d-inline-block align-text-top">
                    <span class="ms-2 fw-normal">Debtnote</span>
                </router-link>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="navbar-nav me-auto my-2 gap-1">

                    <router-link class="nav-item" to="/dash">
                        <i class="bi bi-wallet2"></i>
                        Dash</router-link>

                    <router-link class="nav-item" to="/borrow">
                        <i class="bi bi-box-arrow-in-left"></i>
                        Borrow</router-link>

                    <router-link class="nav-item" to="/lend">
                        <i class="bi bi-box-arrow-right"></i>
                        Lend</router-link>

                    <router-link class="nav-item" to="/friends">
                        <i class="bi bi-people"></i>
                        Friends</router-link>

                    <router-link class="nav-item" to="/settings">
                        <i class="bi bi-gear"></i>
                        Settings</router-link>
                    
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

.nav-item{
        padding-left: 1rem;
        font-size: 1.3rem;
        text-decoration: none;
        color: white;
}

.router-link-active{
    // color: #6610f2 !important;
    font-weight: bold;
}

</style>