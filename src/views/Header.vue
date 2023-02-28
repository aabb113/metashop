<template>
    <div class="header" :class="{hidden:store.state.isFullscreen}">
        <div class="logo" @click="router.push('/Scene')">
            <img src="../assets/imgs/a.jpg" alt="logo">
        </div>
        <a-input-search
        v-model:value="data.value"
        placeholder="input search text"
        class="input-search"
        @search="onSearch"
        />

        <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="mail">
        <template #icon>
            <mail-outlined />
        </template>
        帮助
        </a-menu-item>
        <a-menu-item key="app" disabled>
        <template #icon>
            <appstore-outlined />
        </template>
        用户
        </a-menu-item>
        <a-sub-menu key="sub1">
        <template #icon>
            <setting-outlined />
        </template>
        <template #title>购物车</template>
        <a-menu-item-group title="购物车">
            <a-menu-item v-for="item,index in store.state.buycarts">
                <div class="prod-item">
                    <div class="left">
                        <img :src="item.imgsrc" alt="">
                    </div>
                    <div class="middle">
                        <div class="title">{{ item.title }}</div>
                        <div class="content">
                            <span class="num">数量：{{ item.num }}</span>
                            <div class="control">
                                <span class="btn"  @click.stop="store.commit('addBuycartsNum', index)">+</span>
                                <span class="btn" @click.stop="store.commit('minusBuycartsNum', index)">-</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="price">${{ item.num*item.price }}</div>
                    </div>
                </div>
            </a-menu-item>
        </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item key="alipay">
        <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
            选项
      </a>
    </a-menu-item>
  </a-menu>
        
    </div>
  
</template>

<script setup>
import { reactive } from "vue";
import { useRoute,useRouter } from "vue-router";
import { useStore } from "vuex";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
const router=useRouter()
const store=useStore();
const data=reactive({
    value:"",
    current:["help"],
})

const onSearch=()=>{} 

</script>

<style lang="less" scoped>

.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10000;
    width: 100%;
    background-color: white;
    box-shadow: 0 0 10px white;
}
.logo{
    margin-right: 40px;
    img{
        height: 30px;
    }
}

.input-search{
    display: flex;
    flex: 1;
    height: 40px;
    align-items: center;
}

.hidden{
    transform: translate(100%,0);
}


</style>