// src/utils/geocoding.js

/**
 * 카카오 지도 API를 사용하여 주소를 좌표로 변환
 * @param {string} address - 변환할 주소
 * @returns {Promise<{lat: number, lng: number} | null>} - 좌표 또는 null
 */
export const addressToCoordinates = async (address) => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  
  if (!apiKey) {
    console.error('카카오 API 키가 설정되지 않았습니다.');
    return null;
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
      {
        headers: {
          'Authorization': `KakaoAK ${apiKey}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.documents && data.documents.length > 0) {
      const result = data.documents[0];
      return {
        lat: parseFloat(result.y), // 위도
        lng: parseFloat(result.x)  // 경도
      };
    } else {
      console.warn('주소를 찾을 수 없습니다:', address);
      return null;
    }
  } catch (error) {
    console.error('지오코딩 오류:', error);
    return null;
  }
};

/**
 * 광주광역시 내의 주소인지 확인
 * @param {number} lat - 위도
 * @param {number} lng - 경도
 * @returns {boolean} - 광주시 내 여부
 */
export const isInGwangju = (lat, lng) => {
  // 광주광역시 대략적 경계
  const gwangjuBounds = {
    north: 35.24,
    south: 35.08,
    east: 126.94,
    west: 126.78
  };

  return (
    lat >= gwangjuBounds.south &&
    lat <= gwangjuBounds.north &&
    lng >= gwangjuBounds.west &&
    lng <= gwangjuBounds.east
  );
};

/**
 * 주소 유효성 검사 (광주광역시 주소인지 확인)
 * @param {string} address - 검사할 주소
 * @returns {boolean} - 광주시 주소 여부
 */
export const isGwangjuAddress = (address) => {
  const gwangjuKeywords = [
    '광주광역시',
    '광주시',
    '광주',
    '동구',
    '서구', 
    '남구',
    '북구',
    '광산구'
  ];

  return gwangjuKeywords.some(keyword => address.includes(keyword));
};