<template>
  <div class="main">
    <div class="goods-item" v-for="item in cartlist" :key="item.id">
      <!-- 左侧图片区域 -->
      <div class="left">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            :id="item.id"
            :checked="item.goods_state"
            @change="updateGoodsState({id:item.id, checked: item.goods_state})"
          />
          <label class="custom-control-label" :for="item.id">
            <img :src="item.goods_img" class="avatar" alt />
          </label>
        </div>
      </div>
      <!-- 右侧商品区域 -->
      <div class="right">
        <!-- 标题 -->
        <div class="title">{{ item.goods_name }}</div>
        <div class="info">
          <!-- 单价 -->
          <span class="price">&yen;{{ item.goods_price }}</span>
          <div class="btns">
            <!-- 按钮区域 -->
            <button class="btn btn-light" @click="updateGoodsCount({id: item.id,type:'minus'})">-</button>
            <span class="count">{{ item.goods_count }}</span>
            <button class="btn btn-light" @click="updateGoodsCount({id: item.id, type:'add'})">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'Main',
  data(){
    return {}
  },
  methods: {
    // 映射指定模块中，需要的 Mutation 方法
    ...mapMutations('cart',['updateGoodsState','updateGoodsCount'])
  },
  computed: {
     // 把购物车列表的数据，映射为当前 Main.vue 组件的计算属性
    ...mapState('cart', ['cartlist'])
  },

}
</script>

<style scoped>
.main {
  padding-top: 50px;
  padding-bottom: 50px;
}
.goods-item {
  display: flex;
  padding: 10px;
  border-top: 1px solid #f8f8f8;
}

.left {
  margin-right: 10px;
}
.left .avatar {
  width: 100px;
  height: 100px;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.right .title {
  font-weight: bold;
}
.right .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right .price {
  color: red;
  font-weight: bold;
}
.right .count {
  display: inline-block;
  width: 30px;
  text-align: center;
}
.custom-control-label::before,
.custom-control-label::after {
  top: 3.6rem;
}
</style>