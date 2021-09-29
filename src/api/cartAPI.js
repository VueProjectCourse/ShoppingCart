import request from '../utils/request'

// 获取购物车列表数据的方法
export const getCartListAPI = () => {
  return request.get('/api/cart')
}