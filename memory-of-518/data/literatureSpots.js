// src/data/literatureSpots.js - 상세 정보 포함

export const literatureSpots = {
  1: {
    id: 1,
    name: "상무관, 옛 전남도청",
    book: "소년이 온다",
    author: "한강",
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
    detailInfo: {
      coverImage: "/images/sangmugwan-cover.jpg",
      photoYear: "2018년 5월의 상무관",
      courseDescription: "지금 계신 이곳은 『소년이 온다』의 중학생 소년, 동호가 군인들의 탄압에 숨진 사망자들의 시신을 수습하고, 수많은 군인들이 대대적인 진압 작전을 펼칠 거라는 소문을 듣고도 도망치지 않고 최후의 순간까지 지키고자 했던 옛 전남도청 상무관입니다.",
      placeInfo: {
        address: "광주광역시 동구 문화전당로 38 (금남로 1가 12-1)",
        heritageNumber: "제5-3호. 1998년 1월 12일 지정",
        monumentLocation: "상무관 정문 입구 좌측"
      },
      photoGallery: [
        "/images/sangmugwan-1980-1.jpg",
        "/images/sangmugwan-1980-2.jpg", 
        "/images/sangmugwan-current.jpg"
      ],
      literature: {
        characterMapImage: "/images/character-map-sangmugwan.png",
        characterDescription: "주황색: 『소년이 온다』에서 초점화 및 화자로 등장하는 인물\n초록색: 『소년이 온다』 내 등장인물\n노란색: 『소년이 온다』 작품 밖에서, 기억과 증언을 촉발 내지 기록하는 인물",
        characters: [
          {
            image: "/images/dongho.jpg",
            name: "'너'(동호)",
            description: "중학교 3학년. 친구 정대를 찾으러 도청 상무관에 와 시체 수습 일을 돕다가, 최후 진압 작전 당일인 27일 마지막까지 도청에 남아 희생됨."
          },
          {
            image: "/images/jeongdae.jpg", 
            name: "정대",
            description: "동호의 친구로 중학교 3학년. 21일 금남로 가두행진의 선두에서 동호와 함께 있다가 옆구리에 총을 맞고 쓰러짐."
          },
          {
            image: "/images/jeongdae.jpg", 
            name: "정미 누나",
            description: "정대의 누나로 스무살. 방직공장에서 일하며 야학에 다니고 있음. 18일을 기점으로 행방이 묘연해짐."
          },
          {
            image: "/images/jeongdae.jpg", 
            name: "진수 형",
            description: "서울의 대학에 다니다 휴교령으로 인해 고향을 온 대학생. 동호와 함께 도청에 마지막까지 남음."
          },
          {
            image: "/images/jeongdae.jpg", 
            name: "은숙 누나",
            description: "수피아여고 3학년. 동호, 선주와 함께 상무관에서 시신 수습 일을 맡았음."
          },
          {
            image: "/images/jeongdae.jpg", 
            name: "선주 누나",
            description: "충장로 양장점 미싱사로 스물한 살. 동호, 은숙과 함께 상무관에서 시신 수습 일을 맡았음."
          }
        ],
        plot: "『소년이 온다』 1장 「어린 새」는 1980년 5월 광주를 배경으로, 중학교 3학년 동호를 초점으로 전개됩니다. 동호는 시위 중에 계엄군의 총격으로 친구 정대가 죽는 장면을 목격하곤 도망칩니다. 그날 이후 동호는 정대와 그의 누나 정미를 찾고자 상무관에서 시신을 수습하고 정리하는 일을 자원해 맡게 됩니다. 상무관은 시민들의 시신이 임시로 안치되어 유족들이 확인하러 오는 장소로, 동호는 형, 누나들과 함께 시신을 닦고 관을 태극기로 덮는 약식의 장례 절차를 돕습니다. 그 과정에서 군인들이 죽인 이들을 향해 애국가를 부르고, 태극기로 덮는 장례 의식은 동호에게 큰 모순으로 다가옵니다. 동호는 죽음 자체보다도, 죽음을 만들어 낸 ‘국가’라는 이름의 폭력이 더 두렵고 끔찍하다고 느낍니다. 이 챕터는 어린 소년의 눈으로 바라본 죽음과 부조리한 현실, 그리고 어린 소년에게는 어울리지 않을 만큼 깊은 죄책감과 분노의 감정을 통해 독자들에게 깊은 울림을 줍니다.",
        resources: [
          { title: "📖 작품 해설 자료", action: "해설 자료 보기" },
          { title: "🎬 관련 영화 및 다큐멘터리", action: "영상 자료 보기" },
          { title: "📚 추천 도서", action: "도서 목록 보기" }
        ]
      },
      history: {
        before: {
          image: "/images/before-518-sangmugwan.jpg",
          text: "상무관은 1968년 6월에 착공하여 1969년 8월에 완공되었던 ‘금남로 확장공사’의 일환으로 건립되었습니다. 1920년대 중반 조선총독부 경찰이 유도를 단련하는 도장으로 만들었던 ‘무덕전’이라는 일본풍의 목조건물을 대체한 것입니다. 일제강점기 최대 규모의 항일학생운동이었던 1929년 광주학생운동이 발발했을 때에는 연행한 학생들을 무덕전에 임시 구금하기도 했습니다."
        },
        during: {
          image: "/images/during-518-sangmugwan.jpg", 
          text: "광주5·18민주화운동에서 상무관이 의미를 갖게 된 것은 희생자들의 시신을 안치하는 합동분향소로 사용되면서부터였습니다. 계엄군이 철수한 뒤, 산개되어 있던 시신들은 5·18민주광장으로 집결되었는데, 이는 가족들이 희생자의 시신을 빨리 찾을 수 있도록 돕기 위함이었습니다. 가족들은 시신을 찾아 도심 곳곳을 헤매고 다니느라 고생이 이만저만이 아니었고, 훼손된 시신을 무수한 사람들이 들여다보는 등 문제가 심각했었기 때문입니다. (사진) 희생자들의 시신은 22일부터 안치되기 시작하여, 23일 아침을 기준으로 약 30구 정도가 상무관에 안치되었습니다. 신분증 등으로 신원이 확인되었거나 가족이 확인해 준 경우만 입관하여 상무관에 안치하였기에, 상무관에 안치되지 못한 시신은 도청과 병원 등에 남아 있었습니다. 26일경 상무관은 더 이상 시신을 들여 놓을 수 없을 정도로 가득 차게 되었습니다. 상무관에 안치된 시신의 수량에 관한 증언은 제각각인데, 27일 검시를 하며 작성한 기록 등을 참고하면 60여구 이상이 안치되어 있었던 것으로 판단됩니다. 특기할 만한 점은, 시신들을 입관하고 수습하는 어렵고 힘든 일에 자발적으로 헌신했던 시민들 중 대부분은 하층민이었다는 것입니다. 이들 가운데 일부는 27일 새벽 계엄군의 도청 진압에 맞서다 유명을 달리하기도 했습니다."
        },
        after: {
          youtube: "https://youtu.be/embed/oIwr56UGkG8?si=dY2Uc2s948K9XeXM",
          images: ["/images/after-518-sangmugwan-1.jpg", "/images/after-518-sangmugwan-2.jpg"],
          text: "전라남도경찰청 소속 경찰들과 전라남도유도회의 체육관으로 사용되었다가, 구 전남도청이 국립아시아문화전당이 되면서 현재는 5·18민주평화기념관으로 사용되기 시작하였습니다. 2025년 현재, 『소년이 온다』를 쓴 한강 작가의 노벨문학상 수상 이후 옛 전남도청 건물과 함께 상무관에도 리모델링 공사가 진행 중입니다."
        },
        behindStory: {
          quote: "아니요, 쏘지 않았습니다.\n누구도 죽이지 않았습니다.\n계단을 올라온 군인들이 어둠속에서 다가오는 것을 보면서도, 우리 조의 누구도 방아쇠를 당기지 않았습니다. 방아쇠를 당기면 사람이 죽는다는 걸 알면서 그렇게 할 수가 없었습니다. 우린 쏠 수 없는 총을 나눠 가진 아이들이었던 겁니다.",
          quoteAuthor: "한강",
          quoteSource: "『소년이 온다』, 117쪽",
          images: ["/images/author-sangmugwan.jpg"],
          text: "책 내용과 동일하게 시민군은 결국 제대로 계엄군을 쏘지 못했습니다. 27일 마지막 도청 진압작전 당시 2만여 명의 군인들 중에는 사망자가 아무도 없었지만, 200명가량의 시민군 중에선 17명의 사망자가 발생했습니다."
        }
      }
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
    detailInfo: {
      coverImage: "/images/jeonil-cover.jpg",
      photoYear: "1980년 5월",
      courseDescription: "금남로와 전일빌딩은 5·18 민주화운동의 상징적인 장소입니다. 시민들이 평화적으로 민주주의를 외쳤던 이 거리에서 역사의 무게를 느껴보세요.",
      placeInfo: {
        address: "광주광역시 동구 금남로 245 (금남로1가 1번지)",
        heritageNumber: "5·18 사적지 제1호",
        monumentLocation: "전일빌딩 앞 광장"
      },
      photoGallery: [
        "/images/jeonil-1980-1.jpg",
        "/images/jeonil-1980-2.jpg", 
        "/images/jeonil-current.jpg"
      ],
      literature: {
        characterMapImage: "/images/character-map-jeonil.jpg",
        characterDescription: "전일빌딩과 금남로에서 만나는 인물들의 이야기입니다.",
        characters: [
          {
            image: "/images/dongho.jpg",
            name: "동호",
            description: "정대를 찾아 전일빌딩으로 향하는 소년. 두려움과 걱정이 가득한 마음"
          },
          {
            image: "/images/citizens.jpg", 
            name: "시민들",
            description: "금남로에서 평화적으로 민주주의를 외쳤던 광주 시민들"
          }
        ],
        plot: "동호가 친구 정대를 찾아 금남로를 걸으며 전일빌딩으로 향하는 장면. 시민들의 함성과 긴장감이 가득한 거리에서 소년의 내적 갈등이 그려집니다.",
        resources: [
          { title: "📖 금남로의 역사", action: "역사 자료 보기" },
          { title: "🎬 5·18 다큐멘터리", action: "영상 보기" },
          { title: "📚 관련 증언집", action: "증언 자료 보기" }
        ]
      },
      history: {
        before: {
          image: "/images/before-518-jeonil.jpg",
          text: "전일빌딩은 광주의 대표적인 상업건물이었으며, 금남로는 광주의 중심가였습니다. 평범한 일상이 흐르던 공간이었죠."
        },
        during: {
          image: "/images/during-518-jeonil.jpg", 
          text: "5·18 기간 중 금남로는 시민들이 평화적으로 집회를 열고 민주주의를 외쳤던 상징적인 거리가 되었습니다. 전일빌딩은 시민군의 본부 역할을 했습니다."
        },
        after: {
          youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          images: ["/images/after-518-jeonil-1.jpg"],
          text: "현재 금남로는 5·18의 정신을 기리는 기념 거리로 조성되어 있으며, 매년 5월이면 추모 행사가 열립니다."
        },
        behindStory: {
          quote: "형, 나도 갈게.",
          quoteAuthor: "한강",
          quoteSource: "『소년이 온다』",
          images: ["/images/geumnamro-story.jpg"],
          text: "작가는 실제 금남로를 걸으며 당시의 분위기를 체감하고, 생존자들의 증언을 통해 이 장면을 생생하게 재현했습니다."
        }
      }
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
    detailInfo: {
      coverImage: "/images/fountain-cover.jpg",
      photoYear: "1980년 5월",
      courseDescription: "5·18 민주광장은 시민들이 모여 평화적으로 의견을 나누고 서로를 격려했던 민주주의의 상징적 공간입니다.",
      placeInfo: {
        address: "광주광역시 동구 광산동 13 (5·18 민주광장)",
        heritageNumber: "5·18 사적지 제2호",
        monumentLocation: "광장 중앙"
      },
      photoGallery: [
        "/images/fountain-1980-1.jpg",
        "/images/fountain-current.jpg"
      ],
      literature: {
        characterMapImage: "/images/character-map-fountain.jpg",
        characterDescription: "민주광장에서 만나는 다양한 사람들의 이야기입니다.",
        characters: [
          {
            image: "/images/dongho.jpg",
            name: "동호",
            description: "친구를 찾아 헤매는 소년. 수많은 사람들 사이에서 느끼는 외로움과 불안"
          }
        ],
        plot: "동호가 도청 앞 분수대에서 정대를 찾으며 겪는 혼란과 두려움. 시민들의 열기와 대비되는 소년의 심리가 섬세하게 그려집니다.",
        resources: [
          { title: "📖 민주광장의 의미", action: "자료 보기" },
          { title: "🎬 5·18 기록 영상", action: "영상 보기" }
        ]
      },
      history: {
        before: {
          image: "/images/before-518-fountain.jpg",
          text: "도청 앞 분수대는 시민들의 휴식 공간이었으며, 각종 행사가 열리던 광주의 중심 광장이었습니다."
        },
        during: {
          image: "/images/during-518-fountain.jpg",
          text: "5·18 기간 중 이곳은 시민들이 자연스럽게 모이는 집회 장소가 되었고, 서로의 안전을 확인하고 정보를 공유하는 소통의 공간이었습니다."
        },
        after: {
          youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          images: ["/images/after-518-fountain.jpg"],
          text: "현재는 5·18 민주광장으로 명명되어 민주주의의 소중함을 기리는 기념 공간으로 조성되었습니다."
        },
        behindStory: {
          quote: "너는 그들 사이를 비집고 들어가며 정대의 모습을 찾았다.",
          quoteAuthor: "한강",
          quoteSource: "『소년이 온다』",
          images: ["/images/fountain-story.jpg"],
          text: "작가는 당시 이 광장에 모였던 사람들의 증언을 통해 소년의 심리를 섬세하게 포착했습니다."
        }
      }
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
    detailInfo: {
      coverImage: "/images/sangmudae-cover.jpg",
      photoYear: "1980년 5월",
      courseDescription: "5·18 자유공원은 아픈 역사를 기억하고 평화의 소중함을 되새기는 공간입니다. 과거의 상처를 치유하고 미래의 희망을 품는 곳입니다.",
      placeInfo: {
        address: "광주 서구 상무평화로 13",
        heritageNumber: "5·18 사적지 제15호",
        monumentLocation: "공원 입구"
      },
      photoGallery: [
        "/images/sangmudae-old.jpg",
        "/images/sangmudae-park.jpg"
      ],
      literature: {
        characterMapImage: "/images/character-map-sangmudae.jpg",
        characterDescription: "상무대와 관련된 인물들의 이야기입니다.",
        characters: [
          {
            image: "/images/missing-person.jpg",
            name: "연행된 시민들",
            description: "상무대로 끌려간 사람들. 가족들이 애타게 찾던 이들"
          }
        ],
        plot: "상무대로 연행된 사람들에 대한 불안과 걱정. 알 수 없는 공포와 기다림의 시간들이 그려집니다.",
        resources: [
          { title: "📖 상무대 증언집", action: "증언 보기" },
          { title: "🕊️ 평화 교육 자료", action: "자료 보기" }
        ]
      },
      history: {
        before: {
          image: "/images/before-518-sangmudae.jpg",
          text: "상무대는 군사 시설이었으며, 일반 시민들에게는 접근이 제한된 공간이었습니다."
        },
        during: {
          image: "/images/during-518-sangmudae.jpg",
          text: "5·18 기간 중 상무대는 계엄군의 주요 거점이 되었고, 많은 시민들이 이곳으로 연행되었습니다."
        },
        after: {
          youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          images: ["/images/after-518-sangmudae.jpg"],
          text: "현재는 5·18 자유공원으로 조성되어 평화와 자유의 소중함을 기리는 교육의 장이 되었습니다."
        },
        behindStory: {
          quote: "그곳에서 무슨 일이 일어났는지, 아무도 정확히 알 수 없었다.",
          quoteAuthor: "한강",
          quoteSource: "『소년이 온다』",
          images: ["/images/sangmudae-story.jpg"],
          text: "작가는 생존자들의 증언을 통해 당시의 불안과 공포를 섬세하게 포착했습니다."
        }
      }
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
    detailInfo: {
      coverImage: "/images/hospital-cover.jpg",
      photoYear: "1980년 5월",
      courseDescription: "국군광주병원은 5·18 당시 부상자들을 치료했던 곳입니다. 생명을 구하기 위해 헌신했던 의료진들의 숭고한 정신을 기억하는 공간입니다.",
      placeInfo: {
        address: "광주 서구 상무대로 1028",
        heritageNumber: "5·18 관련 의료기관",
        monumentLocation: "병원 로비"
      },
      photoGallery: [
        "/images/hospital-1980.jpg",
        "/images/hospital-current.jpg"
      ],
      literature: {
        characterMapImage: "/images/character-map-hospital.jpg",
        characterDescription: "병원에서 만나는 사람들의 이야기입니다.",
        characters: [
          {
            image: "/images/doctor.jpg",
            name: "의료진",
            description: "밤낮없이 부상자들을 치료하며 생명을 구한 의료진들"
          },
          {
            image: "/images/dongho.jpg",
            name: "동호",
            description: "병원의 참혹한 현실을 목격하며 충격을 받는 소년"
          }
        ],
        plot: "병원에서 부상자들의 신음소리를 들으며 현실의 참혹함을 깨닫는 동호. 생명의 소중함과 인간의 존엄성에 대해 생각하게 됩니다.",
        resources: [
          { title: "📖 의료진 증언", action: "증언 보기" },
          { title: "🏥 의료 봉사 이야기", action: "이야기 보기" }
        ]
      },
      history: {
        before: {
          image: "/images/before-518-hospital.jpg",
          text: "국군광주병원은 군인들을 위한 의료기관이었습니다."
        },
        during: {
          image: "/images/during-518-hospital.jpg",
          text: "5·18 기간 중 이곳은 부상당한 시민들을 치료하는 중요한 의료 거점이 되었습니다."
        },
        after: {
          youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          images: ["/images/after-518-hospital.jpg"],
          text: "현재도 의료기관으로 운영되며, 5·18 당시의 의료진들의 헌신을 기리고 있습니다."
        },
        behindStory: {
          quote: "너는 그 소리를 듣고 있을 수가 없어서 밖으로 나왔다.",
          quoteAuthor: "한강",
          quoteSource: "『소년이 온다』",
          images: ["/images/hospital-story.jpg"],
          text: "작가는 당시 의료진들의 증언을 통해 병원의 참혹한 상황을 생생하게 묘사했습니다."
        }
      }
    }
  },

  6: {
    id: 6,
    name: "구 광주 YWCA",
    book: "소년이 온다",
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
    detailInfo: {
      coverImage: "/images/ywca-cover.jpg",
      photoYear: "1980년 5월",
      courseDescription: "광주 YWCA는 여성들이 중심이 되어 구호 활동을 펼쳤던 곳입니다. 연대와 돌봄의 정신이 살아있는 공간입니다.",
      placeInfo: {
        address: "광주광역시 동구 금남로 264(금남로1가)",
        heritageNumber: "5·18 관련 시민단체",
        monumentLocation: "건물 입구"
      },
      photoGallery: [
        "/images/ywca-1980.jpg",
        "/images/ywca-activity.jpg"
      ],
      literature: {
        characterMapImage: "/images/character-map-ywca.jpg",
        characterDescription: "YWCA에서 활동한 여성들의 이야기입니다.",
        characters: [
          {
            image: "/images/ywca-women.jpg",
            name: "YWCA 여성들",
            description: "구호 활동에 헌신한 여성들. 따뜻한 마음으로 시민들을 도운 이들"
          }
        ],
        plot: "여성들이 중심이 되어 펼친 구호 활동. 성별을 초월한 연대와 돌봄의 정신이 빛나는 순간들이 그려집니다.",
        resources: [
          { title: "📖 여성들의 5·18", action: "자료 보기" },
          { title: "👥 시민사회 활동", action: "활동 보기" }
        ]
      },
      history: {
        before: {
          image: "/images/before-518-ywca.jpg",
          text: "광주 YWCA는 여성들의 사회 활동과 교육을 위한 중요한 공간이었습니다."
        },
        during: {
          image: "/images/during-518-ywca.jpg",
          text: "5·18 기간 중 YWCA는 여성들이 주도하는 구호 활동의 중심지가 되었습니다."
        },
        after: {
          youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          images: ["/images/after-518-ywca.jpg"],
          text: "현재도 여성들의 사회 참여와 권익 신장을 위한 활동을 지속하고 있습니다."
        },
        behindStory: {
          quote: "그들의 따뜻한 손길이 상처받은 이들에게 위로가 되었다.",
          quoteAuthor: "홍희담",
          quoteSource: "『그대에게 보내는 편지』",
          images: ["/images/ywca-story.jpg"],
          text: "당시 YWCA에서 활동했던 여성들의 증언을 통해 여성들의 역할과 헌신을 조명했습니다."
        }
      }
    }
  },

  7: {
    id: 7,
    name: "망월동 5·18묘역",
    book: "소년이 온다",
    author: "한강",
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
    detailInfo: {
      coverImage: "/images/mangwol-cover.jpg",
      photoYear: "1980년 5월",
      courseDescription: "망월묘지공원은 5·18 희생자들이 영원히 잠들어 있는 성스러운 공간입니다. 그들의 희생을 기억하고 민주주의의 소중함을 되새기는 곳입니다.",
      placeInfo: {
        address: "광주광역시 북구 민주로 285",
        heritageNumber: "국립5·18민주묘지",
        monumentLocation: "묘역 입구"
      },
      photoGallery: [
        "/images/mangwol-1980.jpg",
        "/images/mangwol-memorial.jpg",
        "/images/mangwol-current.jpg"
      ],
      literature: {
        characterMapImage: "/images/character-map-mangwol.jpg",
        characterDescription: "망월동에서 만나는 이들의 이야기입니다.",
        characters: [
          {
            image: "/images/victims.jpg",
            name: "5·18 희생자들",
            description: "민주주의를 위해 생명을 바친 젊은 영혼들"
          },
          {
            image: "/images/families.jpg",
            name: "유가족들",
            description: "사랑하는 이들을 잃고 아픔을 간직한 가족들"
          }
        ],
        plot: "망월동 언덕에 생겨난 무덤들을 바라보며 느끼는 슬픔과 경외감. 너무 젊게 떠난 이들에 대한 애도와 기억의 의미를 담고 있습니다.",
        resources: [
          { title: "📖 5·18 희생자 명단", action: "명단 보기" },
          { title: "🕯️ 추모 의식", action: "추모하기" },
          { title: "📚 증언과 기록", action: "기록 보기" }
        ]
      },
      history: {
        before: {
          image: "/images/before-518-mangwol.jpg",
          text: "망월동은 광주 외곽의 조용한 묘지였습니다."
        },
        during: {
          image: "/images/during-518-mangwol.jpg",
          text: "5·18 기간과 그 이후, 희생자들이 이곳에 안장되면서 5·18의 상징적 공간이 되었습니다."
        },
        after: {
          youtube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          images: ["/images/after-518-mangwol-1.jpg", "/images/after-518-mangwol-2.jpg"],
          text: "현재는 국립5·18민주묘지로 조성되어 민주주의 교육과 추모의 성지가 되었습니다."
        },
        behindStory: {
          quote: "그들은 모두 너무 젊었고, 너무 일찍 떠났다.",
          quoteAuthor: "한강",
          quoteSource: "『소년이 온다』",
          images: ["/images/mangwol-story.jpg"],
          text: "작가는 망월동을 직접 방문하며 희생자들의 젊은 나이에 충격을 받았고, 이를 통해 생명의 소중함을 깊이 있게 그려냈습니다."
        }
      }
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