// 导入获取列表数据的 API
import { getCartListAPI } from '@/api/cartAPI'

const moduleCart = {
  // 1.1 开启命名空间
  namespaced: true,
  // 1.2 数据
  state: () => ({
    // 购物车列表数据，默认为空数组
    cartlist: []
  }),
  mutations: {
    // 更新购物车数据
    updateCartList(state, payload) {
      state.cartlist = payload;
    },
    // 更新购物车状态
    updateGoodsState(state, payload) {
      console.log(payload)
      state.cartlist.forEach(element => {
        if (element.id === payload.id) {
          element.goods_state = !element.goods_state
        }
      });
    },
    // 更新商品的购买数量
    updateGoodsCount(state,payload){
      state.cartlist.forEach(item=> {
        // 找到 对应的 那件 商品
         if (item.id === payload.id) {
           item.goods_count = payload.value;
           return true;
         }
      })
    }
  },
  actions: {
    async initCartList(ctx) {
      console.log(ctx)
      // 请求接口数据
      const { data: res } = await getCartListAPI();

      if (res.status === 200) {
        // TODO： 触发 Mutation 方法， 把请求到的数据转交给 Mutation 方法， 最终存储到 state 之中
        ctx.commit('updateCartList', res.list);

        console.log(ctx.state.cartlist)
      }
    }
  }
}

export default moduleCart
