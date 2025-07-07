import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import MapSidebar from '../components/MapSidebar';
import KwangjuMap from '../components/KwangjuMap';
import ProfilePage from './ProfilePage';
import AgoraPage from './AgoraPage';
import LiteraturePage from './LiteraturePage';
import { literatureSpotsArray } from '../data/literatureSpots';

const MainPage = ({ user, userProfile, setUserProfile, onSpotClick, onGoToStart, userSpots = [], setUserSpots }) => {
  const [currentPage, setCurrentPage] = useState('map');
  const [showLiterature, setShowLiterature] = useState(true);
  const [showUser, setShowUser] = useState(true);
  const [focusSpotId, setFocusSpotId] = useState(null);
  const [resetMapView, setResetMapView] = useState(false);

  // 사용자 진행 상황을 반영한 문학 기행 장소 데이터
  const getLiteratureSpots = () => {
    const completedSpots = userProfile?.literatureProgress?.completedSpots || [];
  
    return literatureSpotsArray.map(spot => ({
      ...spot,
      visited: completedSpots.includes(spot.id)
    }));
  };

  const handleSidebarSpotClick = (spotId) => {
    console.log(`사이드바에서 장소 ${spotId} 클릭됨!`);
    setFocusSpotId(spotId);
    setResetMapView(false); // 특정 장소 포커싱 시 리셋 해제
  };

  // 임시 사용자 데이터 (나중에 Firebase에서 가져올 예정)
  // const userSpots = [
  //   // 예시: { id: 1, name: '내가 다녔던 학교', address: '광주 북구...', author: '사용자1' }
  // ];

  const handleAddUserSpot = (newSpot) => {
    if (setUserSpots) {
      setUserSpots(prevSpots => {
        // 중복 방지: 같은 ID가 이미 있으면 추가하지 않음
        const existingSpot = prevSpots.find(spot => spot.id === newSpot.id);
        if (existingSpot) {
          return prevSpots;
        }
        return [...prevSpots, newSpot];
      });
    }
  };

  const handleUpdateUserSpot = (updatedSpot) => {
    if (setUserSpots) {
      setUserSpots(prevSpots => 
        prevSpots.map(spot => 
          spot.id === updatedSpot.id ? updatedSpot : spot
        )
      );
    }
  };

  const handleDeleteUserSpot = (spotId) => {
    if (setUserSpots) {
      setUserSpots(prevSpots => 
        prevSpots.filter(spot => spot.id !== spotId)
      );
    }
  };

  const handleSpotClick = (spotId) => {
    console.log(`장소 ID ${spotId} 클릭됨!`);
    
    // App.js의 onSpotClick 호출하여 상세 페이지로 이동
    if (onSpotClick) {
      onSpotClick(spotId);
    }
  };

  const handlePageChange = (pageId) => {
    if (pageId === 'home') {
      // 홈 버튼 클릭 시 StartPage로 이동
      if (onGoToStart) {
        onGoToStart();
      }
    } else {
      setCurrentPage(pageId);
      
      // Map 페이지로 돌아올 때 지도를 전체 뷰로 리셋
      if (pageId === 'map') {
        setResetMapView(true);
        setFocusSpotId(null);
        
        // 리셋 상태를 잠시 후 해제 (한 번만 실행되도록)
        setTimeout(() => {
          setResetMapView(false);
        }, 1500);
      }
    }
  };

  const handleToggleLiterature = () => {
    setShowLiterature(!showLiterature);
  };

  const handleToggleUser = () => {
    setShowUser(!showUser);
  };

  const handleSpecialContent = () => {
    // 스페셜 콘텐츠 페이지로 이동 (나중에 구현)
    console.log('스페셜 콘텐츠 열기!');
    alert('스페셜 콘텐츠: "나는 어떤 인물을 닮았을까?" 기능이 곧 추가될 예정입니다!');
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'map':
        return (
          <div className="flex h-[calc(100vh-4rem)]">
            {/* 사이드바 */}
            <MapSidebar
              showLiterature={showLiterature}
              showUser={showUser}
              onToggleLiterature={handleToggleLiterature}
              onToggleUser={handleToggleUser}
              literatureSpots={literatureSpotsArray.map(spot => ({
                ...spot,
                visited: (userProfile?.literatureProgress?.completedSpots || []).includes(spot.id)
              }))}
              userSpots={userSpots}
              onSpecialContent={handleSpecialContent}
              onSpotClick={handleSidebarSpotClick}  // 이 줄 추가/수정
            />
            
            {/* 지도 영역 */}
            <div className="flex-1 p-4 bg-gray-50">
              <div className="h-full">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-3">
                    <h3 className="text-xl font-semibold text-blue-700 text-center">
                      광주광역시 문학 지도
                    </h3>
                  </div>
                  
                  <div className="flex-1 p-4">
                    <KwangjuMap 
                      onSpotClick={handleSpotClick}
                      showLiterature={showLiterature}
                      showUser={showUser}
                      literatureSpots={getLiteratureSpots()}
                      userSpots={userSpots}
                      focusSpotId={focusSpotId}
                      resetMapView={resetMapView}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'about-518':
        return (
          <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-blue-700 mb-6">광주518민주화운동이란?</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                5·18 민주화운동에 대한 상세한 설명이 여기에 들어갈 예정입니다...
              </p>
            </div>
          </div>
        );
      
      case '518-literature':
        return (
          <LiteraturePage />
        );
      
      case 'creators':
        return (
          <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-blue-700 mb-6">제작자</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                프로젝트 제작자 정보가 여기에 들어갈 예정입니다...
              </p>
            </div>
          </div>
        );
      
      case 'agora':
        return (
          <AgoraPage 
            user={user}
            userProfile={userProfile}
            onAddUserSpot={handleAddUserSpot}
            onUpdateUserSpot={handleUpdateUserSpot}  // 이 줄 추가
            onDeleteUserSpot={handleDeleteUserSpot}  // 이 줄 추가
          />
        );
      
      case 'profile':
        return (
          <ProfilePage 
            user={user}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        );
      
      default:
        // 알 수 없는 페이지일 경우 map 페이지로 기본 설정
        setCurrentPage('map');
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
      />
      <main className="pt-0">
        {renderPageContent()}
      </main>
    </div>
  );
};

export default MainPage;