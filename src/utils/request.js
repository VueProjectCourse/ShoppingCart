import axios from 'axios'
   
// 创建 axios 的实例对象
const instance = axios.create({
  baseURL: 'https://www.escook.cn',
})

export default instance