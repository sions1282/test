import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from './firebase/config';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';
import MainPage from './pages/MainPage';
import LiteratureDetailPage from './pages/LiteratureDetailPage';
import './i18n/config'; // i18n 초기화
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('main'); // 'start' | 'main' | 'detail'
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [userSpots, setUserSpots] = useState([]); // 사용자 등록 장소들

  useEffect(() => {
    // Firebase 인증 상태 변화 감지
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 로그인된 사용자가 있으면 Firestore에서 프로필 정보 가져오기
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUser(user);
            setUserProfile(userDoc.data());
            
            // 사용자 스팟 로드
            await loadUserSpots();
          } else {
            console.error('사용자 프로필을 찾을 수 없습니다.');
            setUser(null);
            setUserProfile(null);
          }
        } catch (error) {
          console.error('사용자 정보 로드 오류:', error);
          setUser(null);
          setUserProfile(null);
        }
      } else {
        // 로그아웃된 상태
        setUser(null);
        setUserProfile(null);
        setUserSpots([]);
      }
      setLoading(false);
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => unsubscribe();
  }, []);

  // 사용자 스팟 로드 함수
  const loadUserSpots = async () => {
    try {
      const q = query(collection(db, 'userSpots'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const spots = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.placeName,
          category: data.category,
          address: data.address,
          reason: data.reason,
          authorName: data.authorName,
          position: data.coordinates ? 
            [data.coordinates.lat, data.coordinates.lng] : 
            [35.1595, 126.8526] // 임시 좌표
        };
      });
      setUserSpots(spots);
    } catch (error) {
      console.error('사용자 스팟 로드 오류:', error);
    }
  };

  const handleLogin = (user, profile = null) => {
    setUser(user);
    if (profile) {
      setUserProfile(profile);
    }
    // 로그인 후 바로 메인 페이지로 이동
    setCurrentPage('main');
  };

  const handleGoToStart = () => {
    setCurrentPage('start');
    setSelectedSpotId(null);
  };

  const handleStartJourney = () => {
    setCurrentPage('main');
  };

  const handleSpotClick = (spotId) => {
    setSelectedSpotId(spotId);
    setCurrentPage('detail');
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
    setSelectedSpotId(null);
  };

  const handleCompleteSpot = async (spotId) => {
    if (!user || !userProfile) return;

    try {
      // Firestore에서 사용자 진행 상황 업데이트
      const updatedCompletedSpots = [...(userProfile.literatureProgress?.completedSpots || [])];
      
      // 이미 완료한 장소가 아니라면 추가
      if (!updatedCompletedSpots.includes(spotId)) {
        updatedCompletedSpots.push(spotId);
        
        // Firestore 업데이트
        await updateDoc(doc(db, 'users', user.uid), {
          'literatureProgress.completedSpots': updatedCompletedSpots,
          'literatureProgress.lastVisited': new Date(),
          'literatureProgress.stamps': updatedCompletedSpots // 스탬프는 완료한 장소와 동일하게 처리
        });

        // 로컬 상태 업데이트
        setUserProfile({
          ...userProfile,
          literatureProgress: {
            ...userProfile.literatureProgress,
            completedSpots: updatedCompletedSpots,
            stamps: updatedCompletedSpots,
            lastVisited: new Date()
          }
        });

        console.log(`장소 ${spotId} 완료 처리됨`);
      }
    } catch (error) {
      console.error('진행 상황 업데이트 오류:', error);
    }

    // 메인 페이지로 돌아가기
    handleBackToMain();
  };

  // 로딩 중 화면
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Memory of 518
          </div>
          <div className="text-gray-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 시작 페이지 표시 (로그인된 상태)
  if (currentPage === 'start') {
    return (
      <StartPage 
        onStart={handleStartJourney}
        isLoggedIn={true}
        user={user}
        userProfile={userProfile}
      />
    );
  }

  // 상세 페이지 표시
  if (currentPage === 'detail' && selectedSpotId) {
    return (
      <LiteratureDetailPage
        spotId={selectedSpotId}
        onBack={handleBackToMain}
        onComplete={handleCompleteSpot}
      />
    );
  }

  return (
    <div className="App">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <MainPage 
          user={user}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onSpotClick={handleSpotClick}
          onGoToStart={handleGoToStart}
          userSpots={userSpots}
          setUserSpots={setUserSpots}
        />
      )}
    </div>
  );
}

export default App;