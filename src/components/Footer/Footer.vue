<template>
  <div class="footer">
    <!-- 左侧的复选框 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" :checked="isFullChecked" class="custom-control-input" @change="updateAllGoodsState({e:$event})" id="fullcheck" />
      <label class="custom-control-label" for="fullcheck" >全选</label>
    </div>
    <!-- 中间的合计 -->
    <div>
      <span>合计：</span>
      <span class="price">&yen;{{ amount }}</span>
    </div>

    <!-- 右侧结算按钮 -->
    <button class="btn btn-primary btn-settle">结算（{{ total }}）</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
  name: 'Footer',
  computed: {
    ...mapGetters('cart', ['isFullChecked', 'amount', 'total'])
  },
  methods: {
    ...mapMutations('cart', ['updateAllGoodsState']),
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  background-color: white;
  height: 50px;
  border-top: 1px solid #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  padding: 0 10px;
  box-sizing: border-box;
}

.price {
  color: red;
  font-size: 13px;
  font-weight: bold;
}

.btn-settle {
  height: 40px;
  min-width: 100px;
  border-radius: 20px;
}
</style>