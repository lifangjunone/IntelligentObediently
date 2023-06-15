<template>
  <div class="navbar">
    <div 
      class="navbar-item"
      v-for="(item, index) in titles" 
      :class="{ active: currentIndex === index}" 
      :key="item"
      @click="clickItem(index)">
      <!-- 动态绑定 class -->
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>


export default {
  props: ['titles'],
  emits: ['changeItem'],
  data() {
    return {
      currentIndex: Number
    }
  },
  methods: {
    clickItem(index) {
      this.currentIndex = index
      this.$emit('changeItem', index)
    },

  }
}

</script>

<style scoped>

.navbar {
  display: flex;
  margin-top: 15px;
  font-size: 25px;
}

.navbar .navbar-item {
  flex: 1;
  text-align: center;
}

.active  span{
  color: red;
  border-bottom: 3px solid red;
}

</style>
