import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDyIXc44BB1fSu5gQkCsKP_sfqkd7H3U0Q",
  authDomain: "nonprofit-resources.firebaseapp.com",
  projectId: "nonprofit-resources",
  storageBucket: "nonprofit-resources.firebasestorage.app",
  messagingSenderId: "1034770576350",
  appId: "1:1034770576350:web:c3265aee972712c015e34f",
  measurementId: "G-JMPTX7QCK6"
};

const app = initializeApp(firebaseConfig);

// Initialize analytics only in browser environment
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Helper function to safely log analytics events
export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

export const auth = getAuth(app);
export const db = getFirestore(app);