<template>
  <div class="content">
    <div class="aside">

    </div>
    <div class="main">
      <div class="input-container">
        <el-input @keyup.enter="sendMessage" class="newMessage" v-model="message" placeholder="在此输入您的消息..." />
        <el-button class="btn" @click="sendMessage">发送</el-button>
    </div>
    <div class="chat-window">
      <!-- <div v-for="(message, index) in replyMsgList" :key="index" class="message">
        <div class="message-content">{{ message }}</div>
      </div> -->
      <!-- <textarea class="message" v-model="replyMsgList">
      </textarea> -->

      <div  class="message" >
        <div class="message-content">
          {{ replyMsgList }}
        </div>
      </div>

    </div>
    </div>
  </div>
  </template>
  
  <script>

  export default {
    name: 'ChatSmallObediently',
    data() {
        return {
            message: '',
            conversation:"",
            replyMsgList: ""
        }
    },
    methods: {
      sendMessage () {
            this.replyMsgList = ''
            // this.conversation += `You: ${this.message}\n`
            // this.conversation = `assistant:`
            const evtSource = new EventSource(`/api/chat_manage/message/stream?message=${this.message}`)
            evtSource.addEventListener('stream', (event) => {
                console.log('event.data', event.data)
                if(event.data !== 'small_obediently finished answering' && event.data !== '{}'){
                    this.replyMsgList += event.data
                }else{
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
  
  <style scoped lang="scss">
  .content{
    display: flex;
    height: 100vh;
    overflow: hidden;
    .aside{
      width: 200px;
      height: 100%;
      border-right: 1px solid #ccc;
      background-color: #f4f4f4;
      overflow: hidden;
      overflow-y: auto;
    }
    .main{
      flex:1;
      height: 100%;
      padding: 16px;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .chat-window{
        flex:1;
        overflow-y: auto;
      }
    }
  }
  .chat-window {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    .message {
      margin-bottom: 16px;
      .message-content {
        background-color: #eee;
        padding: 8px;
        border-radius: 8px;
      }
    }
    .el-input__inner {
      border:none
    }    
  
  };
  .input-container {
    display: flex;
    align-items: center;
    margin-top: 16px;
    .newMessage{
      width: 300px;
      margin-right: 16px
    }
    }
  </style>
  <style lang="scss">
.el-input__inner {
    border:none!important
  }
</style>