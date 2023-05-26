<template>
  
  <h1>ChatGPT Webpage</h1>
  <div class="chat-container" id="chatContainer"></div>
  <input type="text" id="userInput" placeholder="Type your message..." />
  <button onclick="sendMessage()">Send</button>
</template>

  <script>

  export default {
    methods: {
      // JavaScript 代码，用于与 ChatGPT 进行交互

    // 创建一个数组来保存对话记录

    // 获取用户输入的消息，并将其显示在聊天容器中
    sendMessage() {
      var userInput = document.getElementById("userInput").value;
      this.appendMessage("user", userInput);

      // 调用后端 API 或其他方法，将用户输入发送到 ChatGPT，并获得响应
      var botResponse = this.getBotResponse(userInput);

      // 将机器人的回复显示在聊天容器中
      this.appendMessage("bot", botResponse);

      // 清空用户输入框
      document.getElementById("userInput").value = "";
    },

    // 将消息追加到聊天容器中
    appendMessage(sender, message) {
      var chatContainer = document.getElementById("chatContainer");
      var messageElement = document.createElement("p");
      messageElement.className = sender + "-message";
      messageElement.innerHTML = "<strong>" + sender + ":</strong> " + message;
      chatContainer.appendChild(messageElement);

      // 将聊天容器滚动到底部，以显示最新消息
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },

    // 调用后端 API 或其他方法，将用户输入发送到 ChatGPT，并获得机器人的回复
    getBotResponse() {
      // 在此处添加与 ChatGPT 交互的逻辑，例如使用 AJAX 请求发送用户输入并接收响应
      // 这里只是一个示例，需要根据具体的后端实现进行更改
      var botResponse = "This is a sample response from the bot.";
      return botResponse;
    }
    }
  }
    
  </script>

<style>
    /* CSS 样式，用于布局和外观 */
    .chat-container {
      height: 400px;
      overflow: auto;
      border: 1px solid #ccc;
      padding: 10px;
    }
    .user-message {
      color: blue;
    }
    .bot-message {
      color: green;
    }
  </style>