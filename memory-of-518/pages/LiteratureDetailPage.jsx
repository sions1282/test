import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { getSpotById } from '../data/literatureSpots';

const LiteratureDetailPage = ({ spotId, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [textElements, setTextElements] = useState({
    title: false,
    quoteAndSource: false  // quote와 source를 하나로 통합
  });

  // 데이터 파일에서 현재 장소 정보 가져오기
  const currentSpot = getSpotById(spotId);

  useEffect(() => {
    if (currentStep === 0) {
      // 첫 번째 페이지에서 순차적 애니메이션
      const titleTimer = setTimeout(() => {
        setTextElements(prev => ({ ...prev, title: true }));
      }, 500);

      const quoteAndSourceTimer = setTimeout(() => {
        setTextElements(prev => ({ ...prev, quoteAndSource: true }));
      }, 2000);  // 1.5초에서 2초로 늘림

      const nextButtonTimer = setTimeout(() => {
        setShowNext(true);
      }, 5000);  // 4초에서 5초로 늘림 (인용구 후 3초)

      return () => {
        clearTimeout(titleTimer);
        clearTimeout(quoteAndSourceTimer);
        clearTimeout(nextButtonTimer);
      };
    } else {
      // 다른 단계에서는 바로 페이드인 + 즉시 버튼 표시
      setFadeIn(true);
      setShowNext(true);  // 즉시 버튼 표시
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
      setTextElements({ title: false, quoteAndSource: false });
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
      setTextElements({ title: false, quoteAndSource: false });
    }
  };

  const renderInteraction = () => {
    return (
      <div className="text-center text-gray-300 p-8">
        <div className="text-8xl mb-6">🎮</div>
        <h3 className="text-2xl font-semibold mb-4 text-white">{currentSpot.interaction.title}</h3>
        <p className="text-xl mb-6">{currentSpot.interaction.description}</p>
        <p className="text-base text-gray-400 mb-6">
          p5.js 인터랙션이 여기에 들어갈 예정입니다
        </p>
        <div className="max-w-2xl mx-auto p-6 bg-gray-700 rounded-lg border border-gray-500">
          <p className="text-base text-gray-300">
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
              
              {/* 인용구와 출처를 함께 애니메이션 - 더 느리고 부드럽게 */}
              <div className={`transition-all duration-[2500ms] ease-out ${
                textElements.quoteAndSource ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
              }`}>
                {/* 인용구 */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8">
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
                
                {/* 출처 */}
                <p className="text-lg text-gray-300 italic">
                  {currentSpot.source}
                </p>
              </div>
            </div>
          </div>
        );

      case 1:
        // 인터랙션 단계 - 제목 제거, 더 어두운 회색 배경
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

            <div className="flex-1 flex items-center justify-center p-4">
              <div className={`text-center w-full h-full transition-all duration-2000 ${
                fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}>
                {/* p5.js 인터랙션 영역 - 화면 가득 차게 */}
                <div className="w-full h-full bg-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-center border border-gray-500 min-h-[70vh]">
                  {renderInteraction()}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        // 해설 단계 - 인터랙션과 동일한 회색 배경
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

            <div className="flex-1 flex items-center justify-center p-4">
              <div className={`text-center w-full max-w-4xl transition-all duration-2000 ${
                fadeIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
              }`}>
                <h2 className="text-4xl font-bold text-white mb-8">
                  {currentSpot.explanation.title}
                </h2>
                
                <div className="text-lg text-gray-200 leading-relaxed">
                  {currentSpot.explanation.content}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        // 아카이브 단계 - 새로운 레이아웃
        return (
          <div className="min-h-screen bg-white relative">
            {/* 홈 버튼 - 우상단 */}
            <button
              onClick={onBack}
              className="fixed top-6 right-6 z-50 p-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors shadow-lg"
              title="메인으로 돌아가기"
            >
              <Home size={20} />
            </button>

            <div className={`w-full transition-all duration-2000 ${
              fadeIn ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* 커버 이미지 섹션 - 노션 스타일 */}
              <div className="relative w-full h-80 md:h-96 overflow-hidden">
                {/* 배경 이미지 */}
                {currentSpot.detailInfo?.coverImage ? (
                  <img 
                    src={currentSpot.detailInfo.coverImage}
                    alt={currentSpot.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 이미지 로드 실패 시 그라데이션 배경으로 대체
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                
                {/* 이미지 로드 실패 시 대체 배경 */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600"
                  style={{ display: currentSpot.detailInfo?.coverImage ? 'none' : 'block' }}
                ></div>
                
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                
                {/* 장소 이름 - 왼쪽 */}
                <div className="absolute bottom-8 left-8 md:left-12">
                  <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                    {currentSpot.name}
                  </h1>
                </div>
                
                {/* 사진 정보 - 오른쪽 아래 */}
                <div className="absolute bottom-4 right-4 md:right-8">
                  <p className="text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                    {currentSpot.detailInfo?.photoYear || "1980년 5월"}
                  </p>
                </div>
              </div>

              {/* 메인 콘텐츠 */}
              <div className="px-4 md:px-8 lg:px-12 py-8">
                
                {/* 문학 기행 코스 섹션 */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">문학 기행 코스</h2>
                  <div className="text-lg text-gray-700 leading-relaxed">
                    <p>{currentSpot.detailInfo?.courseDescription || "이곳에서는 문학 작품 속 장면들을 만나볼 수 있습니다."}</p>
                  </div>
                </section>

                {/* 정보 섹션 */}
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">정보</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* 사진 갤러리 */}
                    <div className="space-y-4">
                      <div className="relative bg-gray-200 h-64 rounded-lg overflow-hidden">
                        {/* 사진 플레이스홀더 */}
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500">
                            사진 1/{currentSpot.detailInfo?.photoGallery?.length || 3}
                          </span>
                        </div>
                        
                        {/* 사진 네비게이션 버튼 */}
                        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
                          ←
                        </button>
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70">
                          →
                        </button>
                      </div>
                    </div>

                    {/* 장소 정보 */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">주소</h4>
                        <p className="text-gray-600">{currentSpot.detailInfo?.placeInfo?.address || currentSpot.address}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">사적지 번호</h4>
                        <p className="text-gray-600">{currentSpot.detailInfo?.placeInfo?.heritageNumber || "광주광역시 기념물"}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">표지석 설치 위치</h4>
                        <p className="text-gray-600">{currentSpot.detailInfo?.placeInfo?.monumentLocation || "건물 입구"}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2단 구성 - 문학 & 역사 */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  
                  {/* 왼쪽: 문학 섹션 */}
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">문학</h2>
                    
                    {/* 인물 소개 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">인물 소개</h3>
                      
                      {/* 마인드맵 이미지 */}
                      <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500">인물 관계도 마인드맵</span>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {currentSpot.detailInfo?.literature?.characterDescription || "작품의 주요 인물들과 그들의 관계를 살펴보세요."}
                      </p>

                      {/* 인물별 설명 */}
                      <div className="space-y-4">
                        {currentSpot.detailInfo?.literature?.characters?.map((character, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{character.name}</h4>
                              <p className="text-sm text-gray-600">{character.description}</p>
                            </div>
                          </div>
                        )) || (
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                            <div>
                              <h4 className="font-semibold text-gray-800">등장인물</h4>
                              <p className="text-sm text-gray-600">주요 인물들의 이야기가 여기에 표시됩니다.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 줄거리 소개 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">줄거리 소개</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {currentSpot.detailInfo?.literature?.plot || "이 장소와 관련된 문학 작품의 줄거리가 여기에 표시됩니다."}
                      </p>
                    </div>

                    {/* 더 알아보기 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">더 알아보기</h3>
                      <div className="space-y-2">
                        {currentSpot.detailInfo?.literature?.resources?.map((resource, index) => (
                          <button key={index} className="block text-left text-blue-600 hover:underline hover:bg-blue-50 p-2 rounded transition-colors">
                            {resource.title}
                          </button>
                        )) || (
                          <>
                            <button className="block text-left text-blue-600 hover:underline hover:bg-blue-50 p-2 rounded transition-colors">
                              📖 작품 해설 자료
                            </button>
                            <button className="block text-left text-blue-600 hover:underline hover:bg-blue-50 p-2 rounded transition-colors">
                              🎬 관련 영화 및 다큐멘터리
                            </button>
                            <button className="block text-left text-blue-600 hover:underline hover:bg-blue-50 p-2 rounded transition-colors">
                              📚 추천 도서
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽: 역사 섹션 */}
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800">역사</h2>
                    
                    {/* 5·18 이전 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">광주 5·18 민주화운동 이전</h3>
                      <div className="bg-gray-200 h-32 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500">역사 사진</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {currentSpot.detailInfo?.history?.before?.text || "5·18 이전의 역사적 배경이 여기에 표시됩니다."}
                      </p>
                    </div>

                    {/* 5·18 도중 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">광주 5·18 민주화운동 도중</h3>
                      <div className="bg-gray-200 h-32 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500">5·18 당시 사진</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {currentSpot.detailInfo?.history?.during?.text || "5·18 기간 중 이곳에서 일어난 일들이 여기에 표시됩니다."}
                      </p>
                    </div>

                    {/* 5·18 이후 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">광주 5·18 민주화운동 이후</h3>
                      
                      {/* 유튜브 비디오 - 바로 iframe으로 표시 */}
                      {currentSpot.detailInfo?.history?.after?.youtube ? (
                        <div className="aspect-video rounded-lg mb-3 overflow-hidden">
                          <iframe
                            src={(() => {
                              const videoId = currentSpot.detailInfo.history.after.youtube.split('/embed/')[1]?.split('?')[0];
                              // autoplay=0으로 설정해서 썸네일 상태로 대기
                              return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`;
                            })()}
                            title="YouTube video player"
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : (
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-gray-500">유튜브 영상</span>
                        </div>
                      )}
                      
                      <div className="bg-gray-200 h-24 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500">기념 사진</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {currentSpot.detailInfo?.history?.after?.text || "5·18 이후의 변화와 의미가 여기에 표시됩니다."}
                      </p>
                    </div>

                    {/* 비하인드 스토리 */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">비하인드 스토리</h3>
                      
                      <blockquote className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 mb-4">
                        <p className="text-gray-700 italic">
                          "{currentSpot.detailInfo?.history?.behindStory?.quote || currentSpot.quote}"
                        </p>
                        <footer className="text-sm text-gray-500 mt-2">
                          - {currentSpot.detailInfo?.history?.behindStory?.quoteAuthor || currentSpot.author}, 
                          {currentSpot.detailInfo?.history?.behindStory?.quoteSource || `『${currentSpot.book}』`}
                        </footer>
                      </blockquote>
                      
                      <div className="bg-gray-200 h-24 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500">관련 사진</span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {currentSpot.detailInfo?.history?.behindStory?.text || "작품과 관련된 뒷이야기가 여기에 표시됩니다."}
                      </p>
                    </div>
                  </div>
                </div>
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
        
        {/* 다음 버튼 - 이전 버튼과 동일한 디자인 */}
        {(showNext || currentStep >= 2) && (
          <button
            onClick={handleNext}
            className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors shadow-lg flex items-center justify-center"
            title={currentStep === 3 ? '완료' : '다음 단계'}
          >
            {currentStep === 3 ? (
              <span className="text-sm font-medium px-2">완료</span>
            ) : (
              <ArrowRight size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LiteratureDetailPage;