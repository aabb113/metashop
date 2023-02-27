import { createStore } from "vuex";

const store=createStore({
    state(){
        return{
            isFullscreen:false,
            buycarts:[],
        }
    },
    mutations:{
    setFullscreen(state,playload){
        state.isFullscreen=playload
    },
    addBuycarts(state,playload){
        state.buycarts.push(playload)
    },
    addBuycartsNum(state,playload){
        state.buycarts[playload].num++
    },
    minusBuycartsNum(state,playload){
        state.buycarts[playload].num--
        if(state.buycarts[playload].num==0){
            state.buycarts.splice(playload,1)
        }
    }
    },
    getters:{
        totalPrice(state){
            let total=state.buycarts.reduce((pre,item)=>{
                 return pre+item.price*item.num
            })
            return total
        }
    }

})

export default store