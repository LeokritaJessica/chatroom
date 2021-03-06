<template>
  <div class="container">
    <div class="header-wrapper">
      <div class="side">
        <h4 @click="exit">Exit</h4>
      </div>
      <h1>{{ roomId }}</h1>
      <div class="side" />
    </div>
    <div ref="chatWrapper" class="chat-wrapper">
      <div v-for="(msg, index) in messages" :key="index">
        <div v-if="msg.username === 'ChatroomBot'" class="chat-bot">
          <p>
            {{ msg.text }}
          </p>
        </div>
        <div v-else-if="msg.username !== username" class="chat-left">
          <span>{{ msg.username }}</span>
          <div class="talk-bubble-left tri-left btm-left">
            <div class="talktext">
              <p>
                {{ msg.text }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="chat-right">
          <div class="talk-bubble-right tri-right btm-right">
            <div class="talktext">
              <p>{{ msg.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="message-wrapper">
      <input
        ref="messageBox"
        v-model="message"
        type="text"
        placeholder="Message here..."
        @keypress.enter="chatMessage"
      />
      <button @click="chatMessage">
        <fa :icon="['fas', 'arrow-up']" size="sm" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chatroom",
  props: ["username", "roomId"],
  data() {
    return {
      message: "",
      messages: [],
    };
  },
  sockets: {
    connect() {
      console.log("new connection");
    },
    message(msg) {
      this.messages.push(msg);
      this.$nextTick(() => {
        const el = this.$refs.chatWrapper;
        el.scrollTop = el.scrollHeight;
        this.$refs.messageBox.focus();
      });
      // console.log(msg);
    },
  },
  methods: {
    chatMessage() {
      if (this.message !== "") {
        this.$socket.emit("chatMessage", this.message);
        this.message = "";
      }
    },
    exit() {
      this.$socket.emit("exitRoom");
      this.$emit("exit");
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header-wrapper {
  width: 100%;
  padding: 30px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.side {
  flex-grow: 1;
  flex-basis: 0;
}

h4 {
  color: #5db075;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
}

h4:hover {
  cursor: pointer;
}

h1 {
  font-weight: 600;
  flex-grow: 2;
}

.chat-wrapper {
  margin: 0px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  overflow: auto;
}
.chat-wrapper span {
  font-size: 12px;
  margin-left: 5px;
}

.chat-bot {
  margin-top: 5px;
  font-size: 10px;
  display: flex;
  justify-content: center;
}

.chat-bot p {
  background-color: #bdbdbd;
  padding: 8px;
  border-radius: 10px;
  color: white;
}

.chat-left {
  display: flex;
  flex-direction: column;
}

.chat-right {
  display: flex;
  justify-content: flex-end;
}

.talk-bubble-left {
  display: inline-block;
  position: relative;
  max-width: 250px;
  width: auto;
  height: auto;
  background-color: #f6f6f6;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  align-self: flex-start;
  overflow-wrap: break-word;
  margin-bottom: 20px;
}

.talk-bubble-right {
  display: inline-block;
  position: relative;
  max-width: 250px;
  width: auto;
  height: auto;
  background-color: #5db075;
  border: 1px solid #4b9460;
  color: white;
  border-radius: 10px;
  align-self: flex-end;
  overflow-wrap: break-word;
  margin-bottom: 20px;
}

.tri-left.btm-left:before {
  content: " ";
  position: absolute;
  left: -1px;
  bottom: -22px;
  border: 20px solid;
  border-color: transparent transparent transparent #e8e8e8;
}
.tri-left.btm-left:after {
  content: " ";
  position: absolute;
  top: auto;
  bottom: -20px;
  border: 20px solid #e8e8e8;
  border-color: transparent transparent transparent #f6f6f6;
}

.tri-right.btm-right:before {
  content: " ";
  position: absolute;
  left: auto;
  right: -1px;
  bottom: -19px;
  border: 15px solid;
  border-color: #4b9460 #4b9460 transparent transparent;
}

.tri-right.btm-right:after {
  content: " ";
  position: absolute;
  left: auto;
  right: 0px;
  bottom: -19px;
  border: 15px solid;
  border-color: #5db075 #5db075 transparent transparent;
}

.talktext {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  padding: 1em;
  text-align: left;
  line-height: 1.5em;
}
.talktext p {
  /* remove webkit p margins */
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0em;
}

.message-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
}

input {
  background-color: #f6f6f6;
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  padding: 15px 55px 15px 18px;
  margin-bottom: 1.5rem;
  width: 100%;
  height: clamp(3rem, 8vh, 3rem);
  border: 1px solid #e8e8e8;
  border-radius: 100px;
  text-align: left;
}

input::placeholder {
  color: #bdbdbd;
  font-size: clamp(0.8rem, 2.5vw, 1rem);
}

input:focus {
  outline: none;
  border: 1px solid black;
  border-radius: 100px;
}

button {
  position: absolute;
  background-color: #5db075;
  color: white;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 100%;
  right: 35px;
  top: 10px;
  font-size: 17px;
}

@media screen and (max-width: 650px) {
  .container {
    width: 100%;
  }
}
</style>
