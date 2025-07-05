// src/utils/fileUpload.js
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

/**
 * 파일을 Firebase Storage에 업로드
 * @param {File} file - 업로드할 파일
 * @param {string} userId - 사용자 ID
 * @param {string} type - 파일 타입 ('image' 또는 'video')
 * @returns {Promise<string>} - 다운로드 URL
 */
export const uploadFile = async (file, userId, type = 'image') => {
  if (!file) throw new Error('파일이 선택되지 않았습니다.');
  
  // 파일 크기 제한 (이미지: 5MB, 비디오: 50MB)
  const maxSize = type === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`파일 크기가 너무 큽니다. (최대 ${maxSize / 1024 / 1024}MB)`);
  }
  
  // 파일 타입 확인
  const allowedTypes = type === 'image' 
    ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    : ['video/mp4', 'video/webm', 'video/quicktime'];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`지원하지 않는 파일 형식입니다. (${allowedTypes.join(', ')})`);
  }
  
  // 파일명 생성 (타임스탬프 + 랜덤값으로 중복 방지)
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2);
  const fileExtension = file.name.split('.').pop();
  const fileName = `${timestamp}_${randomId}.${fileExtension}`;
  
  // Storage 경로 설정
  const storageRef = ref(storage, `user-uploads/${userId}/${type}s/${fileName}`);
  
  try {
    // 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);
    console.log('파일 업로드 완료:', snapshot);
    
    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    throw error;
  }
};

/**
 * Firebase Storage에서 파일 삭제
 * @param {string} fileUrl - 삭제할 파일의 URL
 */
export const deleteFile = async (fileUrl) => {
  if (!fileUrl) return;
  
  try {
    // URL에서 Storage 경로 추출
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/memory-of-518.firebasestorage.app/o/';
    if (!fileUrl.startsWith(baseUrl)) return;
    
    const filePath = decodeURIComponent(
      fileUrl.substring(baseUrl.length).split('?')[0]
    );
    
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    console.log('파일 삭제 완료:', filePath);
  } catch (error) {
    console.error('파일 삭제 오류:', error);
  }
};

/**
 * 파일 크기를 읽기 쉬운 형식으로 변환
 * @param {number} bytes - 바이트 단위 크기
 * @returns {string} - 포맷된 크기 문자열
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};