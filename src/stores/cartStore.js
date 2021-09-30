// 导入获取列表数据的 API
import { getCartListAPI } from '@/api/cartAPI'

const cartStore = {
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
      // 把接收到的数据，存储到 state.cartlist 中
      state.cartlist = payload;
    },
    // 更新购物车状态
    updateGoodsState(state, payload) {
      state.cartlist.forEach(element => {
        if (element.id === payload.id) {
          element.goods_state = !element.goods_state
        }
      });
    },
    // 更新商品的购买数量
    updateGoodsCount(state, payload) {
      // console.log(payload)
      state.cartlist.forEach(item => {
        // 找到 对应的 那件 商品
        if (item.id === payload.id) {
          //  item.goods_count = payload.value;
          if (payload.type === 'minus') {
            item.goods_count > 0 ? item.goods_count -= 1 : 0;
          } else if (payload.type === 'add') {
            item.goods_count >= 0 ? item.goods_count += 1 : 0;
          }
          return true;
        }
      })
    },
    // 全选功能
    updateAllGoodsState(state, payload) {
      // console.log(payload)
      state.cartlist.forEach(item => {
        item.goods_state = payload.e.target.checked;
      })
    }
  },
  actions: {
    async initCartList(ctx) {
      // 请求接口数据
      const { data: res } = await getCartListAPI();

      if (res.status === 200) {
        // TODO： 触发 Mutation 方法， 把请求到的数据转交给 Mutation 方法， 最终存储到 state 之中
        ctx.commit('updateCartList', res.list);
      }
    }
  },
  getters: {
    // 商品是否全选
    isFullChecked(state) {
      return state.cartlist.every(item => item.goods_state)
    },
    // 已勾选商品的总价格
    amount(state) {
      let amt = 0;
      state.cartlist.filter(x => x.goods_state).forEach(x => {
        amt += x.goods_count * x.goods_price
      })

      return amt;
    },
    // 动态计算已勾选的商品总数量
    total(state) {
      let t = 0;
      state.cartlist.filter(x => x.goods_state).forEach(x => {
        t += x.goods_count
      })
      return t;
    }
  }
}

export default cartStore
