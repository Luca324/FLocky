import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, 
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, 
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)


export const auth = getAuth(app);

export const registerWithEmail = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Добавляем имя пользователя в профиль
  await updateProfile(userCredential.user, {
    displayName: username
  });
  
  await sendEmailVerification(userCredential.user); // Отправка письма подтверждения
  return userCredential;
};

export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};