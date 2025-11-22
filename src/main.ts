import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VNetworkGraph from 'v-network-graph'
import 'v-network-graph/lib/style.css'

const app = createApp(App)

app.use(router).use(VNetworkGraph)

app.mount('#app')
