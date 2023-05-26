<template>
  <div class="content">
    <div class="aside">

    </div>
    <div class="main">
      <div class="chat-window">
        <div class="message" v-for="(item ,index) in replyMsgList" :key="index">
         <div v-if="item.type==='question'" class="message-send">
            <img class='message-img' src="../assets/头像.svg">
            <div>{{ item.value }}</div>
          </div>
          <div v-if="item.type==='answer'" class="message-content">
            <img class='message-img' src="../assets/头像4.svg">
            <div>{{ item.value }}</div>
          </div> 
        </div>
      </div>
      <div class="input-container">
        <el-input
          class="newMessage"
          v-model="message" 
          placeholder="在此输入您的消息..." 
          @keyup.enter="sendMessage"
        >
        <template #append>
          <svg  @click="sendMessage" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
            stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
      </template>
    </el-input>
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
      conversation: "",
      replyMsgList: [],
      userMessage: ""
    }
  },
  methods: {
    sendMessage() {
      if(!this.message){
        return
      }
      this.replyMsgList.push({
        type:'question',
        value:this.message
      })
      this.userMessage = this.message
      let replyMsgList =''
      let obj ={
            type:'answer',
            value:replyMsgList
          }
      this.replyMsgList.push(obj)
      const evtSource = new EventSource(`/api/chat_manage/message/stream?message=${this.message}`)
      this.message=''
      evtSource.addEventListener('stream', (event) => {
        console.log('event.data', event.data)
        
        if (event.data !== 'small_obediently finished answering' && event.data !== '{}') {
          obj.value+=event.data
          this.$forceUpdate()

        } else {
          console.log('结束')
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
.content {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .aside {
    width: 200px;
    height: 100%;
    border-right: 1px solid #ccc;
    background-color: #f4f4f4;
    overflow: hidden;
    overflow-y: auto;
  }

  .main {
    flex: 1;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .chat-window {
      flex: 1;
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
      padding: 15px;
      border-radius: 8px;
      border: #ccc solid 1px;
      display: flex;
      .message-img{
        width: 30px;
        height: 30px;
        margin-right: 20px;
        div{
          padding-top: 15px;
        }
      }
    }
    .message-send {
      background-color: white;
      padding: 15px;
      border-radius: 8px;
      border: #ccc solid 1px;
      display: flex;
      .message-img{
        width: 30px;
        height: 30px;
        margin-right: 20px;
        div{
          padding-top: 15px;
        }
      }
    }
  }

  .el-input__inner {
    border: none
  }

}


.input-container {
  display: flex;
  align-items: center;
  margin-top: 16px;
  justify-content: center;
  padding:180px;
  .newMessage {
    width: 100%;
    margin-right: 16px;
    :deep(.el-input__wrapper){
      width: 100%;
    }
  }
}
:deep(.input-container){
  .el-input__inner {
  border-left: none !important;
  border-right: none !important;
  border-radius: 0px!important;
  border:none!important
}
}

</style>
<style lang="scss">
.el-input__inner {
  border-left: none !important;
  border-right: none !important;
  border-radius: 0px!important;
}</style>