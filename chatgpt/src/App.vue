<template>
  <div class="top">
      <input v-model="message" class="input" placeholder="  请输入您的问题" />
      <div class="btn" @click="sendMessage">Send</div>
    </div>
    <div v-for="(item, index) in list" :key="index" class="container">
      <textarea v-if="item.type == 'start'" class="start" v-model="item.msg">
      </textarea>
      <textarea v-else class="end" v-model="item.msg" >
      </textarea>
    </div>
</template>

<script>

export default {
  data() {
    return {
      message: '',
      conversation: "",
      list: [{
        type: 'start',
        msg: '开始'
      },
      {
        type: 'end',
        msg: '结束'
      }]
    }
  },
  methods: {
    sendMessage() {
      // this.conversation += `\n我: ${this.message}\n`
      this.list.push({
        type: 'start',
        msg: `\n我: ${this.message}\n`
      })

      this.conversation += `智能小乖乖:`
      const evtSource = new EventSource(`/api/chat_manage/message/stream?message=${this.message}`)
      evtSource.addEventListener('stream', (event) => {
        console.log('event.data', event.data, new Date().getTime())
        if (event.data !== '!!!!' && event.data !== '{}') {
          this.conversation += event.data
          this.list.push({
            type: 'end',
            msg: this.conversation
          })
          console.log("11111", event.data, "3333333")
        } else {
          this.conversation += '\n'
          evtSource.close()
        }
      })
      evtSource.onerror = function (err) {
        console.error('EventSource failed:', err)
        evtSource.close()
      }
    },
  }
}
</script>


<style>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 48px;
}

/* .top div {
  width: 100%;
  height: 100%;
} */

.input {
  width: 100%;
  height: 42px;
}

.button {
  padding: 25px 10px;
  border: none;
  height: 100%;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  height: 46px;
}

.start {
  /* width:30%; */
  display: flex;
  justify-content: flex-start;
  background-color: aliceblue;
}

.end {
  /* width:30%; */
  display: flex;
  justify-content: flex-end;
  background-color: #4caf50;
}
.btn{
  width:100px;
  text-align: center;
  height:46px;
  line-height: 46px;
  background: #4caf50;
  font-size: 16px;
  margin-left: 10px;
}
</style>
