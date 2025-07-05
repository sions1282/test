import React, { useState } from 'react';
import { Lock, Star, ChevronDown, ChevronUp, Book, Users } from 'lucide-react';
import { getSpotsByBook } from '../data/literatureSpots';

const MapSidebar = ({ 
  showLiterature, 
  showUser, 
  onToggleLiterature, 
  onToggleUser,
  literatureSpots = [],
  userSpots = [],
  onSpecialContent,
  onSpotClick
}) => {
  const [expandedBooks, setExpandedBooks] = useState({});

  // 사용자 카테고리별 색상 정의
  const categoryColors = {
    restaurant: { bg: 'bg-red-500', text: 'text-red-600', name: '식당', count: 0 },
    cafe: { bg: 'bg-yellow-500', text: 'text-yellow-600', name: '카페', count: 0 },
    museum: { bg: 'bg-purple-500', text: 'text-purple-600', name: '박물관', count: 0 },
    heritage: { bg: 'bg-green-500', text: 'text-green-600', name: '유적지', count: 0 },
    school: { bg: 'bg-blue-500', text: 'text-blue-600', name: '학교', count: 0 },
    park: { bg: 'bg-emerald-500', text: 'text-emerald-600', name: '공원', count: 0 },
    other: { bg: 'bg-gray-500', text: 'text-gray-600', name: '기타', count: 0 }
  };

  // 사용자 스팟 카테고리별 개수 계산
  const calculateUserCategories = () => {
    const categories = { ...categoryColors };
    userSpots.forEach(spot => {
      if (categories[spot.category]) {
        categories[spot.category].count++;
      }
    });
    return categories;
  };

  const userCategories = calculateUserCategories();
  const spotsByBook = getSpotsByBook();
  const completedCount = literatureSpots.filter(spot => spot.visited).length;
  const totalCount = 7; // 항상 7로 고정
  const isAllCompleted = completedCount === totalCount;

  // 책별 확장/축소 토글
  const toggleBookExpansion = (bookKey) => {
    setExpandedBooks(prev => ({
      ...prev,
      [bookKey]: !prev[bookKey]
    }));
  };

  // 장소 클릭 핸들러
  const handleSpotClick = (spotId) => {
    if (onSpotClick) {
      onSpotClick(spotId);
    }
  };

  return (
    <div className="w-80 bg-white shadow-lg border-r border-gray-200 h-full overflow-y-auto">
      {/* 사이드바 헤더 */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-orange-600">지도 필터</h3>
      </div>
      
      {/* 필터 옵션들 */}
      <div className="p-4 space-y-6">
        
        {/* 문학 기행 섹션 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Book className="text-orange-500" size={18} />
              <span className="font-medium text-gray-700">문학 기행</span>
            </div>
            <button
              onClick={onToggleLiterature}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                showLiterature 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {showLiterature ? '숨기기' : '보이기'}
            </button>
          </div>
          
          {showLiterature && (
            <div className="ml-6 space-y-3">
              <p className="text-sm text-gray-500">
                총 {literatureSpots.length}개 장소
              </p>
              
              {/* 책별 그룹 */}
              <div className="space-y-2">
                {Object.entries(spotsByBook).map(([bookKey, spots]) => {
                  const isExpanded = expandedBooks[bookKey];
                  const completedInBook = spots.filter(spot => {
                    const literatureSpot = literatureSpots.find(ls => ls.id === spot.id);
                    return literatureSpot?.visited;
                  }).length;
                  
                  return (
                    <div key={bookKey} className="border border-gray-200 rounded-lg">
                      {/* 책 헤더 */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-t-lg">
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 text-sm">{bookKey}</h4>
                            <p className="text-xs text-gray-500">
                              {completedInBook}/{spots.length} 완료
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleBookExpansion(bookKey)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                      
                      {/* 책의 장소들 */}
                      {isExpanded && (
                        <div className="p-2 space-y-1">
                          {spots.map((spot) => {
                            const literatureSpot = literatureSpots.find(ls => ls.id === spot.id);
                            const isVisited = literatureSpot?.visited;
                            
                            return (
                              <div 
                                key={spot.id} 
                                className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors duration-200"
                                onClick={() => handleSpotClick(spot.id)}
                              >
                                <div className={`w-2 h-2 rounded-full ${isVisited ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <span className={`flex-1 text-xs ${isVisited ? 'line-through text-gray-400' : 'text-gray-700 hover:text-blue-600'}`}>
                                  {spot.name}
                                </span>
                                {isVisited && (
                                  <span className="text-green-600 text-xs">✓</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* 사용자 기여 섹션 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="text-purple-500" size={18} />
              <span className="font-medium text-gray-700">사용자 기여</span>
            </div>
            <button
              onClick={onToggleUser}
              className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                showUser 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {showUser ? '숨기기' : '보이기'}
            </button>
          </div>
          
          {showUser && (
            <div className="ml-6 space-y-3">
              <p className="text-sm text-gray-500">
                총 {userSpots.length}개 장소
              </p>
              
              {userSpots.length === 0 ? (
                <p className="text-xs text-gray-400 italic">
                  아직 등록된 사용자 데이터가 없습니다
                </p>
              ) : (
                <div className="space-y-2">
                  {/* 카테고리별 표시 (체크박스 없이) */}
                  {Object.entries(userCategories).map(([categoryKey, categoryInfo]) => {
                    if (categoryInfo.count === 0) return null;
                    
                    return (
                      <div key={categoryKey} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2 flex-1">
                          <div className={`w-3 h-3 rounded-full ${categoryInfo.bg}`}></div>
                          <span className="text-sm text-gray-700">{categoryInfo.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {categoryInfo.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* 하단 통계 및 스페셜 콘텐츠 */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-4">
        {/* 진행률 */}
        <div className="text-sm text-gray-600">
          <div className="flex justify-between mb-2">
            <span>문학 기행 진행률:</span>
            <span className="font-medium">
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` 
              }}
            ></div>
          </div>
        </div>

        {/* 스페셜 콘텐츠 버튼 */}
        <div className="mt-4">
          <button
            onClick={isAllCompleted ? onSpecialContent : undefined}
            disabled={!isAllCompleted}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              isAllCompleted
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title={isAllCompleted ? '스페셜 콘텐츠 보기' : '모든 장소를 방문하면 열립니다'}
          >
            {isAllCompleted ? (
              <>
                <Star size={18} />
                <span>스페셜 콘텐츠</span>
              </>
            ) : (
              <>
                <Lock size={18} />
                <span>스페셜 콘텐츠</span>
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {isAllCompleted 
              ? '모든 장소를 완주했습니다! 🎉'
              : `${7 - completedCount}곳이 더 필요합니다`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapSidebar;