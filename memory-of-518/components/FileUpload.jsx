// src/components/FileUpload.jsx
import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, Video, Loader } from 'lucide-react';
import { uploadFile, formatFileSize } from '../utils/fileUpload';

const FileUpload = ({ 
  type = 'image', // 'image' 또는 'video'
  userId,
  onUploadComplete,
  onUploadError,
  currentFile = null,
  onRemove = null
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const acceptedTypes = type === 'image' 
    ? 'image/jpeg,image/png,image/gif,image/webp'
    : 'video/mp4,video/webm,video/quicktime';

  const maxSize = type === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = async (file) => {
    if (!file) return;

    // 파일 크기 확인
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / 1024 / 1024;
      onUploadError(`파일 크기가 너무 큽니다. (최대 ${maxSizeMB}MB)`);
      return;
    }

    // 파일 타입 확인
    const allowedTypes = type === 'image' 
      ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      : ['video/mp4', 'video/webm', 'video/quicktime'];
    
    if (!allowedTypes.includes(file.type)) {
      onUploadError(`지원하지 않는 파일 형식입니다.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 업로드 진행률 시뮬레이션 (실제로는 Firebase에서 진행률을 제공하지 않음)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const downloadURL = await uploadFile(file, userId, type);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        onUploadComplete(downloadURL, file);
      }, 500);
      
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      onUploadError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const IconComponent = type === 'image' ? Image : Video;

  return (
    <div className="space-y-3">
      {/* 업로드된 파일 미리보기 */}
      {currentFile && !isUploading && (
        <div className="relative">
          {type === 'image' ? (
            <img 
              src={currentFile} 
              alt="업로드된 이미지"
              className="w-full h-48 object-cover rounded-lg border"
            />
          ) : (
            <video 
              src={currentFile}
              className="w-full h-48 object-cover rounded-lg border"
              controls
            />
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="파일 제거"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* 업로드 영역 */}
      {!currentFile && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300
            ${isDragging 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
            }
            ${isUploading ? 'pointer-events-none opacity-75' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            onChange={handleInputChange}
            className="hidden"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="space-y-3">
              <Loader className="mx-auto animate-spin text-orange-500" size={32} />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">업로드 중...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{uploadProgress}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <IconComponent className="mx-auto text-gray-400" size={32} />
              <div>
                <p className="text-gray-600 font-medium">
                  {type === 'image' ? '이미지' : '동영상'} 파일을 드래그하거나 클릭하여 업로드
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  최대 {formatFileSize(maxSize)} | {
                    type === 'image' 
                      ? 'JPG, PNG, GIF, WebP' 
                      : 'MP4, WebM, MOV'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;