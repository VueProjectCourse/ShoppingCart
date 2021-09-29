# ShoppingCart

## 1. 安装并配置 vuex

1. 运行如下的命令安装 vuex：

   ```bash
   npm i vuex@3.6.2 -S
   ```

2. 在 `src` 目录下新建 `store` 文件夹，并在 `src/store` 目录下新建 `index.js` 模块：

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   
   // 1. 把 Vuex 安装为 Vue 的插件
   Vue.use(Vuex)
   
   // 2. 创建 store 实例
   const store = new Vuex.Store({
     // 注册模块
     modules: {},
   })
   
   // 3. 向外共享 store 实例
   export default store
   ```

3. 在 `main.js` 入口文件中，导入并挂载 store 模块：

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   // 1. 导入 store 模块
   import store from '@/store/index'
   
   Vue.config.productionTip = false
   
   new Vue({
     render: h => h(App),
     // 2. 挂载 store
     store,
   }).$mount('#app')
   ```

## 2. 配置购物车模块

1. 在 `@/store/` 目录下新建 `cart.js` 购物车模块：

   ```js
   // 1. 定义购物车模块
   const moduleCart = {
     // 1.1 开启命名空间
     namespaced: true,
     // 1.2 数据
     state: () => ({})
   }
   
   // 2. 向外共享购物车模块
   export default moduleCart
   
   ```

