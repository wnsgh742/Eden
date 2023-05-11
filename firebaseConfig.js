import { initializeApp  } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig ={
    apiKey: "AIzaSyDJf__ncLqxsw3PoJVONitPj87_xD2fDP8",
    authDomain: "eden-project-3a695.firebaseapp.com",
    projectId: "eden-project-3a695",
    storageBucket: "eden-project-3a695.appspot.com",
    messagingSenderId: "102996626352",
    appId: "1:102996626352:web:8527cef08a886bcfd9a475",
    measurementId: "G-2P1CW3NZKY",
    databaseURL:"https://eden-project-3a695-default-rtdb.firebaseio.com/",
    
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
const db = getFirestore(app);

