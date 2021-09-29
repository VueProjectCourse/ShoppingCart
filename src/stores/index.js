import Vue from 'vue'
import Vuex from 'vuex'
// 1. 导入购物车模块
import cartStore from './cartStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // 2. 注册购物车模块
    cart: cartStore,
  },
})

export default store