<template>
  <Suspense>
    <template #fallback>
      <div class="loading">
        <Loading></Loading>
      </div>
    </template>
    <template #default>
      <HomeAsync></HomeAsync>
    </template>
  </Suspense>
</template>

<script setup>

import Loading from "../components/loading.vue";
import { onMounted,defineAsyncComponent } from "vue";


const HomeAsync=defineAsyncComponent(()=>
import("../components/HomeAsync.vue"))


onMounted(async()=>{
});



</script>

<style>

</style>