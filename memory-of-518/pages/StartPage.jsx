import React from 'react';
import { useTranslation } from 'react-i18next';

const StartPage = ({ onStart, isLoggedIn = false, user, userProfile }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center p-8 relative">
      
      {/* 로그인된 상태에서만 언어 전환 버튼 표시 */}
      {isLoggedIn && (
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
      )}

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* 메인 타이틀 */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-600 bg-clip-text text-transparent">
            Memory of 518
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Connecting Literature, Archival Records, and User-Generated Data
          </p>
        </div>

        {/* 사용자 환영 메시지 (로그인된 경우) */}
        {isLoggedIn && userProfile && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-4">
            <p className="text-lg text-gray-800">
              안녕하세요, <span className="font-semibold text-orange-600">{userProfile.nickname}</span>님! 🎉
            </p>
            <p className="text-sm text-gray-600 mt-2">
              문학 기행 진행률: {userProfile.literatureProgress?.completedSpots?.length || 0}/7
            </p>
          </div>
        )}

        {/* 설명 텍스트 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            {t('start.welcome')}<br />
            {t('start.description')}
          </p>
        </div>

        {/* 시작하기 버튼 */}
        <div className="pt-4">
          <button
            onClick={onStart}
            className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-white text-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">
              {isLoggedIn ? '문학 기행 계속하기' : t('start.button')}
            </span>
          </button>
        </div>

        {/* 장식적 요소들 */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-green-200 rounded-full opacity-25 animate-pulse"></div>
      </div>
    </div>
  );
};

export default StartPage;