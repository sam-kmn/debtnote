<template>
    <div class="container-fluid">
        <section id="landing">
            <div class="row justify-content-center align-items-center mt-4 mt-md-5 pt-md-5" >
                
                <div class="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
                    <!-- Headline -->
                    <div class="col white text-center text-md-start h1 mb-3">Organize your debts!</div>
                    <!-- Sub SM -->
                    <div class="col-10 d-md-none white text-center">Free and simple web app that might help you organize your debts</div>
                    <!-- Sub LG -->
                    <div class="col d-none d-md-block white text-start mb-3">
                        Free, simple and reliable web app that might help you organize your debts. Easy to use, user-friendly interface. 
                        <br>Easy way to share with your friends, realtime synchronization with cloud</div>
                    <!-- Buttons -->
                    <div class="col d-none d-md-flex align-items-center justify-content-center gap-3">
                        <a href="#features" class="btn btn-outline-light rounded-pill py-1 px-2">Learn more</a>
                        <router-link to="/register" class="btn btn-primary rounded-pill py-1 px-2">Try now</router-link>
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div id="image" class="col
                    border-warning d-flex align-items-center justify-content-center" >
                    </div>

                    <div class="col d-md-none d-flex justify-content-center gap-3">
                        <router-link to="/register" class="btn btn-primary rounded-pill py-1 px-2">Try now</router-link>
                        <a href="#features" class="btn btn-outline-dark rounded-pill py-1 px-2">Learn more</a>
                    </div>
                </div>
                
            </div>
        </section>
        <section id="features">
            <div class="row mt-5" >
                <!-- SM -->
                <div class="col-12 d-md-none mt-5 d-flex justify-content-center align-items-center">
                    <!-- Control -->
                    <button class="btn" @click="activeCard-=1">
                        <i class="bi bi-arrow-left fs-2 white me-2"></i>
                    </button>
                    <!-- Card 1 -->
                    <div v-if="activeCard===1" class="card p-3 bg-dark" style="width: 18rem;">
                        <img src="../assets/sync.svg" class="card-img-top" alt="Unable to load image" height="150">
                        <div class="card-body text-center mt-2">
                            <h5 class="card-title ">Cloud Sync</h5>
                            <p class="card-text">With real time synchronization your data is available across all devices</p>
                        </div>
                    </div>
                    <!-- Card 2 -->
                    <div v-if="activeCard===2"  class="card p-3 bg-dark" style="width: 18rem;">
                        <img src="../assets/401.svg" class="card-img-top" alt="...">
                        <div class="card-body text-center mt-2">
                            <h5 class="card-title ">Permissions</h5>
                            <p class="card-text">Keep your notes secure with private mode</p>
                        </div>
                    </div>
                    <!-- Card 3 -->
                    <div v-if="activeCard===3" class="card p-3 bg-dark" style="width: 18rem;">
                        <img src="../assets/share.svg" class="card-img-top" alt="Unable to load image" height="150">
                        <div class="card-body text-center mt-2">
                            <h5 class="card-title ">Share</h5>
                            <p class="card-text">Easy way to share your debtnotes with other people. Just copy link</p>
                        </div>
                    </div>
                    <!-- Control -->
                    <button class="btn" @click="activeCard+=1">
                        <i class="bi bi-arrow-right fs-2 white ms-2"></i>
                    </button>

                </div>
                <!-- MD -->
                <div class="col-12 d-none d-md-flex justify-content-center gap-md-3 gap-lg-4 gap-xl-5">
                    <!-- Card 1 -->
                    <div class="card p-3 bg-dark" style="width: 18rem;">
                        <img src="../assets/sync.svg" class="card-img-top" alt="Unable to load image" height="150">
                        <div class="card-body text-center mt-2">
                            <h5 class="card-title ">Cloud Sync</h5>
                            <p class="card-text">With real time synchronization your data is available across all devices</p>
                        </div>
                    </div>
                    <!-- Card 2 -->
                    <div class="card p-3 bg-dark" style="width: 18rem;">
                        <img src="../assets/401.svg" class="card-img-top" alt="...">
                        <div class="card-body text-center mt-2">
                            <h5 class="card-title ">Permissions</h5>
                            <p class="card-text">Keep your notes secure with private mode</p>
                        </div>
                    </div>
                    <!-- Card 3 -->
                    <div class="card p-3 bg-dark" style="width: 18rem;">
                        <img src="../assets/share.svg" class="card-img-top" alt="Unable to load image" height="150">
                        <div class="card-body text-center mt-2">
                            <h5 class="card-title ">Share</h5>
                            <p class="card-text">Easy way to share your debtnotes with other people. Just copy link</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="row">
                <div class="col-12 col-md-5 p-3 p-md-5">
                    <span class="h3">FAQ</span>
                    <div class="accordion mt-2" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                What is private mode?
                            </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    There are two types of note permissions: <br>
                                    <i class="bi bi-lock"></i><strong> Private mode</strong> - Only you can see your note. <br>  
                                    <i class="bi bi-unlock"></i><strong> Public mode</strong> - Everyone can read and write.  
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Accordion Item #2
                            </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";


