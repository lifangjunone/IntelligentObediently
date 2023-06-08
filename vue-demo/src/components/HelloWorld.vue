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
  <table class="info">
    <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>爱好</th>
    </tr>
    <tr v-for="(item, index) in info" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.hobby}}</td>
    </tr>
  </table>
</template>

<script>
import {ref, reactive} from 'vue'
export default {
    setup() {
        let msg = ref("你好")
        const arr = ref([1, 2, 3, 4])
        const info = reactive([
            {
                name: "张三",
                age: 18,
                sex: "男",
                hobby: ['打篮球', '游泳', '吹牛逼']
            },
            {
                name: "李四",
                age: 28,
                sex: "男",
                hobby: ['打游戏', '聊天', '吹牛逼']
            },
            {
                name: "梅艳芳",
                age: 34,
                sex: "女",
                hobby: ['拍电影', '喝酒', '唱歌']
            },
        ])
        function btn() {
            if (msg.value==='你好') {
                msg.value = "牛逼"
            }else {
                msg.value = "你好"
            }
            arr.value = [5, 6, 7, 8]
        }
        return { msg, arr, btn, info }
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
