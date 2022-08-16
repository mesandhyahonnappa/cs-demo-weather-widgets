import { createApp } from 'vue';
import App from './App.vue';

import { ComponentLibrary } from '@ionic-enterprise/cs-demo-weather-widgets-vue';

import './assets/main.css';

createApp(App).use(ComponentLibrary).mount('#app');