const activeCard = ref(1)
watchEffect(()=>{
    if (activeCard.value>3) activeCard.value=1
    else if (activeCard.value<1) activeCard.value=3
})

</script>

<style lang="scss" scoped>
@import "bootstrap/scss/_functions";
@import "bootstrap/scss/_variables";


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#image{
    background-image: url("../assets/Safari.png");
    // object-fit: cover;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 20rem;
}

.container-fluid{
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: calc(100vh - 57px);
    section{
        height: calc(100vh - 57px);
        scroll-snap-align: start;
        overflow: hidden;
        &:nth-of-type(1){
            background-image: radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),linear-gradient(90deg, rgb(34, 222, 237),rgb(135, 89, 215));
            // background-color: rgb(215, 233, 255);
            color: black;
            // background: linear-gradient(135deg,#20c997, #6610f2);
            // background-image: url("../assets/home_bg.svg");
            // background-size: cover;
            // background-repeat: no-repeat;
        }
        &:nth-of-type(2){
            background-image: radial-gradient(circle at center right, rgb(43, 36, 140) 0%, rgb(43, 36, 140) 64%,rgb(51, 30, 166) 64%, rgb(51, 30, 166) 80%,rgb(59, 23, 191) 80%, rgb(59, 23, 191) 86%,rgb(67, 17, 217) 86%, rgb(67, 17, 217) 92%,rgb(75, 10, 242) 92%, rgb(75, 10, 242) 100%);
            // background-image: radial-gradient(circle at 16% 83%, rgba(148, 148, 148,0.06) 0%, rgba(148, 148, 148,0.06) 50%,rgba(63, 63, 63,0.06) 50%, rgba(63, 63, 63,0.06) 100%),radial-gradient(circle at 68% 87%, rgba(66, 66, 66,0.06) 0%, rgba(66, 66, 66,0.06) 50%,rgba(105, 105, 105,0.06) 50%, rgba(105, 105, 105,0.06) 100%),radial-gradient(circle at 38% 50%, rgba(123, 123, 123,0.06) 0%, rgba(123, 123, 123,0.06) 50%,rgba(172, 172, 172,0.06) 50%, rgba(172, 172, 172,0.06) 100%),linear-gradient(90deg, hsl(18,0%,1%),hsl(18,0%,1%));
        }
        &:nth-of-type(3){
            background-image: linear-gradient(45deg, rgba(178, 48, 210, 0.45) 0%, rgba(178, 48, 210, 0.45) 1%,rgba(141, 39, 213, 0.45) 1%, rgba(141, 39, 213, 0.45) 57%,rgba(160, 43, 212, 0.45) 57%, rgba(160, 43, 212, 0.45) 63%,rgba(234, 62, 206, 0.45) 63%, rgba(234, 62, 206, 0.45) 72%,rgba(252, 67, 204, 0.45) 72%, rgba(252, 67, 204, 0.45) 73%,rgba(197, 53, 209, 0.45) 73%, rgba(197, 53, 209, 0.45) 80%,rgba(215, 58, 207, 0.45) 80%, rgba(215, 58, 207, 0.45) 99%,rgba(123, 34, 215, 0.45) 99%, rgba(123, 34, 215, 0.45) 100%),linear-gradient(135deg, rgb(18, 28, 87),rgb(79, 91, 237));
            // background-image: radial-gradient(circle at top left, rgb(53, 78, 205) 0%, rgb(53, 78, 205) 3%,rgb(53, 72, 194) 3%, rgb(53, 72, 194) 20%,rgb(54, 65, 183) 20%, rgb(54, 65, 183) 65%,rgb(54, 59, 172) 65%, rgb(54, 59, 172) 72%,rgb(55, 53, 160) 72%, rgb(55, 53, 160) 79%,rgb(55, 47, 149) 79%, rgb(55, 47, 149) 82%,rgb(56, 40, 138) 82%, rgb(56, 40, 138) 90%,rgb(56, 34, 127) 90%, rgb(56, 34, 127) 100%);
        }
    }
}

.accordion-item{
    border-color: black;
    .accordion-button{
        color: white;
        padding: 1rem;
        background-color: $dark;
    }
    .accordion-body{
        padding: 0.8rem;
        background-color: $dark;
    }
}

</style>