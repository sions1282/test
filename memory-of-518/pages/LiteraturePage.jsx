// src/pages/LiteraturePage.jsx
import React from 'react';

const LiteraturePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-amber-600 mb-6">오월문학에 대하여</h2>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <p className="text-gray-700 leading-relaxed mb-4">
          이 페이지에서는 5·18 광주 민주화운동을 다룬 주요 문학 작품들을 소개합니다. 문학 기행에서는 아래 두 작품을 중심으로 광주를 돌아보게 됩니다.
        </p>
      </div>

      {/* 소년이 온다 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10 flex gap-6 items-start">
        <img
          src="/images/boy-is-coming.jpg"
          alt="소년이 온다"
          className="w-36 h-52 object-cover rounded-lg shadow"
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">한강, 『소년이 온다』 (2014)</h3>
          <p className="text-gray-700 leading-relaxed">
            2024 노벨 문학상 수상자 한강의 2014년 작 『소년이 온다』는 신군부의 불법적 집권에 저항하며 1980년 5월 18일부터 27일까지 전라남도 광주와 그 등지에서 발생하였던 5·18 광주 민주화 운동을 소재로 한 군상극이다.
            총 6장으로 구성되어 있으며, 진압 과정에서 자행된 민간인 학살의 희생자, 고문 후유증으로 고통받는 생존자, 진상규명을 울부짖는 피해자 유가족 등이 각 장의 초점화로 등장한다.
          </p>
        </div>
      </div>

      {/* 그대에게 보내는 편지 */}
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start">
        <img
          src="/images/letter-to-you.jpg"
          alt="그대에게 보내는 편지"
          className="w-36 h-52 object-cover rounded-lg shadow"
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">홍희담, 「그대에게 보내는 편지」 (1995)</h3>
          <p className="text-gray-700 leading-relaxed">
            『창작과비평』 1995년 여름호에 처음 발표된 홍희담의 「그대에게 보내는 편지」는 1980년 5·18 광주 민주화 운동을 소재로 한 중편 소설이다.
            군인들의 진압에 마지막까지 항거하다 체포되어 고문 후유증으로 평생을 정신병원에서 살아간 형철과, 그를 돌보는 가족들, 형철로 대변되는 순수한 유년을 잃고 은둔자적 삶을 살아가는 인하 등의 인물을 통해
            5·18 이후 트라우마적 기억을 안고 살아가는 사람들의 이야기를 그린다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiteraturePage;
