<template>
  <div class="main">
    <!-- 左侧图片区域 -->
    <div class="left">
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          :id="id"
          :checked="state"
          @change="onCheckedChange"
        />
        <label class="custom-control-label" :for="id">
          <img :src="thumb" class="avatar" alt />
        </label>
      </div>
    </div>
    <!-- 右侧商品区域 -->
    <div class="right">
      <!-- 标题 -->
      <div class="title">{{ title }}</div>
      <div class="info">
        <!-- 单价 -->
        <span class="price">￥{{ price }}</span>
        <div class="btns">
          <!-- 按钮区域 -->
          <button class="btn btn-light" @click="onBtnClick(-1)">-</button>
          <span class="count">{{ count }}</span>
          <button class="btn btn-light" @click="onBtnClick(1)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>

<style scoped>
.main {
  display: flex;
  padding: 10px;
  padding-top: 50px;
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