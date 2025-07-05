// src/utils/imgbbUpload.js

/**
 * ImgBB API를 사용하여 이미지 업로드
 * 무료 계정: 월 1000장 업로드 가능
 */

const IMGBB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

/**
 * 이미지를 ImgBB에 업로드
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<string>} - 업로드된 이미지 URL
 */
export const uploadImageToImgBB = async (file) => {
  if (!IMGBB_API_KEY) {
    throw new Error('ImgBB API 키가 설정되지 않았습니다.');
  }

  // 파일 크기 제한 (32MB)
  const maxSize = 32 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('파일 크기가 너무 큽니다. (최대 32MB)');
  }

  // 이미지 파일 타입 확인
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('지원하지 않는 이미지 형식입니다.');
  }

  try {
    // FormData 생성
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return data.data.url; // 업로드된 이미지 URL 반환
    } else {
      throw new Error(data.error?.message || '업로드에 실패했습니다.');
    }
  } catch (error) {
    console.error('ImgBB 업로드 오류:', error);
    throw error;
  }
};

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};