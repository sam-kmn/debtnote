<template>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <router-link to="/" class="white">
                    <img src="../assets/DN_icon.png" alt="" width="30"  class="d-inline-block align-text-top">
                    Debtnote
                </router-link>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto my-2">

                    <li class="nav-item">
                        <router-link to="/dash">Strona główna</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/borrow">Dług</router-link>
                    </li>
                    
                    <li class="nav-item">
                        <router-link to="/lend">Pozyczone</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/friends">Znajomi</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

.nav-item{
    a{
        padding-left: 1rem;
        font-size: 1.3rem;
        text-decoration: none;
        color: white;
    }
}

.router-link-active, .router-link-exact-active{
    color: #6610f2 !important;
}

</style>