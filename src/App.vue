<template>
  <div id="app">
    <Login v-if="username === '' && roomId === ''" @join="join" />
    <Chatroom v-else :username='username' :roomId='roomId' @exit="exit"/>
  </div>
</template>

<script>
import Chatroom from "./components/Chatroom.vue";
import Login from "./components/Login.vue";

export default {
  name: "App",
  data() {
    return {
      username: "",
      roomId: "",
    };
  },
  components: {
    Login,
    Chatroom,
  },

  methods: {
    join(username, roomId) {
      this.username = username;
      this.roomId = roomId;
    },
    exit() {
      this.username = "";
      this.roomId = "";
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");
* {
  font-family: "Inter", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
h1 {
  font-size: clamp(1.5rem, 3vw, 3.5rem);
  line-height: 36.31px;
}
</style>
