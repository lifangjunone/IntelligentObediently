<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div class="list">
    <ul v-for="(item, index) in arr">
        <li :key="index">{{ item }}</li>
    </ul>
  </div>
  <div class="btn">
    <button @click="btn">点击</button>
  </div>
</template>

<script>
export default {
    setup() {
        let msg = "你好"
        const arr = [1, 2, 3, 4]
        function btn() {
            msg = "牛逼"
            console.log(msg);
        }
        return { msg, arr, btn }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul {
    list-style: none;
}
.hello h1 {
    text-align: center;
}
.list  {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 60px;
    
}
.list ul{
    flex: 25%;
    height: 100%;
    margin-bottom: 5px;
    background-color: green;
}
.list ul li {
    text-align: center;
    line-height: 60px;
}
.btn {
    margin: 8px auto; 
    width: 100px;
    height: 50px;
}
.btn button {
    display: inline-block;
    height: 100%;
    width: 100%;
}
</style>
