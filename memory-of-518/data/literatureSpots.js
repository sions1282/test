// src/data/literatureSpots.js - 책 정보 추가

export const literatureSpots = {
  1: {
    id: 1,
    name: "상무관, 옛 전남도청",
    book: "소년이 온다", // 책 제목 추가
    author: "한강", // 작가 추가
    position: [35.1496, 126.9186],
    address: "광주광역시 동구 금남로 1가 12-1 (문화전당로 38)",
    quote: "\"내가 뭘 했다고 죽어. 여기서 잔일 거든 거밖에 없는데.\n세차게 팔을 잡아당겨 너는 엄마의 손을 떨쳐냈다.\n걱정 마요, 며칠만 일 거들다가 들어갈게요. 정대 찾아서.\n어색하게 손을 흔들며 너는 *상무관*으로 뛰어들어갔다.\"",
    source: "- 한강, 『소년이 온다』, 30쪽.",
    interaction: {
      title: "심부름",
      description: "1980년 5월, 상무관에서 시민들을 도왔던 학생들의 마음을 체험해보세요.",
      component: "SangmugwanInteraction"
    },
    explanation: {
      title: "상무관 인터랙션 해설",
      content: "방금 체험한 인터랙션은 1980년 5월 상무관에서 일어난 시민들의 모습을 재현한 것입니다. 당시 많은 학생들이 자원봉사자로 나서서 시민들을 도왔으며, 주인공 동호도 그 중 한 명이었습니다. 상무관은 시민들이 모여 서로를 위로하고 도움을 주고받던 따뜻한 공간이었습니다."
    },
    archive: {
      title: "상무관 아카이브",
      images: [
        { url: "/api/placeholder/600/400", caption: "1980년 상무관에서 자원봉사하는 학생들" },
        { url: "/api/placeholder/600/400", caption: "현재의 상무관 모습" },
        { url: "/api/placeholder/600/400", caption: "상무관 내부 전경" }
      ],
      videos: [
        { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "상무관의 역사와 5·18" }
      ],
      texts: [
        {
          title: "역사적 배경",
          content: "상무관은 광주광역시 동구에 위치한 문화예술 공연장으로, 5·18 민주화운동 당시 중요한 역할을 했습니다."
        }
      ]
    }
  },

  2: {
    id: 2,
    name: "전일빌딩, 금남로",
    book: "소년이 온다",
    author: "한강",
    position: [35.1489, 126.9195],
    address: "광주광역시 동구 금남로 245 (금남로1가 1번지)",
    quote: "\"금요일 아침, 너는 집을 나서면서 정대에게 하지 못한 말을 속으로 되뇌었다.\n형, 나도 갈게.\n*금남로*를 가로질러 *전일빌딩*으로 향하는 발걸음이 무거웠다.\"",
    source: "- 한강, 『소년이 온다』, 45쪽.",
    interaction: {
      title: "금남로 시위 행진",
      description: "1980년 5월, 금남로에서 벌어진 시민들의 평화 시위를 체험해보세요.",
      component: "JeonilBuildingInteraction"
    },
    explanation: {
      title: "금남로 인터랙션 해설",
      content: "금남로는 5·18 민주화운동의 중심지였습니다. 이 거리에서 수많은 시민들이 민주주의를 외치며 행진했고, 전일빌딩은 시민군의 본부 역할을 했습니다."
    },
    archive: {
      title: "전일빌딩, 금남로 아카이브",
      images: [
        { url: "/api/placeholder/600/400", caption: "1980년 금남로 시위 모습" },
        { url: "/api/placeholder/600/400", caption: "전일빌딩 전경" },
        { url: "/api/placeholder/600/400", caption: "현재의 금남로" }
      ],
      videos: [
        { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "금남로의 기억, 5·18의 중심가" }
      ],
      texts: [
        {
          title: "금남로의 의미",
          content: "금남로는 광주의 중심가로, 5·18 민주화운동 당시 시민들이 모여 민주주의를 외쳤던 상징적인 장소입니다."
        }
      ]
    }
  },

  3: {
    id: 3,
    name: "도청 앞 분수대, 5·18민주광장",
    book: "소년이 온다",
    author: "한강",
    position: [35.1481, 126.9198],
    address: "광주광역시 동구 광산동 13 (5·18 민주광장)",
    quote: "\"*도청 앞 분수대*에는 이미 수많은 사람들이 모여 있었다.\n너는 그들 사이를 비집고 들어가며 정대의 모습을 찾았다.\n하지만 정대는 보이지 않았다.\"",
    source: "- 한강, 『소년이 온다』, 52쪽.",
    interaction: {
      title: "분수대 집회 참여",
      description: "시민들이 모여 평화적으로 집회를 여는 모습을 체험해보세요.",
      component: "FountainInteraction"
    },
    explanation: {
      title: "민주광장 인터랙션 해설",
      content: "도청 앞 분수대(현재의 5·18 민주광장)는 시민들이 모여 집회를 열고 서로의 안전을 확인하던 장소였습니다."
    },
    archive: {
      title: "5·18 민주광장 아카이브",
      images: [
        { url: "/api/placeholder/600/400", caption: "1980년 도청 앞 분수대 집회" },
        { url: "/api/placeholder/600/400", caption: "현재의 5·18 민주광장" }
      ],
      videos: [
        { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "민주광장의 역사" }
      ],
      texts: [
        {
          title: "민주광장의 의미",
          content: "5·18 민주광장은 광주 시민들이 민주주의를 외치며 모였던 상징적인 공간입니다."
        }
      ]
    }
  },

  4: {
    id: 4,
    name: "상무대 영창, 5·18자유공원",
    book: "소년이 온다",
    author: "한강",
    position: [35.1275, 126.8435],
    address: "광주 서구 상무평화로 13",
    quote: "\"*상무대*로 끌려간 사람들의 소식은 들려오지 않았다.\n그곳에서 무슨 일이 일어났는지, 아무도 정확히 알 수 없었다.\"",
    source: "- 한강, 『소년이 온다』, 78쪽.",
    interaction: {
      title: "기억의 공간 탐색",
      description: "상무대에서 일어난 일들을 기억하며 평화의 의미를 생각해보세요.",
      component: "SangmudaeInteraction"
    },
    explanation: {
      title: "자유공원 인터랙션 해설",
      content: "상무대는 5·18 당시 계엄군의 거점이었던 곳입니다. 현재는 5·18 자유공원으로 조성되어 평화와 자유의 소중함을 일깨워주는 공간이 되었습니다."
    },
    archive: {
      title: "5·18 자유공원 아카이브",
      images: [
        { url: "/api/placeholder/600/400", caption: "옛 상무대 모습" },
        { url: "/api/placeholder/600/400", caption: "5·18 자유공원 전경" }
      ],
      videos: [
        { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "상무대에서 자유공원으로" }
      ],
      texts: [
        {
          title: "상무대의 과거",
          content: "상무대는 5·18 당시 계엄군의 주요 거점이었으며, 많은 시민들이 이곳으로 연행되었습니다."
        }
      ]
    }
  },

  5: {
    id: 5,
    name: "국군광주(통합)병원",
    book: "소년이 온다",
    author: "한강",
    position: [35.1298, 126.8503],
    address: "광주 서구 상무대로 1028",
    quote: "\"*병원*으로 실려온 사람들의 신음소리가 복도에 가득했다.\n너는 그 소리를 듣고 있을 수가 없어서 밖으로 나왔다.\"",
    source: "- 한강, 『소년이 온다』, 95쪽.",
    interaction: {
      title: "치료와 돌봄",
      description: "부상자들을 돌보는 의료진과 자원봉사자들의 마음을 체험해보세요.",
      component: "HospitalInteraction"
    },
    explanation: {
      title: "병원 인터랙션 해설",
      content: "국군광주병원은 5·18 당시 부상자들이 치료받던 곳입니다. 의료진들과 자원봉사자들이 밤낮없이 부상자들을 돌보며 생명을 구하기 위해 노력했습니다."
    },
    archive: {
      title: "국군광주병원 아카이브",
      images: [
        { url: "/api/placeholder/600/400", caption: "1980년 병원 응급실" },
        { url: "/api/placeholder/600/400", caption: "치료받는 부상자들" }
      ],
      videos: [
        { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "병원의 기록" }
      ],
      texts: [
        {
          title: "의료진의 노력",
          content: "5·18 당시 의료진들은 부상자들을 치료하기 위해 최선을 다했습니다."
        }
      ]
    }
  },

  6: {
    id: 6,
    name: "구 광주 YWCA",
    book: "소년이 온다", // 다른 책으로 설정
    author: "한강",
    position: [35.1485, 126.9203],
    address: "광주광역시 동구 금남로 264(금남로1가)",
    quote: "\"*YWCA*에서는 여성들이 주도하여 구호 활동을 펼치고 있었다.\n그들의 따뜻한 손길이 상처받은 이들에게 위로가 되었다.\"",
    source: "- 홍희담, 『그대에게 보내는 편지』, 112쪽.",
    interaction: {
      title: "여성들의 연대",
      description: "여성들이 중심이 되어 펼친 구호 활동을 체험해보세요.",
      component: "YWCAInteraction"
    },
    explanation: {
      title: "YWCA 인터랙션 해설",
      content: "광주 YWCA는 5·18 당시 여성들이 중심이 되어 구호 활동을 펼친 곳입니다. 여성들의 따뜻한 손길과 연대 정신이 어두운 시기를 밝혀주었습니다."
    },
    archive: {
      title: "광주 YWCA 아카이브",
      images: [
        { url: "/api/placeholder/600/400", caption: "YWCA 구호 활동" },
        { url: "/api/placeholder/600/400", caption: "여성들의 연대" }
      ],
      videos: [
        { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "YWCA와 5·18" }
      ],
      texts: [
        {
          title: "여성들의 역할",
          content: "5·18 당시 여성들은 구호 활동의 중심 역할을 했습니다."
        }
      ]
    }
  },

  7: {
    id: 7,
    name: "망월동 5·18묘역",
    book: "그대에게 보내는 편지",
    author: "홍희담",
    position: [35.2041, 126.9421],
    address: "광주광역시 북구 민주로 285",
    quote: "\"*망월동*의 언덕에는 너무 많은 무덤들이 생겨났다.\n그들은 모두 너무 젊었고, 너무 일찍 떠났다.\"",
    source: "- 한강, 『소년이 온다』, 128쪽.",
    interaction: {
      title: "추모와 기억",
      description: "5·18 영령들을 추모하며 그들의 희생을 기억해보세요.",
      component: "MangwolInteraction"
    },
    explanation: {
      title: "망월묘지 인터랙션 해설",
      content: "망월묘지공원은 5·18 희생자들이 잠들어 있는 곳입니다. 이곳에서 우리는 그들의 희생을 기억하고 민주주의의 소중함을 되새깁니다."
    },
    archive: {
      title: "망월묘지공원 아카이브",
      images: [
        { url: "/api/placeholder/600/400", caption: "망월묘지 전경" },
        { url: "/api/placeholder/600/400", caption: "5·18 묘역" }
      ],
      videos: [
        { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "망월동의 기억" }
      ],
      texts: [
        {
          title: "영원한 안식처",
          content: "망월묘지공원은 5·18 희생자들이 영원히 잠들어 있는 성스러운 공간입니다."
        }
      ]
    }
  }
};

// 기본 데이터 배열 (지도용)
export const literatureSpotsArray = Object.values(literatureSpots);

// 책별로 그룹화
export const getSpotsByBook = () => {
  const spotsByBook = {};
  
  Object.values(literatureSpots).forEach(spot => {
    const bookKey = `${spot.book} - ${spot.author}`;
    if (!spotsByBook[bookKey]) {
      spotsByBook[bookKey] = [];
    }
    spotsByBook[bookKey].push(spot);
  });
  
  return spotsByBook;
};

// ID로 특정 장소 가져오기
export const getSpotById = (id) => {
  return literatureSpots[id] || null;
};