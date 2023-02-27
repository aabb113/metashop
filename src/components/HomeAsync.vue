<template>
    <div class="homepage">
        <HomeSwiper></HomeSwiper>
        <div class="live">
            <h1>开始</h1>
            <div class="live-list">
                <div class="live-item">

                </div>
            </div>
            <a-button type="primary" size="large" @click="router.push('/product')">go</a-button>
        </div>
    </div>
</template>

<script setup>

import HomeSwiper from "../components/HomeSwiper.vue";
import { reactive } from "vue";

import { useRouter } from "vue-router";
import { getHomepage } from "../network/home";

const router=useRouter();

let result=await getHomepage();
const hero=reactive(result.hero);

console.log(hero)
</script>

<style lang="less" scoped>
.homepage{
padding-top: 46px;
}

.live{
    align-items: center;
    width: 1200px;
    margin: 40 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
        font-size: 30px;
    }

}
</style>