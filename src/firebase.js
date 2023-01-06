import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAapeUE6YQMAIE9IcrHLJ1yUsTpW7gLGlc",
    authDomain: "chat-55ed9.firebaseapp.com",
    projectId: "chat-55ed9",
    storageBucket: "chat-55ed9.appspot.com",
    messagingSenderId: "408848680607",
    appId: "1:408848680607:web:e5375254e3fc605aeb04aa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()