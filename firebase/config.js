import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { configuracionFirebase } from "./firebaseConfig";

const appFirebase = initializeApp(configuracionFirebase);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);
export { appFirebase, db, auth };
