import { createApp } from "vue";
import App from "./App.vue";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import all of Bootstrap's JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.esm";

import { createPinia } from "pinia";
import router from "./routers";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
const app = createApp(App);
library.add(faPhone);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
