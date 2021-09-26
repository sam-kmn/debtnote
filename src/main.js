import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'

import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyAWTGjTYD6U_xLPVl4bpuoZmv61FRvO0q0",
  authDomain: "debtnote-dn.firebaseapp.com",
  databaseURL: "https://debtnote-dn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "debtnote-dn",
  storageBucket: "debtnote-dn.appspot.com",
  messagingSenderId: "140195002590",
  appId: "1:140195002590:web:cc4a568c09270085256a4f"
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
