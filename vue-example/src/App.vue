<template>
  <HelloWorld :titles="titles" @changeItem="change"></HelloWorld>
  <p>{{ contents[currIndex] }}</p>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      currIndex: 0,
      titles: ['鞋子', '衣服', '袜子'],
      contents: ['鞋子内容', '衣服内容', '袜子内容']
    }
  },
  methods: {
    change(index) {
      this.currIndex = index
    }
  }
}


</script>

<style>
p {
  height: 400px;
  text-align: center;
  line-height: 400px;
  font-size: 35px;
}
</style>
