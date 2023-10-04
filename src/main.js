import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import "@/assets/style.css";
// import InputMask from "vue-input-mask";
import VueTheMask from "vue-the-mask";

const app = createApp(App);
app.use(VueTheMask);
app.use(store).use(router).mount("#app");
