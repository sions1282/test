import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Heart, Camera, Link, Filter, Loader, Edit, Trash2, X, Eye } from 'lucide-react';
import { collection, addDoc, getDocs, orderBy, query, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { addressToCoordinates, isGwangjuAddress, isInGwangju } from '../utils/geocoding';
import SimpleFileUpload from '../components/SimpleFileUpload';

const AgoraPage = ({ user, userProfile, onAddUserSpot, onUpdateUserSpot, onDeleteUserSpot }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [geocoding, setGeocoding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [formData, setFormData] = useState({
    placeName: '',
    category: '',
    address: '',
    reason: '',
    imageFile: null,
    youtubeUrl: ''
  });

  const [editFormData, setEditFormData] = useState({
    placeName: '',
    category: '',
    address: '',
    reason: '',
    imageFile: null,
    youtubeUrl: ''
  });

  // 카테고리별 색상 정의
  const categoryColors = {
    restaurant: { bg: 'bg-red-500', text: 'text-red-600', name: '식당' },
    cafe: { bg: 'bg-yellow-500', text: 'text-yellow-600', name: '카페' },
    museum: { bg: 'bg-purple-500', text: 'text-purple-600', name: '박물관' },
    heritage: { bg: 'bg-green-500', text: 'text-green-600', name: '유적지' },
    school: { bg: 'bg-blue-500', text: 'text-blue-600', name: '학교' },
    park: { bg: 'bg-emerald-500', text: 'text-emerald-600', name: '공원' },
    other: { bg: 'bg-gray-500', text: 'text-gray-600', name: '기타' }
  };

  useEffect(() => {
    loadUserPosts();
  }, []);

  const loadUserPosts = async () => {
    try {
      const q = query(collection(db, 'userSpots'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          coordinates: data.coordinates || { lat: 35.1595, lng: 126.8526 }
        };
      });
      setUserPosts(posts);
    } catch (error) {
      console.error('게시물 로드 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  // 이미지 업로드 핸들러들
  const handleImageUpload = (downloadURL, file) => {
    setFormData({
      ...formData,
      imageFile: downloadURL
    });
  };

  const handleEditImageUpload = (downloadURL, file) => {
    setEditFormData({
      ...editFormData,
      imageFile: downloadURL
    });
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, imageFile: null });
  };

  const handleRemoveEditImage = () => {
    setEditFormData({ ...editFormData, imageFile: null });
  };

  const handleUploadError = (error) => {
    alert(`업로드 오류: ${error}`);
  };

  const handleLikeToggle = async (postId, currentLikes, isLiked) => {
    try {
      const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
      await updateDoc(doc(db, 'userSpots', postId), {
        likes: newLikes
      });
      
      setUserPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: newLikes, likedBy: isLiked 
                ? (post.likedBy || []).filter(uid => uid !== user.uid)
                : [...(post.likedBy || []), user.uid] }
            : post
        )
      );
    } catch (error) {
      console.error('좋아요 업데이트 오류:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await deleteDoc(doc(db, 'userSpots', postId));
      setUserPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      
      if (onDeleteUserSpot) {
        onDeleteUserSpot(postId);
      }
      
      alert('게시물이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const openEditForm = (post) => {
    setSelectedPost(post);
    setEditFormData({
      placeName: post.placeName,
      category: post.category,
      address: post.address,
      reason: post.reason,
      imageFile: post.imageUrl || null,
      youtubeUrl: post.youtubeUrl || ''
    });
    setShowEditForm(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    
    if (!editFormData.placeName || !editFormData.category || !editFormData.address || !editFormData.reason) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!isGwangjuAddress(editFormData.address)) {
      alert('광주광역시 내의 주소만 등록 가능합니다.');
      return;
    }

    setGeocoding(true);

    try {
      let coordinates = selectedPost.coordinates;
      if (editFormData.address !== selectedPost.address) {
        coordinates = await addressToCoordinates(editFormData.address);
        
        if (!coordinates) {
          alert('주소를 찾을 수 없습니다. 정확한 주소를 입력해주세요.');
          setGeocoding(false);
          return;
        }

        if (!isInGwangju(coordinates.lat, coordinates.lng)) {
          alert('광주광역시 범위를 벗어난 주소입니다.');
          setGeocoding(false);
          return;
        }
      }

      const updatedData = {
        placeName: editFormData.placeName,
        category: editFormData.category,
        address: editFormData.address,
        reason: editFormData.reason,
        imageUrl: editFormData.imageFile || null,
        youtubeUrl: editFormData.youtubeUrl || null,
        coordinates: coordinates,
        updatedAt: new Date()
      };

      await updateDoc(doc(db, 'userSpots', selectedPost.id), updatedData);
      
      setUserPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === selectedPost.id 
            ? { ...post, ...updatedData }
            : post
        )
      );

      if (onUpdateUserSpot) {
        onUpdateUserSpot({
          id: selectedPost.id,
          name: editFormData.placeName,
          category: editFormData.category,
          address: editFormData.address,
          reason: editFormData.reason,
          authorName: selectedPost.authorName,
          position: [coordinates.lat, coordinates.lng]
        });
      }

      setShowEditForm(false);
      setSelectedPost(null);
      alert('게시물이 수정되었습니다.');
    } catch (error) {
      console.error('수정 오류:', error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setGeocoding(false);
    }
  };

  const openDetailModal = (post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.placeName || !formData.category || !formData.address || !formData.reason) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (!isGwangjuAddress(formData.address)) {
      alert('광주광역시 내의 주소만 등록 가능합니다.');
      return;
    }

    setGeocoding(true);

    try {
      console.log('주소 변환 시도:', formData.address);
      const coordinates = await addressToCoordinates(formData.address);
      console.log('변환된 좌표:', coordinates);
      
      if (!coordinates) {
        alert('주소를 찾을 수 없습니다. 정확한 주소를 입력해주세요.');
        setGeocoding(false);
        return;
      }

      if (!isInGwangju(coordinates.lat, coordinates.lng)) {
        alert('광주광역시 범위를 벗어난 주소입니다.');
        setGeocoding(false);
        return;
      }

      const newPost = {
        placeName: formData.placeName,
        category: formData.category,
        address: formData.address,
        reason: formData.reason,
        imageUrl: formData.imageFile || null,
        youtubeUrl: formData.youtubeUrl || null,
        authorName: userProfile.nickname,
        authorId: user.uid,
        coordinates: coordinates,
        createdAt: new Date(),
        likes: 0
      };

      console.log('Firebase에 저장할 데이터:', newPost);
      const docRef = await addDoc(collection(db, 'userSpots'), newPost);
      
      const spotForMap = {
        id: docRef.id,
        name: formData.placeName,
        category: formData.category,
        address: formData.address,
        reason: formData.reason,
        authorName: userProfile.nickname,
        position: [coordinates.lat, coordinates.lng]
      };
      
      console.log('지도에 추가할 마커:', spotForMap);
      if (onAddUserSpot) {
        onAddUserSpot(spotForMap);
      }

      setFormData({
        placeName: '',
        category: '',
        address: '',
        reason: '',
        imageFile: null,
        youtubeUrl: ''
      });
      setShowAddForm(false);
      loadUserPosts();
      
      alert('장소가 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('등록 오류:', error);
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setGeocoding(false);
    }
  };

  const filteredPosts = selectedCategory === 'all' 
    ? userPosts 
    : userPosts.filter(post => post.category === selectedCategory);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">Agora</h2>
        <p className="text-xl text-gray-600 mb-6">
          광주에서의 추억을 다른 사람들과 나눠주세요
        </p>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Plus size={20} />
          <span>내 장소 등록하기</span>
        </button>
      </div>

      {/* 필터 */}
      <div className="flex items-center space-x-4 mb-8">
        <Filter size={20} className="text-gray-500" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">전체 카테고리</option>
          {Object.entries(categoryColors).map(([key, config]) => (
            <option key={key} value={key}>{config.name}</option>
          ))}
        </select>
      </div>

      {/* 게시물 그리드 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500">게시물을 불러오는 중...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isOwner = post.authorId === user?.uid;
            const isLiked = post.likedBy?.includes(user?.uid) || false;
            
            return (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                
                {/* 소유자 액션 버튼 */}
                {isOwner && (
                  <div className="absolute top-2 right-2 z-10 flex space-x-1">
                    <button
                      onClick={() => openEditForm(post)}
                      className="p-1.5 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors shadow-lg"
                      title="수정"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      title="삭제"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                {/* 미디어 */}
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.placeName}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openDetailModal(post)}
                  />
                )}
                {post.youtubeUrl && getYouTubeEmbedUrl(post.youtubeUrl) && (
                  <iframe
                    src={getYouTubeEmbedUrl(post.youtubeUrl)}
                    className="w-full h-48"
                    frameBorder="0"
                    allowFullScreen
                    title={`YouTube video for ${post.placeName}`}
                  ></iframe>
                )}
                
                {/* 콘텐츠 */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]?.bg} text-white`}>
                      {categoryColors[post.category]?.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLikeToggle(post.id, post.likes || 0, isLiked)}
                        className={`flex items-center space-x-1 transition-colors ${
                          isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                        <span className="text-sm">{post.likes || 0}</span>
                      </button>
                      <button
                        onClick={() => openDetailModal(post)}
                        className="text-gray-500 hover:text-blue-500 transition-colors"
                        title="상세보기"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:text-orange-600 transition-colors"
                    onClick={() => openDetailModal(post)}
                  >
                    {post.placeName}
                  </h3>
                  
                  <div className="flex items-center space-x-1 text-gray-500 mb-3">
                    <MapPin size={14} />
                    <span className="text-sm">{post.address}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {post.reason.length > 100 ? `${post.reason.substring(0, 100)}...` : post.reason}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>by {post.authorName}</span>
                    <span>{post.createdAt?.toDate?.()?.toLocaleDateString() || '방금 전'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredPosts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">아직 등록된 장소가 없습니다.</div>
          <button
            onClick={() => setShowAddForm(true)}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            첫 번째 장소를 등록해보세요!
          </button>
        </div>
      )}

      {/* 등록 폼 모달 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">새 장소 등록</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      장소명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="placeName"
                      value={formData.placeName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="장소 이름을 입력하세요"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      분류 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">선택해주세요</option>
                      {Object.entries(categoryColors).map(([key, config]) => (
                        <option key={key} value={key}>{config.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="상세 주소를 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    공유하는 이유 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="이 장소에 대한 당신의 이야기를 들려주세요..."
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">추가 자료 (선택사항)</h4>
                  
                  <div className="space-y-6">
                    {/* 이미지 업로드 */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                        <Camera size={16} />
                        <span>이미지 첨부</span>
                      </label>
                      <SimpleFileUpload
                        onUploadComplete={handleImageUpload}
                        onUploadError={handleUploadError}
                        currentFile={formData.imageFile}
                        onRemove={handleRemoveImage}
                      />
                    </div>

                    {/* 유튜브 링크 */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Link size={16} />
                        <span>유튜브 링크</span>
                      </label>
                      <input
                        type="url"
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={geocoding}
                    className={`flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2 ${
                      geocoding ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {geocoding ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>위치 확인 중...</span>
                      </>
                    ) : (
                      <span>등록하기</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 수정 폼 모달 */}
      {showEditForm && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">장소 수정</h3>
              
              <form onSubmit={handleEdit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      장소명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="placeName"
                      value={editFormData.placeName}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="장소 이름을 입력하세요"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      분류 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">선택해주세요</option>
                      {Object.entries(categoryColors).map(([key, config]) => (
                        <option key={key} value={key}>{config.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="상세 주소를 입력하세요"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    공유하는 이유 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={editFormData.reason}
                    onChange={handleEditInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="이 장소에 대한 당신의 이야기를 들려주세요..."
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">추가 자료 (선택사항)</h4>
                  
                  <div className="space-y-6">
                    {/* 이미지 업로드 */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                        <Camera size={16} />
                        <span>이미지 첨부</span>
                      </label>
                      <SimpleFileUpload
                        onUploadComplete={handleEditImageUpload}
                        onUploadError={handleUploadError}
                        currentFile={editFormData.imageFile}
                        onRemove={handleRemoveEditImage}
                      />
                    </div>

                    {/* 유튜브 링크 */}
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Link size={16} />
                        <span>유튜브 링크</span>
                      </label>
                      <input
                        type="url"
                        name="youtubeUrl"
                        value={editFormData.youtubeUrl}
                        onChange={handleEditInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setSelectedPost(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={geocoding}
                    className={`flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2 ${
                      geocoding ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {geocoding ? (
                      <>
                        <Loader size={16} className="animate-spin" />
                        <span>위치 확인 중...</span>
                      </>
                    ) : (
                      <span>수정하기</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 상세보기 모달 */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedPost(null);
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
              >
                <X size={20} />
              </button>

              {(selectedPost.imageUrl || selectedPost.youtubeUrl) && (
                <div className="relative">
                  {selectedPost.imageUrl && (
                    <img 
                      src={selectedPost.imageUrl} 
                      alt={selectedPost.placeName}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  )}
                  {selectedPost.youtubeUrl && getYouTubeEmbedUrl(selectedPost.youtubeUrl) && (
                    <iframe
                      src={getYouTubeEmbedUrl(selectedPost.youtubeUrl)}
                      className="w-full h-64 md:h-96"
                      frameBorder="0"
                      allowFullScreen
                      title={`YouTube video for ${selectedPost.placeName}`}
                    ></iframe>
                  )}
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[selectedPost.category]?.bg} text-white`}>
                        {categoryColors[selectedPost.category]?.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLikeToggle(selectedPost.id, selectedPost.likes || 0, selectedPost.likedBy?.includes(user?.uid) || false)}
                          className={`flex items-center space-x-1 transition-colors ${
                            selectedPost.likedBy?.includes(user?.uid) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart size={20} fill={selectedPost.likedBy?.includes(user?.uid) ? 'currentColor' : 'none'} />
                          <span>{selectedPost.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                      {selectedPost.placeName}
                    </h2>
                    
                    <div className="flex items-center space-x-2 text-gray-500 mb-4">
                      <MapPin size={16} />
                      <span>{selectedPost.address}</span>
                    </div>
                  </div>

                  {selectedPost.authorId === user?.uid && (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setShowDetailModal(false);
                          openEditForm(selectedPost);
                        }}
                        className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                        title="수정"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setShowDetailModal(false);
                          handleDelete(selectedPost.id);
                        }}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="prose max-w-none mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">이야기</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedPost.reason}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-medium">작성자: {selectedPost.authorName}</span>
                    <span>
                      {selectedPost.createdAt?.toDate?.()?.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {selectedPost.updatedAt && (
                    <div className="text-xs text-gray-400 mt-1">
                      수정됨: {selectedPost.updatedAt?.toDate?.()?.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgoraPage;