import { createApp } from 'vue';
import { createPinia } from "pinia";
import './style.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

import LanguageResources from './language_resources';
import App from './App.vue';

createApp(App)
    .use(LanguageResources)
    .use(vuetify)
    .use(createPinia())
    .mount('#app');
