<template>
  <div class="scene" id="scene"></div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import Base3d from "../utils/Base3d";

const data=reactive({
    base3d:{},
})

onMounted(()=>{
    data.base3d=new Base3d('#scene')
})
</script>

<style>

</style>