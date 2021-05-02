import Vue from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import socketio from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

//Socketio
export const SocketInstance = socketio("https://chatrom-api.herokuapp.com/");
// export const SocketInstance = socketio("http://localhost:3000");
Vue.use(
  new VueSocketIO({
    connection: SocketInstance,
  })
);

//VueToast
Vue.use(VueToast);

//Favicon
library.add(faArrowUp);
Vue.component("fa", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
