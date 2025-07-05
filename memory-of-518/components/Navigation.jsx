import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navigation = ({ currentPage, onPageChange }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { t, i18n } = useTranslation();

  const menuItems = [
    {
      id: 'info',
      label: t('nav.info'),
      submenu: [
        { 
          id: 'about-518', 
          label: i18n.language === 'ko' ? '5·18광주민주화운동에 대하여' : 'About May 18 (5·18)'
        },
        { 
          id: '518-literature', 
          label: i18n.language === 'ko' ? '오월문학에 대하여' : 'About May Literature'
        },
        { 
          id: 'creators', 
          label: i18n.language === 'ko' ? 'Memory of 518에 대하여' : 'About Us'
        }
      ]
    },
    {
      id: 'map',
      label: t('nav.map'),
      submenu: null
    },
    {
      id: 'agora',
      label: t('nav.agora'),
      submenu: null
    }
  ];

  const handleMouseEnter = (menuId) => {
    setActiveDropdown(menuId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleMenuClick = (menuId, submenuId = null) => {
    // Info 메뉴 자체를 클릭했을 때는 about-518 페이지로 이동
    if (menuId === 'info' && !submenuId) {
      if (onPageChange) {
        onPageChange('about-518');
      }
      setActiveDropdown(null);
      return;
    }
    
    if (onPageChange) {
      onPageChange(submenuId || menuId);
    }
    setActiveDropdown(null);
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    console.log('언어 전환:', newLang);
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-orange-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <button
              onClick={() => handleMenuClick('home')}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
            >
              Memory of 518
            </button>
          </div>
          
          {/* 메뉴와 언어 전환 */}
          <div className="flex items-center space-x-6">
            {/* 언어 전환 버튼 - 깔끔한 디자인 */}
            <button
              onClick={handleLanguageToggle}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 border border-gray-300 hover:border-orange-400"
              title={i18n.language === 'ko' ? 'Switch to English' : '한국어로 전환'}
            >
              <span className="text-sm font-medium text-gray-700">
                {i18n.language === 'ko' ? 'Korean' : 'English'}
              </span>
            </button>
            
            {/* 메뉴 */}
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`px-4 py-2 font-medium text-lg transition-all duration-300 ${
                      currentPage === item.id || 
                      (item.id === 'info' && ['about-518', '518-literature', 'creators'].includes(currentPage))
                        ? 'text-orange-600 border-b-3 border-orange-600'
                        : 'text-gray-700 hover:text-orange-600'
                    }`}
                  >
                    {item.label}
                  </button>
                  
                  {/* 드롭다운 메뉴 */}
                  {item.submenu && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      {item.submenu.map((subitem) => (
                        <button
                          key={subitem.id}
                          onClick={() => handleMenuClick(item.id, subitem.id)}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-orange-600 transition-colors duration-200"
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* 프로필 아이콘 - 성별 중립적 디자인 */}
              <button
                onClick={() => handleMenuClick('profile')}
                className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center text-lg font-semibold ${
                  currentPage === 'profile'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                }`}
                title={t('nav.profile')}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="text-current"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;