import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역 리소스
const resources = {
  ko: {
    translation: {
      // 네비게이션
      "nav.info": "소개",
      "nav.map": "지도", 
      "nav.agora": "참여마당",
      "nav.profile": "프로필",
      
      // 로그인 페이지
      "login.title": "Memory of 518",
      "login.subtitle": "Connecting Literature, Archival Records, and User-Generated Data",
      "login.signupDesc": "간단한 계정을 만들고 광주 문학 기행을 시작하세요",
      "login.loginDesc": "계정으로 로그인하세요",
      "login.userId": "아이디",
      "login.nickname": "닉네임",
      "login.password": "비밀번호",
      "login.userIdPlaceholder": "영문, 숫자 조합 (3글자 이상)",
      "login.nicknamePlaceholder": "다른 사용자에게 표시될 이름",
      "login.passwordPlaceholder": "6글자 이상",
      "login.signup": "계정 만들기",
      "login.signin": "로그인",
      "login.processing": "처리중...",
      "login.hasAccount": "이미 계정이 있으신가요? 로그인",
      "login.noAccount": "계정이 없으신가요? 계정 만들기",
      "login.description": "간단한 계정으로 진도 저장과 개인화 기능을 이용하세요",
      
      // 시작 페이지
      "start.welcome": "광주 문학 기행에 오신 여러분을 환영합니다.",
      "start.description": "《소년이 온다》를 기반으로 하는 광주의 이곳저곳에서 인터랙션을 경험하고 기록을 읽으며 뜻 깊은 시간을 보내시기 바랍니다. 광주에서의 추억을 갖고 계신다면, 다른 사람들에게 나눠주세요!",
      "start.button": "시작하기",
      
      // 메인 페이지
      "main.title": "광주 문학 기행",
      "main.subtitle": "《소년이 온다》 속 장소들을 따라 광주의 이야기를 만나보세요",
      "main.mapTitle": "광주광역시 문학 지도",
      
      // 사이드바
      "sidebar.filterTitle": "지도 필터",
      "sidebar.literature": "문학 기행",
      "sidebar.userContrib": "사용자 기여",
      "sidebar.hide": "숨기기",
      "sidebar.show": "보이기",
      "sidebar.totalSpots": "총 {{count}}개 장소",
      "sidebar.progressRate": "문학 기행 진행률:",
      
      // 문학 장소들
      "spots.sangmugwan": "상무관",
      "spots.jeonil": "금남로, 전일빌딩", 
      "spots.fountain": "도청 앞 분수대, 5·18 민주광장",
      "spots.sangmudae": "상무대 옛터, 5·18 자유공원",
      "spots.hospital": "국군광주(통합)병원",
      "spots.ywca": "광주 YWCA",
      "spots.mangwol": "망월묘지공원",
      
      // 버튼
      "button.startLiterature": "문학 기행 시작",
      "button.logout": "로그아웃",
      "button.edit": "수정",
      "button.save": "저장",
      "button.cancel": "취소",
      
      // 프로필
      "profile.title": "프로필",
      "profile.userInfo": "사용자 정보",
      "profile.accountManage": "계정 관리",
      "profile.joinDate": "가입일",
      "profile.progressTitle": "문학 기행 진행 상황",
      "profile.overallProgress": "전체 진행률",
      "profile.completed": "완료",
      "profile.completedSpots": "완료된 장소",
      "profile.noCompletedSpots": "아직 완료한 장소가 없습니다.",
      "profile.stamps": "수집한 스탬프",
      "profile.stampDesc": "7개를 모두 모으면 특별한 콘텐츠를 볼 수 있어요!",
      
      // 에러 메시지
      "error.userIdLength": "아이디는 3글자 이상이어야 합니다.",
      "error.passwordLength": "비밀번호는 6글자 이상이어야 합니다.",
      "error.userIdExists": "이미 사용중인 아이디입니다.",
      "error.nicknameRequired": "닉네임을 입력해주세요.",
      "error.userNotFound": "등록되지 않은 아이디입니다.",
      "error.wrongPassword": "비밀번호가 일치하지 않습니다.",
      "error.generic": "오류가 발생했습니다. 다시 시도해주세요."
    }
  },
  en: {
    translation: {
      // 네비게이션
      "nav.info": "About",
      "nav.map": "Map",
      "nav.agora": "Review", 
      "nav.profile": "Profile",
      
      // 로그인 페이지
      "login.title": "Memory of 518",
      "login.subtitle": "Connecting Literature, Archival Records, and User-Generated Data",
      "login.signupDesc": "Create a simple account and start your Gwangju literary journey",
      "login.loginDesc": "Login with your account",
      "login.userId": "User ID",
      "login.nickname": "Nickname",
      "login.password": "Password",
      "login.userIdPlaceholder": "Letters and numbers (3+ characters)",
      "login.nicknamePlaceholder": "Name displayed to other users",
      "login.passwordPlaceholder": "6+ characters",
      "login.signup": "Create Account",
      "login.signin": "Sign In",
      "login.processing": "Processing...",
      "login.hasAccount": "Already have an account? Sign in",
      "login.noAccount": "Don't have an account? Create one",
      "login.description": "Use a simple account to save progress and access personalized features",
      
      // 시작 페이지
      "start.welcome": "Welcome to the Gwangju Literary Journey.",
      "start.description": "Experience interactions and read records at various places in Gwangju based on 'Human Acts'. If you have memories of Gwangju, please share them with others!",
      "start.button": "Start Journey",
      
      // 메인 페이지
      "main.title": "Gwangju Literary Journey",
      "main.subtitle": "Discover Gwangju's stories by following the places in 'Human Acts'",
      "main.mapTitle": "Gwangju Metropolitan City Literary Map",
      
      // 사이드바
      "sidebar.filterTitle": "Map Filters",
      "sidebar.literature": "Literary Journey",
      "sidebar.userContrib": "User Contributions",
      "sidebar.hide": "Hide",
      "sidebar.show": "Show",
      "sidebar.totalSpots": "Total {{count}} locations",
      "sidebar.progressRate": "Literary journey progress:",
      
      // 문학 장소들
      "spots.sangmugwan": "Sangmu Hall",
      "spots.jeonil": "Geumnam-ro, Jeonil Building",
      "spots.fountain": "Provincial Office Fountain, May 18th Democracy Square", 
      "spots.sangmudae": "Former Sangmudae Site, May 18th Freedom Park",
      "spots.hospital": "Armed Forces Gwangju Hospital",
      "spots.ywca": "Gwangju YWCA",
      "spots.mangwol": "Mangwol Cemetery Park",
      
      // 버튼
      "button.startLiterature": "Start Literary Journey",
      "button.logout": "Logout",
      "button.edit": "Edit",
      "button.save": "Save", 
      "button.cancel": "Cancel",
      
      // 프로필
      "profile.title": "Profile",
      "profile.userInfo": "User Information",
      "profile.accountManage": "Account Management",
      "profile.joinDate": "Join Date",
      "profile.progressTitle": "Literary Journey Progress",
      "profile.overallProgress": "Overall Progress",
      "profile.completed": "Completed",
      "profile.completedSpots": "Completed Locations",
      "profile.noCompletedSpots": "No completed locations yet.",
      "profile.stamps": "Collected Stamps",
      "profile.stampDesc": "Collect all 7 to unlock special content!",
      
      // 에러 메시지
      "error.userIdLength": "User ID must be at least 3 characters.",
      "error.passwordLength": "Password must be at least 6 characters.",
      "error.userIdExists": "This user ID is already taken.",
      "error.nicknameRequired": "Please enter a nickname.",
      "error.userNotFound": "User ID not found.",
      "error.wrongPassword": "Incorrect password.",
      "error.generic": "An error occurred. Please try again."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;