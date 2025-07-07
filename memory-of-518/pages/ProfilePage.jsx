import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User, LogOut, Edit3, Save, X, RotateCcw, AlertTriangle } from 'lucide-react';

const ProfilePage = ({ user, userProfile, setUserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(userProfile?.nickname || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  const handleSaveNickname = async () => {
    if (!editedNickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Firestore에서 닉네임 업데이트
      await updateDoc(doc(db, 'users', user.uid), {
        nickname: editedNickname.trim(),
        updatedAt: new Date()
      });

      // 로컬 상태 업데이트
      setUserProfile({
        ...userProfile,
        nickname: editedNickname.trim()
      });

      setIsEditing(false);
      console.log('닉네임 변경 성공');
    } catch (error) {
      console.error('닉네임 변경 오류:', error);
      setError('닉네임 변경 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedNickname(userProfile?.nickname || '');
    setIsEditing(false);
    setError('');
  };

  // 문학 기행 진행상황 초기화
  const handleResetProgress = async () => {
    setResetLoading(true);
    setError('');

    try {
      // Firestore에서 진행상황 초기화
      await updateDoc(doc(db, 'users', user.uid), {
        'literatureProgress.completedSpots': [],
        'literatureProgress.stamps': [],
        'literatureProgress.lastVisited': null,
        updatedAt: new Date()
      });

      // 로컬 상태 업데이트
      setUserProfile({
        ...userProfile,
        literatureProgress: {
          ...userProfile.literatureProgress,
          completedSpots: [],
          stamps: [],
          lastVisited: null
        }
      });

      setShowResetConfirm(false);
      alert('문학 기행 진행상황이 초기화되었습니다.');
      console.log('진행상황 초기화 완료');
    } catch (error) {
      console.error('진행상황 초기화 오류:', error);
      setError('초기화 중 오류가 발생했습니다.');
    } finally {
      setResetLoading(false);
    }
  };

  // 문학 기행 진행률 계산
  const progressData = userProfile?.literatureProgress || { completedSpots: [], totalSpots: 7 };
  const progressPercentage = (progressData.completedSpots.length / progressData.totalSpots) * 100;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-gwangju-blue mb-8">프로필</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 프로필 정보 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gwangju-orange to-gwangju-yellow rounded-full flex items-center justify-center">
              <User className="text-white" size={28} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">사용자 정보</h3>
              <p className="text-gray-500">계정 관리</p>
            </div>
          </div>

          {/* 아이디 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              아이디
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg border">
              <span className="text-gray-800">{userProfile?.userId || 'Unknown'}</span>
            </div>
          </div>

          {/* 닉네임 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              닉네임
            </label>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedNickname}
                  onChange={(e) => setEditedNickname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gwangju-orange focus:border-transparent"
                  placeholder="새로운 닉네임"
                  maxLength="20"
                  disabled={loading}
                />
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveNickname}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-gwangju-green text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} className="mr-2" />
                    {loading ? '저장 중...' : '저장'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X size={16} className="mr-2" />
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{userProfile?.nickname || 'Unknown'}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-gwangju-blue hover:text-blue-600 transition-colors"
                >
                  <Edit3 size={16} className="mr-1" />
                  수정
                </button>
              </div>
            )}
          </div>

          {/* 가입일 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              가입일
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg border">
              <span className="text-gray-800">
                {userProfile?.createdAt ? 
                  new Date(userProfile.createdAt.seconds * 1000).toLocaleDateString('ko-KR') : 
                  '정보 없음'
                }
              </span>
            </div>
          </div>

          {/* 로그아웃 버튼 */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium mb-4"
          >
            <LogOut size={20} className="mr-2" />
            로그아웃
          </button>

          {/* 진행상황 초기화 버튼 */}
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <RotateCcw size={20} className="mr-2" />
            문학 기행 진행상황 초기화
          </button>
        </div>

        {/* 문학 기행 진행 상황 카드 */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">문학 기행 진행 상황</h3>
          
          {/* 진행률 바 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-medium text-gwangju-blue">
                {progressData.completedSpots.length}/{progressData.totalSpots}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-gwangju-orange to-gwangju-yellow h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {progressPercentage.toFixed(0)}% 완료
            </p>
          </div>

          {/* 완료된 장소들 */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">완료된 장소</h4>
            {progressData.completedSpots.length > 0 ? (
              <div className="space-y-2">
                {progressData.completedSpots.map((spotId, index) => (
                  <div key={index} className="flex items-center p-2 bg-green-50 rounded-lg">
                    <span className="w-2 h-2 bg-gwangju-green rounded-full mr-3"></span>
                    <span className="text-sm text-gray-700">장소 #{spotId}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">아직 완료한 장소가 없습니다.</p>
            )}
          </div>

          {/* 스탬프 수집 현황 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">수집한 스탬프</h4>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-bold ${
                    progressData.completedSpots.includes(index + 1)
                      ? 'bg-gwangju-green border-gwangju-green text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              7개를 모두 모으면 특별한 콘텐츠를 볼 수 있어요!
            </p>
          </div>
        </div>
      </div>

      {/* 진행상황 초기화 확인 모달 */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                진행상황 초기화
              </h3>
              
              <p className="text-gray-600 mb-6">
                문학 기행 진행상황을 모두 초기화하시겠습니까?<br />
                <span className="font-medium text-red-600">완료한 모든 장소와 스탬프가 삭제되며, 이 작업은 되돌릴 수 없습니다.</span>
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowResetConfirm(false);
                    setError('');
                  }}
                  disabled={resetLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  취소
                </button>
                <button
                  onClick={handleResetProgress}
                  disabled={resetLoading}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
                >
                  {resetLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      초기화 중...
                    </>
                  ) : (
                    '초기화'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;