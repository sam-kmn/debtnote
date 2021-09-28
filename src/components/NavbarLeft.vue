

<template>
    <div id="sidebar" class="containter bg-black">
        <nav class="nav flex-column">

            <router-link to="/" class="d-flex align-items-center justify-content-center m-3">
                <img src="../assets/debtnote-icon.png" alt="" width="30" height="30"  class="d-inline-block">
                <span class="ms-2 white" style="font-size: 1.5rem;">Debtnote</span>
            </router-link>

            <div class="d-flex flex-column ms-4 mt-3 white fs-5">

                <router-link  to="/dash">
                    <i class="bi bi-wallet2"></i>
                    Dash</router-link>

                <router-link  to="/borrow">
                    <i class="bi bi-box-arrow-in-left"></i>
                    Borrowed</router-link>

                <router-link  to="/lend">
                    <i class="bi bi-box-arrow-right"></i>
                    Lended</router-link>

                <router-link  to="/friends">
                    <i class="bi bi-people"></i>
                    Friends</router-link>

                <router-link class="fixed-bottom ms-4" to="/settings">
                    <i class="bi bi-gear"></i>
                    Settings</router-link>
            </div>

        </nav>
    </div>
</template>

<style lang="scss" scoped>

#sidebar{
    // width: 15rem;
    height: 100vh;
    // background: rgb(53,54,58);
    a{
        color: white !important;
        margin-bottom: .7rem !important;
    }
    .router-link-active{
        font-weight: bold;
    }
}

</style>