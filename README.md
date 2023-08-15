# pre-onboarding-11th-4

원티드 FE 인턴십 4주차 임상실험 검색 페이지

## Getting Started

**종속성 설치 및 dev모드 실행**

```bash
git clone https://github.com/blueprint-12/pre-onboarding-11th-4.git . #현재 경로에 클론
yarn && yarn dev #종속성 설치, port 3000
```

**서버 실행(mock api)**

> ⚠프론트와 서버는 각각 다른 터미널에서 실행시켜줘야 합니다.

```bash
yarn server #port 4000
```

## 구현 기능

> 구현 목표: [한국임상실험 검색페이지](https://clinicaltrialskorea.com/)

- [x] 질환명 검색시 api호출을 통해 검색어 추천 검색어, 최근 검색어 구현
- [x] API 호출별로 로컬 캐싱 구현 (캐싱 기능을 제공하는 라이브러리 사용없이 직접 구현)
  - [x] 검색어 없을 시, "검색어 없음" 표출
  - [x] 서버로부터 받아온 데이터마다 expire time 구현
  - [x] 디바운싱 적용 => 입력마다 API호출하지 않도록 API 호출
        횟수를 줄이는 전략
- [x] API 호출마다 console.info("calling api") 출력을 통해 api호출 횟수 확인
- [ ] (optional) 키보드만으로 추천 검색어들로 이동 가능하도록 구현

## Issue

env.d.ts 에 관하여 공부( + declare 키워드)
