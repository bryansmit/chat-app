<template>
  <div class="flex flex-col mx-auto gap-2 max-w-2xl">
    <div class="flex flex-col justify-between p-4 gap-2">
      <input class="flex p-2 bg-gray-50" type="text" v-model="username" placeholder="What should we call you?">

      <div class="flex flex-col gap-2">
        <textarea class="flex p-2 bg-gray-50" type="text" v-model="newMessage" placeholder="Type your message here...">
        </textarea>
        <button class="p-2 bg-cyan-800 text-white" v-on:click="sendMessage(newMessage)">Send Message</button>
      </div>
    </div>

    <div class="flex flex-col-reverse p-4 gap-4">
      <div v-for="(message, index) in messages"
           :key="index"
           class="bg-gray-100 p-4 flex flex-col gap-1">
        <span class="text-gray-800 font-bold">{{ message.sender_name }}</span>
        {{ message.message }}
      </div>
    </div>
  </div>

</template>

<script>
import moment from 'moment';

export default {
  name: 'App',
  data: function () {
    return {
      username: '',
      newMessage: '',
      messages: [],
      connection: null
    };
  },
  methods: {
    sendMessage: function (message) {
      if (this.username === '' || this.username === null) {
        return alert('A username is required.');
      }

      const messageObj = {
        type: "chat_message",
        sender_name: this.username,
        message: message,
        sent_at: moment().format('YYYY-MM-DD HH:mm:ss')
      };

      this.connection.send(JSON.stringify(messageObj));
      this.onNewMessage(messageObj)
    },
    onNewMessage: function (message) {
      this.messages.push(message);
      this.newMessage = '';
    }
  },
  created: function () {
    this.connection = new WebSocket('ws://localhost:3001')

    this.connection.onmessage = ({data}) => {
      const message = JSON.parse(data);

      switch (message.type) {
        case 'chat_message':
          this.onNewMessage(message);
          break;
        case 'messages':
          this.messages = message.data;
          break;
      }
    };
  }
}
</script>
