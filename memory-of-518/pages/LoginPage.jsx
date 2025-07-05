import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useTranslation } from 'react-i18next';

const LoginPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    nickname: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 아이디 중복 검사
  const checkUserIdExists = async (userId) => {
    const q = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  // 아이디를 이메일 형식으로 변환 (Firebase 요구사항)
  const userIdToEmail = (userId) => `${userId}@memory518.local`;

  // 로그인 정보로 사용자 찾기
  const findUserByCredentials = async (userId, password) => {
    const q = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    // Firebase Auth로 로그인 시도
    try {
      const email = userIdToEmail(userId);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { firebaseUser: userCredential.user, userData, docId: userDoc.id };
    } catch (error) {
      throw new Error(t('error.wrongPassword'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 기본 유효성 검사
    if (formData.userId.length < 3) {
      setError(t('error.userIdLength'));
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t('error.passwordLength'));
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // 회원가입
        // 1. 아이디 중복 검사
        const userExists = await checkUserIdExists(formData.userId);
        if (userExists) {
          setError(t('error.userIdExists'));
          setLoading(false);
          return;
        }

        if (!formData.nickname.trim()) {
          setError(t('error.nicknameRequired'));
          setLoading(false);
          return;
        }

        // 2. Firebase Auth에 이메일 형식으로 계정 생성
        const email = userIdToEmail(formData.userId);
        const userCredential = await createUserWithEmailAndPassword(auth, email, formData.password);
        const user = userCredential.user;

        // 3. Firestore에 사용자 정보 저장
        await setDoc(doc(db, 'users', user.uid), {
          userId: formData.userId,
          nickname: formData.nickname.trim(),
          email: email,
          createdAt: new Date(),
          literatureProgress: {
            completedSpots: [],
            totalSpots: 7,
            stamps: [],
            lastVisited: null
          },
          userPosts: []
        });

        console.log('회원가입 성공!');
        onLogin(user, {
          userId: formData.userId,
          nickname: formData.nickname.trim(),
          literatureProgress: {
            completedSpots: [],
            totalSpots: 7,
            stamps: []
          }
        });

      } else {
        // 로그인
        const result = await findUserByCredentials(formData.userId, formData.password);
        if (!result) {
          setError(t('error.userNotFound'));
          setLoading(false);
          return;
        }

        console.log('로그인 성공!');
        onLogin(result.firebaseUser, result.userData);
      }
    } catch (error) {
      console.error('인증 오류:', error);
      if (error.message) {
        setError(error.message);
      } else {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError(t('error.userIdExists'));
            break;
          case 'auth/weak-password':
            setError(t('error.passwordLength'));
            break;
          case 'auth/user-not-found':
            setError(t('error.userNotFound'));
            break;
          case 'auth/wrong-password':
            setError(t('error.wrongPassword'));
            break;
          default:
            setError(t('error.generic'));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center p-8 relative overflow-hidden">
      
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-yellow-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-green-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      {/* 언어 전환 버튼 - 우상단 고정 */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => {
            const newLang = i18n.language === 'ko' ? 'en' : 'ko';
            i18n.changeLanguage(newLang);
          }}
          className="px-4 py-2 rounded-lg bg-white/90 hover:bg-white transition-all duration-200 border border-gray-300 hover:border-orange-400 shadow-lg hover:shadow-xl"
          title={i18n.language === 'ko' ? 'Switch to English' : '한국어로 전환'}
        >
          <span className="text-sm font-medium text-gray-700">
            {i18n.language === 'ko' ? 'Korean' : 'English'}
          </span>
        </button>
      </div>

      {/* 메인 컨텐츠 - 가운데 정렬 */}
      <div className="max-w-2xl w-full mx-auto relative z-10">
        
        {/* 메인 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-600 bg-clip-text text-transparent mb-4">
            {t('login.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-8">
            {t('login.subtitle')}
          </p>
        </div>

        {/* 환영 메시지 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-10">
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            {t('start.welcome')}<br />
            {t('start.description')}
          </p>
        </div>

        {/* 로그인/회원가입 섹션 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          
          {/* 로그인 안내 */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-700 mb-3">
              {isSignUp ? t('login.signup') : t('login.signin')}
            </h2>
            <p className="text-gray-600 text-lg">
              {isSignUp ? t('login.signupDesc') : t('login.loginDesc')}
            </p>
          </div>

          {/* 로그인/회원가입 폼 */}
          <div className="space-y-6 max-w-md mx-auto">
            
            {/* 아이디 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.userId')}
              </label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg"
                placeholder={t('login.userIdPlaceholder')}
                pattern="[a-zA-Z0-9]+"
                minLength="3"
                maxLength="20"
              />
            </div>

              {/* 닉네임 (회원가입 시만) */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('login.nickname')}
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg"
                    placeholder={t('login.nicknamePlaceholder')}
                    maxLength="20"
                  />
                </div>
              )}

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.password')}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg"
                placeholder={t('login.passwordPlaceholder')}
                minLength="6"
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            {/* 제출 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
            >
              {loading ? t('login.processing') : (isSignUp ? t('login.signup') : t('login.signin'))}
            </button>
          </div>

          {/* 로그인/회원가입 전환 */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setFormData({ userId: '', password: '', nickname: '' });
              }}
              className="text-blue-600 hover:text-blue-700 font-medium text-lg hover:underline transition-colors"
            >
              {isSignUp ? t('login.hasAccount') : t('login.noAccount')}
            </button>
          </div>

          {/* 안내 메시지 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {t('login.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;