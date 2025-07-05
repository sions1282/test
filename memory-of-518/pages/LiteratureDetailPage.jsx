import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { getSpotById } from '../data/literatureSpots';

const LiteratureDetailPage = ({ spotId, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [textElements, setTextElements] = useState({
    title: false,
    quote: false,
    source: false
  });

  // 데이터 파일에서 현재 장소 정보 가져오기
  const currentSpot = getSpotById(spotId);

  useEffect(() => {
    if (currentStep === 0) {
      // 첫 번째 페이지에서 순차적 애니메이션
      const titleTimer = setTimeout(() => {
        setTextElements(prev => ({ ...prev, title: true }));
      }, 500);

      const quoteTimer = setTimeout(() => {
        setTextElements(prev => ({ ...prev, quote: true }));
      }, 1500);

      const sourceTimer = setTimeout(() => {
        setTextElements(prev => ({ ...prev, source: true }));
      }, 4000);

      const nextButtonTimer = setTimeout(() => {
        setShowNext(true);
      }, 5500);

      return () => {
        clearTimeout(titleTimer);
        clearTimeout(quoteTimer);
        clearTimeout(sourceTimer);
        clearTimeout(nextButtonTimer);
      };
    } else {
      // 다른 단계에서는 기본 페이드인
      setFadeIn(true);
      const timer = setTimeout(() => {
        setShowNext(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // 장소 데이터가 없는 경우 처리
  if (!currentSpot) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">장소를 찾을 수 없습니다</h1>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setShowNext(false);
      setFadeIn(false);
      setTextElements({ title: false, quote: false, source: false });
    } else {
      // 완료 처리
      if (onComplete) {
        onComplete(spotId);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowNext(true);
      setFadeIn(false);
      setTextElements({ title: false, quote: false, source: false });
    }
  };

  const renderInteraction = () => {
    return (
      <div className="text-center text-gray-500">
        <div className="text-6xl mb-4">🎮</div>
        <p className="text-lg">{currentSpot.interaction.description}</p>
        <p className="text-sm mt-2 text-gray-400">
          p5.js 인터랙션이 여기에 들어갈 예정입니다
        </p>
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300">
            현재는 플레이스홀더입니다. 실제 게임은 향후 추가될 예정입니다.
          </p>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        // 도입부 - 문학 인용구 (순차적 애니메이션)
        return (
          <div className="min-h-screen bg-black flex items-center justify-center p-8 relative">
            {/* 홈 버튼 - 우상단 */}
            <button
              onClick={onBack}
              className="fixed top-6 right-6 z-50 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors shadow-lg"
              title="메인으로 돌아가기"
            >
              <Home size={20} />
            </button>

            <div className="text-center max-w-4xl">
              {/* 제목 애니메이션 */}
              <h1 className={`text-6xl md:text-7xl font-bold text-white mb-8 transition-all duration-1000 ${
                textElements.title ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}>
                {currentSpot.name}
              </h1>
              
              <div className={`w-32 h-1 bg-white mx-auto mb-12 transition-all duration-1000 delay-500 ${
                textElements.title ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}></div>
              
              {/* 인용구 애니메이션 */}
              <blockquote className={`text-xl md:text-2xl text-white leading-relaxed mb-8 transition-all duration-1500 ${
                textElements.quote ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}>
                {currentSpot.quote.split('\n').map((line, index) => (
                  <span key={index}>
                    {line.includes('*') ? (
                      line.split('*').map((part, i) => 
                        i % 2 === 1 ? (
                          <span key={i} className="text-yellow-400 font-semibold">{part}</span>
                        ) : part
                      )
                    ) : line}
                    <br />
                  </span>
                ))}
              </blockquote>
              
              {/* 출처 애니메이션 */}
              <p className={`text-lg text-gray-300 italic transition-all duration-1000 ${
                textElements.source ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}>
                {currentSpot.source}
              </p>
            </div>
          </div>
        );

      case 1:
        // 인터랙션 단계 - 더 어두운 회색 배경
        return (
          <div className="min-h-screen bg-gray-700 flex flex-col relative">
            {/* 홈 버튼 - 우상단 */}
            <button
              onClick={onBack}
              className="fixed top-6 right-6 z-50 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-colors shadow-lg"
              title="메인으로 돌아가기"
            >
              <Home size={20} />
            </button>

            <div className="flex-1 flex items-center justify-center p-8">
              <div className={`text-center max-w-5xl w-full transition-all duration-2000 ${
                fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}>
                <h2 className="text-4xl font-bold text-white mb-8">
                  {currentSpot.interaction.title}
                </h2>
                
                {/* p5.js 인터랙션 영역 - 더 크게 */}
                <div className="w-full h-[500px] bg-gray-600 rounded-lg shadow-lg mb-8 flex items-center justify-center border border-gray-500">
                  {renderInteraction()}
                </div>
                
                <p className="text-lg text-gray-200">
                  {currentSpot.interaction.description}
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        // 해설 단계 - 밝은 회색 배경
        return (
          <div className="min-h-screen bg-gray-100 p-8 relative">
            {/* 홈 버튼 - 우상단 */}
            <button
              onClick={onBack}
              className="fixed top-6 right-6 z-50 p-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors shadow-lg"
              title="메인으로 돌아가기"
            >
              <Home size={20} />
            </button>

            <div className={`max-w-4xl mx-auto transition-all duration-2000 ${
              fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                {currentSpot.explanation.title}
              </h2>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentSpot.explanation.content}
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        // 아카이브 단계 - 흰색 배경
        return (
          <div className="min-h-screen bg-white p-8 relative">
            {/* 홈 버튼 - 우상단 */}
            <button
              onClick={onBack}
              className="fixed top-6 right-6 z-50 p-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors shadow-lg"
              title="메인으로 돌아가기"
            >
              <Home size={20} />
            </button>

            <div className={`max-w-6xl mx-auto transition-all duration-2000 ${
              fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                {currentSpot.archive.title}
              </h2>
              
              <div className="space-y-12">
                {/* 이미지 섹션 */}
                {currentSpot.archive.images.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">사진 자료</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentSpot.archive.images.map((image, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                          <img 
                            src={image.url} 
                            alt={image.caption}
                            className="w-full h-64 object-cover"
                          />
                          <div className="p-4">
                            <p className="text-gray-600 text-center">{image.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 비디오 섹션 */}
                {currentSpot.archive.videos.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">영상 자료</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {currentSpot.archive.videos.map((video, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                          <div className="aspect-video">
                            <iframe
                              src={video.url}
                              title={video.title}
                              className="w-full h-full"
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-800">{video.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 텍스트 섹션 */}
                {currentSpot.archive.texts.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">상세 정보</h3>
                    <div className="space-y-6">
                      {currentSpot.archive.texts.map((text, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6">
                          <h4 className="text-xl font-semibold text-gray-800 mb-4">{text.title}</h4>
                          <p className="text-gray-700 leading-relaxed">{text.content}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderStep()}
      
      {/* 네비게이션 버튼들 - 하단 중앙 (홈 버튼 제외) */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-40">
        {/* 이전 버튼 */}
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors shadow-lg"
            title="이전 단계"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        
        {/* 다음 버튼 */}
        {(showNext || currentStep >= 2) && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <span>{currentStep === 3 ? '완료' : 'Next'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LiteratureDetailPage;