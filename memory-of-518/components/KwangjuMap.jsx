import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { literatureSpotsArray } from '../data/literatureSpots';

// Leaflet 아이콘 문제 해결
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const KwangjuMap = ({ onSpotClick, showLiterature = true, showUser = true, literatureSpots = [], userSpots = [], focusSpotId }) => {
  // 디버깅용 로그
  console.log('KwangjuMap - showLiterature:', showLiterature, 'showUser:', showUser);

  // 지도 제어 컴포넌트
  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      if (focusSpotId) {
        const spot = spotsToShow.find(s => s.id === focusSpotId);
        if (spot) {
          // 모든 장소를 동일하게 처리 - 간단하게!
          map.setView(spot.position, 16, {
            animate: true,
            duration: 1.0
          });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusSpotId, map]);
    
    return null;
  };

  // 광주광역시 중심 좌표
  const kwangjuCenter = [35.1595, 126.8526];
  
  // 광주광역시 경계 - 망월동까지 포함하도록 충분히 확장
  const kwangjuBounds = [
    [35.0600, 126.7600], // 남서쪽 모서리 (더 넓게)
    [35.2300, 126.9600]  // 북동쪽 모서리 (망월동 35.2041, 126.9421을 충분히 포함)
  ];

  // props에서 받은 데이터가 있으면 사용, 없으면 기본 데이터 사용
  const spotsToShow = literatureSpots.length > 0 ? literatureSpots : literatureSpotsArray;

  // 문학 기행 마커 - 더 눈에 띄는 스타일
  const createLiteratureIcon = (visited) => {
    return L.divIcon({
      className: 'literature-marker',
      html: `<div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${visited ? 
          'linear-gradient(135deg, #10b981, #059669)' : 
          'linear-gradient(135deg, #f59e0b, #d97706)'
        };
        border: 4px solid #ffffff;
        box-shadow: 
          0 4px 12px rgba(0,0,0,0.3),
          0 0 0 2px ${visited ? '#10b981' : '#f59e0b'};
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        ">${visited ? '✓' : '📖'}</div>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // 사용자 마커 생성 함수 - 카테고리별 색상
  const createUserIcon = (category) => {
    const categoryColors = {
      restaurant: '#ef4444', // 빨강
      cafe: '#eab308',       // 노랑
      museum: '#a855f7',     // 보라
      heritage: '#22c55e',   // 초록
      school: '#3b82f6',     // 파랑
      park: '#10b981',       // 에메랄드
      other: '#6b7280'       // 회색
    };
    
    const color = categoryColors[category] || '#6b7280';
    
    return L.divIcon({
      className: 'user-marker',
      html: `<div style="
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid #ffffff;
        box-shadow: 
          0 2px 6px rgba(0,0,0,0.3),
          0 0 0 1px ${color};
        cursor: pointer;
        position: relative;
      "></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  };

  const handleLiteratureSpotClick = (spot, event) => {
    // 이벤트 전파 중지 (중요!)
    if (event) {
      event.stopPropagation();
      L.DomEvent.stopPropagation(event);
    }
    
    console.log(`문학 기행지 ${spot.name} 답사 시작!`);
    if (onSpotClick) {
      onSpotClick(spot.id);
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md border border-gray-200">
      <MapContainer
        center={kwangjuCenter}
        zoom={13}
        minZoom={12}
        maxZoom={18}
        maxBounds={kwangjuBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        {/* 지도 제어 컴포넌트 */}
        <MapController />
        
        {/* 지도 타일 레이어 - 도시 아이콘 많은 스타일 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={18}
        />
        
        {/* 문학 기행 장소 마커들 - showLiterature가 true일 때만 표시 */}
        {showLiterature && spotsToShow.map((spot) => (
          <Marker
            key={spot.id}
            position={spot.position}
            icon={createLiteratureIcon(spot.visited)}
          >
            <Popup className="custom-popup" closeButton={true} autoClose={false}>
              <div className="text-center p-3 min-w-[200px]">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {spot.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{spot.address}</p>
                
                <div className="mb-3">
                  {spot.visited ? (
                    <div className="flex items-center justify-center space-x-1 text-green-600 mb-2">
                      <span className="text-sm">✓</span>
                      <span className="text-sm font-medium">완료된 장소</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-1 text-orange-600 mb-2">
                      <span className="text-sm">📖</span>
                      <span className="text-sm font-medium">미완료 장소</span>
                    </div>
                  )}
                </div>
                
                <button 
                  className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    spot.visited 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleLiteratureSpotClick(spot, e);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {spot.visited ? '다시 답사하기' : '답사가기'}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 사용자 마커들 - showUser가 true일 때만 표시 */}
        {showUser && userSpots.map((userSpot, index) => (
          <Marker
            key={`user-${index}`}
            position={userSpot.position || [35.1595, 126.8526]}
            icon={createUserIcon(userSpot.category)}
          >
            <Popup className="custom-popup">
              <div className="text-center p-3 min-w-[180px]">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {userSpot.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{userSpot.address}</p>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {userSpot.reason && userSpot.reason.length > 80 
                    ? `${userSpot.reason.substring(0, 80)}...` 
                    : userSpot.reason || '사용자가 등록한 장소'}
                </p>
                {userSpot.authorName && (
                  <p className="text-xs text-gray-400">
                    <span className="font-medium">작성자:</span> {userSpot.authorName}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* 커스텀 CSS 스타일 */}
      <style jsx>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border: none;
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: none;
          box-shadow: none;
        }
        
        .literature-marker:hover {
          transform: scale(1.1);
        }
        
        .user-marker:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default KwangjuMap;