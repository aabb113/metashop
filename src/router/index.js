import { 
    createRouter,
    createWebHashHistory,
 } from  "vue-router";

 import Home from "../views/Home.vue";
 import About from "../views/About.vue";
 import Buycart from "../views/Buycart.vue";
 import Product from "../views/Product.vue";
 import Scene from "../views/Scene.vue";

 //定义路由，配置路径

 const routes=[
    {path:"/",component:Home,name:"home"},
    {path:"/About",component:About,name:"about"},
    {path:"/Buycart",component:Buycart,name:"buycart"},
    {path:"/Product",component:Product,name:"product"},
    {path:"/Scene",component:Scene,name:"scene"},
 ];

 //创建路由实例并“routes”配置
 const router=createRouter({
    history:createWebHashHistory(),
    routes,
 })

 export default router