<template>
  <div id="app">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
// 导入Header组件
import Header from './components/Header/Header.vue'
import Main from './components/Main/Main.vue'
import Footer from './components/Footer/Footer.vue'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  },
  computed: {
   
  },
  methods: {
    ...mapActions('cart',['initCartList'])
  },

  created(){
    this.initCartList();
  }
  
}
</script>

<style>

html,body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

</style>
