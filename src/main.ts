import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// vue-router
import router from './router';

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// pinia
import store from './store/index';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App)
app.use(vuetify)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount("#app");
