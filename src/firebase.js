import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA8J88WNFBZVpQS_KnOPrJvce82zurrUAU",
    authDomain: "be-frontend.firebaseapp.com",
    projectId: "be-frontend",
    storageBucket: "be-frontend.appspot.com",
    messagingSenderId: "574773492776",
    appId: "1:574773492776:web:df6cd2d285aef90897891d",
    measurementId: "G-WMQ57W2CQJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);