2. 在 `@/store/index.js` 模块中，导入并注册购物车模块：

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   // 1. 导入购物车模块
   import moduleCart from './cart'
   
   Vue.use(Vuex)
   
   const store = new Vuex.Store({
     modules: {
       // 2. 注册购物车模块
       cart: moduleCart,
     },
   })
   
   export default store
   ```

## 3. 定义请求数据的 API 模块

1. 运行如下的命令，安装 `axios`：

   ```bash
   npm i axios@0.21.1 -S
   ```

2. 在 `/src/` 目录下新建 `api` 文件夹，并在 `src/api/` 目录下新建 `request.js` 模块：

   ```js
   import axios from 'axios'
   
   // 创建 axios 的实例对象
   const instance = axios.create({
     baseURL: 'https://www.escook.cn',
   })
   
   export default instance
   ```

3. 在 `/src/api/` 目录下新建 `cartAPI.js` 模块，并定义请求购物车数据的 API 方法：

   ```js
   import request from './request'
   
   // 获取购物车列表数据的方法
   export const getCartListAPI = () => {
     return request.get('/api/cart')
   }
   ```

## 4. 请求购物车列表数据

### 4.1 定义请求列表数据的 Action 方法

1. 在 `@/store/cart.js` 模块中，导入需要的 API 接口，并定义如下的 Action 方法：

   ```js
   // 导入获取列表数据的 API
   import { getCartListAPI } from '@/api/cartAPI'
   
   const moduleCart = {
     actions: {
       async initCartList(ctx) {
         // 请求接口数据
         const { data: res } = await getCartListAPI()
         if (res.status === 200) {
           // TODO：触发 Mutation 方法，把请求到的数据转交给 Mutation 方法，最终存储到 state 之中
         }
       },
     },
   }
   ```

### 4.2 定义转存数据的 Mutation 方法

1. 在 `@/store/cart.js` 模块中，定义名为 `cartlist` 的 State 数据：

   ```js
   const moduleCart = {
     namespaced: true,
     state: () => ({
       // 购物车列表数据，默认为空数组
       cartlist: []
     }),
   }
   ```

2. 在 `@/store/cart.js` 模块中，定义名为 `updateCartList` 的 Mutation 方法：

   ```js
   const moduleCart = {
     namespaced: true,
     mutations: {
       // 更新购物车
       updateCartList(state, payload) {
         // 把接收到的数据，存储到 state.cartlist 中
         state.cartlist = payload
       },
     },
   }
   ```

3. 在 Action 中调用 `ctx.commit()` 方法，触发名为 `updateCartList` 的 Mutation 方法，把请求到的数据转存到 state 之中：

   ```js
   actions: {
     // 初始化购物车列表的数据
     async initCartList(ctx) {
       const { data: res } = await getCartListAPI()
       if (res.status === 200) {
         // TODO：触发 Mutation 方法，把请求到的数据转交给 Mutation 方法，最终存储到 state 之中
         ctx.commit('updateCartList', res.list)
       }
     }
   },
   ```

### 4.3 在 App 根组件中调用 Action 方法

1. 在 `App.vue` 根组件中，按需导入 `mapActions` 辅助函数：

   ```js
   import { mapActions } from 'vuex'
   ```

2. 在 `App.vue` 根组件的 methods 节点下，调用 `mapActions` 辅助函数，把名为 `initCartList` 的 Action 方法映射为当前组件的 methods：

   ```js
   methods: {
     // 映射需要的 Action 方法
     ...mapActions('cart', ['initCartList']),
   },
   ```

3. 在 `App.vue` 根组件的 `created` 生命周期函数中，调用映射过来的 `initCartList` 方法：

   ```js
   created() {
     // 初始化列表的数据
     this.initCartList()
   },
   ```

## 5. 循环渲染商品信息

1. 在 `App.vue` 组件中按需导入 `mapState` 辅助函数：

   ```js
   // 按需导入辅助函数
   import { mapActions, mapState } from 'vuex'
   ```

2. 在 `App.vue` 组件的 `computed` 节点下，调用 `mapState` 辅助函数，把需要的数据映射为当前组件的计算属性：

   ```js
   computed: {
     // 把购物车列表的数据，映射为当前 App.vue 组件的计算属性
     ...mapState('cart', ['cartlist']),
   }
   ```

3. 在 `App.vue` 组件的模板结构中，通过 `v-for` 指令，循环渲染商品信息组件：

   ```xml
   <!-- 商品 Item 项组件 -->
   <es-goods v-for="item in cartlist"
             :key="item.id"
             :id="item.id"
             :title="item.goods_name"
             :thumb="item.goods_img"
             :price="item.goods_price"
             :count="item.goods_count"
             :state="item.goods_state"
             @stateChange="getState"
             @countChange="getCount"
             >
   </es-goods>
   ```

## 6. 变更商品的选中状态

1. 在 `@/store/cart.js` 模块中，声明名为 `updateGoodsState` 的 Mutation 方法，用来变更指定商品的选中状态：

   ```js
   // 更新商品的选中状态
   updateGoodsState(state, payload) {
     state.cartlist.some(x => {
       // 找到了对应的商品
       if (x.id === payload.id) {
         // 变更这件商品的选中状态
         x.goods_state = payload.value
         // 结束循环
         return true
       }
     })
   },
   ```

2. 在 `App.vue` 组件中，按需导入 `mapMutations` 辅助函数：

   ```js
   // 按需导入辅助函数
   import { mapState, mapActions, mapMutations } from 'vuex'
   ```

3. 在 `App.vue` 组件的 `methods` 节点下调用 `mapMutations` 函数，把需要的 Mutation 方法映射到当前的组件中：

   ```js
   methods: {
     // 映射指定模块中，需要的 Mutation 方法
     ...mapMutations('cart', ['updateGoodsState']),
   }
   ```

4. 在 `es-goods` 组件的 `stateChange` 事件中，调用映射过来的 `updateGoodsState` 方法：

   ```js
   // 商品的选中状态发生了变化
   getState(e) {
     // {id: 1, value: false}
     this.updateGoodsState(e)
   }
   ```

## 7. 变更商品的购买数量

1. 在 `@/store/cart.js` 模块中，声明名为 `updateGoodsCount` 的 Mutation 方法，用来变更指定商品的购买数量：

   ```js
   // 更新商品的购买数量
   updateGoodsCount(state, payload) {
     state.cartlist.some(x => {
       // 找到了对应的那件商品
       if (x.id === payload.id) {
         x.goods_count = payload.value
         return true
       }
     })
   },
   ```

2. 在 `App.vue` 组件的 `methods` 节点下调用 `mapMutations` 函数，把需要的 Mutation 方法映射到当前的组件中：

   ```js
   methods: {
     ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount']),
   }
   ```

3. 在 `es-goods` 组件的 `countChange` 事件中，调用映射过来的 `updateGoodsCount` 方法：

   ```js
   // 商品的数量发生了变化
   getCount(e) {
     // {id: 1, value: 2}
     this.updateGoodsCount(e)
   },
   ```

## 8. 动态计算全选的状态

1. 在 `@/store/cart.js` 模块中，声明名为 `isFullCheck` 的 Getter，用来动态计算全选的状态：

   ```js
   // 定义购物车模块
   const moduleCart = {
     // 1.5 计算属性
     getters: {
       // 商品是否被全选了
       isFullCheck(state) {
         // 使用数组的 every 方法进行判断
         return state.cartlist.every(item => item.goods_state)
       },
     },
   }
   ```

2. 在 `Footer.vue` 组件中按需导入 `mapGetters` 辅助函数：

   ```js
   import { mapGetters } from 'vuex'
   ```

3. 并在 `computed` 节点下进行调用，把需要的 Getter 映射到当前组件中：

   ```js
   export default {
     name: 'EsFooter',
     computed: {
       // 把 cart 模块中的 isFullCheck 映射为当前组件的计算属性
       ...mapGetters('cart', ['isFullCheck']),
     },
   }
   ```

4. 在 `Footer.vue` 组件的模板结构中，动态地为复选框绑定 `checked` 属性的值：

   ```xml
   <input type="checkbox" class="custom-control-input" id="fullcheck" :checked="isFullCheck">
   ```

## 9. 动态计算已勾选商品的总价格

1. 在 `@/store/cart.js` 模块中，声明名为 `amount` 的 Getter，用来动态计算已勾选商品的总价格：

   ```js
   getters: {
     // 已勾选商品的总价格
     amount(state) {
       let amt = 0
       state.cartlist
         .filter(x => x.goods_state)
         .forEach(x => {
           amt += x.goods_price * x.goods_count
         })
   
       return amt
     },
   }
   ```

2. 在 `Footer.vue` 组件中，通过 `mapGetters` 辅助函数，映射需要的 Getter：

   ```js
   export default {
     name: 'EsFooter',
     computed: {
       ...mapGetters('cart', ['isFullCheck', 'amount']),
     },
   }
   ```

3. 在 `Footer.vue` 组件的模板结构中，动态渲染总价格：

   ```xml
   <span class="price">￥{{amount}}</span>
   ```

## 10. 动态计算已勾选商品的总数量

1. 在 `@/store/cart.js` 模块中，声明名为 `total` 的 Getter，用来动态计算已勾选商品的总数量：

   ```js
   getters: {
     // 已勾选商品的总数量
     total(state) {
       let t = 0
       state.cartlist.filter(x => x.goods_state).forEach(x => (t += x.goods_count))
       return t
     },
   }
   ```

2. 在 `Footer.vue` 组件中，通过 `mapGetters` 辅助函数，映射需要的 Getter：

   ```js
   export default {
     name: 'EsFooter',
     computed: {
       ...mapGetters('cart', ['isFullCheck', 'amount', 'total']),
     },
   }
   ```

3. 在 `Footer.vue` 组件的模板结构中，动态渲染总数量：

   ```xml
   <button class="btn btn-primary btn-settle">结算（{{total}}）</button>
   ```

## 11. 全选功能

1. 在 `Footer.vue` 组件中，为复选框绑定 `change` 事件处理函数：

   ```jsx
   <input type="checkbox" class="custom-control-input" id="fullcheck" :checked="isFullCheck" @change="onStateChange">
     
   methods: {
     // 监听复选框选中状态变化的事件
     onStateChange(e) {
       // 获取最新的选中状态
       console.log(e.target.checked)
     }
   }
   ```

2. 在 `@/store/cart.js` 模块中，声明名为 `updateAllGoodsState` 的 Mutation，用来变更所有商品的选中状态：

   ```js
   const moduleCart = {
     mutations: {
       // 更新所有商品的选中状态
       updateAllGoodsState(state, payload) {
         // 循环每一件商品，并更新其选中状态
         state.cartlist.forEach(x => {
           x.goods_state = payload.value
         })
       },
     }
   }
   ```

3. 在 `Footer.vue` 组件中，按需导入 `mapMutations` 辅助函数：

   ```js
   import { mapGetters, mapMutations } from 'vuex'
   ```

4. 在 `Footer.vue` 组件的 `methods` 节点下，调用 `mapMutations` 函数，映射需要的 Mutation 方法：

   ```js
   export default {
     name: 'EsFooter',
     methods: {
       ...mapMutations('cart', ['updateAllGoodsState']),
     },
   }
   ```

5. 在 `Footer.vue` 组件的 methods 节点下，找到 `onStateChange` 事件处理函数，调用映射过来的 `updateAllGoodsState` 方法：

   ```js
   // 监听复选框选中状态变化的事件
   onStateChange(e) {
     // 更新所有商品的选中状态
     this.updateAllGoodsState({ value: e.target.checked })
   }
   ```
