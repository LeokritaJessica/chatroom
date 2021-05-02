<template>
  <div class="container">
    <div class="wrapper">
      <div>
        <h1>Join Chatroom</h1>
        <div>
          <input v-model="username" type="text" placeholder="Username" />
        </div>
        <div>
          <input v-model="roomId" type="text" placeholder="RoomID" />
        </div>
      </div>
      <button @click="join">JOIN</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      roomId: "",
    };
  },
  sockets: {
    validated(validated) {
      if (validated) {
        this.$emit("join", this.username, this.roomId);
        this.$socket.emit("joinRoom", {
          username: this.username,
          roomId: this.roomId,
        });
      } else {
        this.$toast.open({
          message: "username already use it in this room",
          type: "error",
          position: "top",
          duration: 10000,
          dismissible: true,
          queue: true,
        });
      }
    },
  },
  methods: {
    join() {
      if(this.username !== '' && this.roomId !== ''){
        this.$socket.emit("validation", {
          username: this.username,
          roomId: this.roomId,
        });
      }else{
         this.$toast.open({
          message: "username and roomId cannot be empty",
          type: "error",
          position: "top",
          duration: 10000,
          dismissible: true,
          queue: true,
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  max-height: 100%;
  padding: 30px 0px;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  font-weight: 400px;
  margin-bottom: 2.5rem;
  text-align: center;
}
input {
  background-color: #f6f6f6;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  padding: 15px 10px;
  margin-bottom: 1.5rem;
  width: 100%;
  height: clamp(4rem, 7vh, 4.5rem);
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  text-align: left;
}

input::placeholder {
  color: #bdbdbd;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
}

input:focus {
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
}

button {
  background-color: #5db075;
  color: white;
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  font-weight: 600;
  width: 100%;
  height: clamp(1.5rem, 7vh, 3rem);
  border-radius: 100px;
  border: none;
  transition: 0.2s ease-out;
  align-self: flex-end;
}

button:hover {
  background-color: #4b9460;
  transition: 0.2s ease-out;
  cursor: pointer;
}

@media screen and (max-width: 650px) {
  .wrapper {
    width: 100%;
  }
}
</style>
