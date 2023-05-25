<template>
  <div class="container">
    <div class="top">
      <input v-model="message" class="input" />
      <button @click="sendMessage">Send</button>
    </div>
    <div class="middle">
      <textarea v-model="conversation" readonly></textarea>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: '',
      conversation: ""
    }
  },
  methods: {
    sendMessage() {
      this.conversation += `\nYou: ${this.message}\n`
      this.conversation += `assistant:`
      const evtSource = new EventSource(`/api/chat_manage/message/stream?message=${this.message}`)
      evtSource.addEventListener('stream', (event) => {
        console.log('event.data', event.data,new Date().getTime())
        if (event.data !== '!!!!') {
          this.conversation += event.data
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
.container {
  width: 680px;
  margin: 50px auto;
  border: 1px solid #ccc;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 48px;
}

.top div {
  width: 100%;
  height: 100%;
}

.input {
  width: 100%;
  height: 42px;
}

button {
  padding: 5px 10px;
  border: none;
  height: 100%;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #3e8e41;
}

.middle textarea {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
}</style>
