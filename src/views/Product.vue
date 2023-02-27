<template>
  <div class="loading" v-show="data.isLoading">
    <Loading></Loading>
  </div>
  <div class="product" v-show="!data.isLoading">
    <div class="product-list" :class="{hidden:store.state.isFullscreen}">
        <h1><SketchOutlined></SketchOutlined>产品推荐</h1>
        <div class="products">
            <div class="product-item" v-for="item,index in data.products" 
            @click="changeModel(item,index)"
            :class="{active:index==data.pIndex}">
            <div class="product-title">
                {{ item.title }}
            </div>
            <div class="img">
                <img :src="item.imgsrc" alt="">
            </div>
            <a-button type="primary" block @click.stop="addBuycart(item)">jiaru</a-button > 
            </div>
        </div>
    </div>
      
    <div class="scene-list" :class="{hidden:store.state.isFullscreen}">
        <h1><RadarChartOutlined></RadarChartOutlined>切换场景</h1>
        <div class="scenes">
            <div class="scene-item" v-for="item,index in data.scene" 
            @click="changeScene(item,index)" >
                <img :src="`./files/hdr/${item}.jpg`" alt=""
                :class="{active:index==data.sceneIndex}">
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import { getProducts } from "../network/home";

import Loading from "../components/loading.vue";
import { SketchOutlined,RadarChartOutlined } from "@ant-design/icons-vue";
const route=useRoute();
const store=useStore();
const data=reactive({
    products:[],
    isLoading:true,
    scene:[],
    pIndex:0,
    sceneIndex:0,
})
onMounted(async()=>{
    let result=await getProducts();
    console.log(result);
    data.isLoading=false;
    data.products=result.list;
    data.scene=result.hdr;
    console.log(data.products);
})

function changeModel(item,index){
    data.pIndex=index
}
function changeScene(item,index){
    data.sceneIndex=index
}
function addBuycart(prod){
    let product ={...prod,num :1}
    let a=0
    let isExist=store.state.buycarts.some((item,i)=>{
        if(product.id==item.id){
            a=i
            return true
        }else{
            return false
        }
    })
    if (isExist) {
        store.commit('addBuycartsNum', a)    
    }else{
        store.commit('addBuycarts',product) 
    }
    
}
window.addEventListener('mousewheel',(e)=>{
    if(e.deltaY>0){
        store.commit('setFullscreen',true)
    }
    if(e.deltaY<0){
        store.commit('setFullscreen',false)
    }
})
</script>

<style lang="less" scoped>
.product-list{
    width: 300px;
    height: 100vh;
    padding: 60px 0 0;
    position: fixed;
    z-index: 1000;
    transition: all 0.5;
    background-color: rgba(255, 255, 255, 0.8);
    left: 0;
    top: 0;
    h1{
        font-size: 20px;
        font-weight: 900;
        padding: 10px 25px 0;
    }
        .products{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .product-item{
                display: flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                width: 250px;
                background-color: white;
                border-radius: 20px;
                overflow: hidden;
                margin: 10px 0;
                box-shadow: 5px 5px 10px #666;
                transition: all 0.3s;
                &.active{
                    box-shadow: 5px 5px  10px #666,0 0 20px red;
                }
                &:hover{
                transform: translate(0,-5px);
                // background-color: yellow;
                box-shadow: 5px 5px  10px #666,0 0 20px orangered;
                        }
            }
            img{
                width: 190px;
            }
            .product-title{
                padding: 0 20px;
            }
        }
}

.product-list.hidden{
    transform: translate(-100%,0);
}

.scene-list{
    width: 300px;
    height: 100vh;
    padding: 60px 0 0;
    position: fixed;
    z-index: 1000;
    transition: all 0.5;
    background-color: rgba(255, 255, 255, 0.8);
    right: 0;
    top: 0;
    h1{
        font-size: 20px;
        font-weight: 900;
        padding: 10px 25px 0;
    }
    .scenes{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .scene-item{
        padding: 6px 0;
       
        img{
            width: 250px;
            border-radius: 10px;
            box-shadow: 5px 5px 10px #666;
            transition: all 0.3s;
            &.active{
                    box-shadow: 5px 5px  10px #666,0 0 20px red;
                }
            &:hover{
                transform: translate(0,-5px);
                // background-color: yellow;
                box-shadow: 5px 5px  10px #666,0 0 20px orangered;
                    }
        }
    }
} 
.scene-list.hidden{
    transform: translate(100%,0);
}
</style>