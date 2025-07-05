// src/firebase/config.js - 업데이트된 버전
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyBmziZSl8li1Wz_wPaO-VcDlwiLsPSs6pk",
  authDomain: "memory-of-518.firebaseapp.com",
  projectId: "memory-of-518",
  storageBucket: "memory-of-518.firebasestorage.app",
  messagingSenderId: "931414418884",
  appId: "1:931414418884:web:58cd072af1264a4a1a3091"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 서비스 인스턴스 생성
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;