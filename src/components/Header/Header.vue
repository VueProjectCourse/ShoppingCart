<template>
  <div class="header">
    <h1>购物车案例</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
.header {
  height: 46px;
  font-size: 12px;
  background-color: #1d7bff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.header h1 {
  margin: 0;
  color: #fff;
  text-align: center;
  line-height: 46px;

}
</style>