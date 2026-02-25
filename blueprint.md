# Project Overview: 인공지능 동물상 테스트 & 행운 번호기

사용자의 사진을 분석하여 닮은 동물상을 찾아주고, 오늘의 행운 번호(로또)를 생성해주는 멀티 기능 웹 애플리케이션입니다.

## 주요 기능
- **인공지능 동물상 테스트:** Teachable Machine(TensorFlow.js)을 활용하여 사진 업로드 시 강아지상, 고양이상 등을 분석합니다.
- **행운 번호 생성기:** 로또 번호 6개를 무작위로 생성하며 범위별 색상 코딩을 제공합니다.
- **반응형 디자인:** 드래그 앤 드롭 업로드 지원 및 모바일 최적화 레이아웃.
- **다크/화이트 모드:** 테마 전환 기능 및 `localStorage`를 통한 설정 유지.
- **제휴 및 서비스 문의:** Formspree 연동 문의 폼.
- **커뮤니티 댓글:** Disqus 소셜 댓글 서비스 통합.

## 기술적 세부 사항
- **AI Model:** Google Teachable Machine (Image Model).
- **Libraries:** TensorFlow.js, Teachable Machine Image Library.
- **Frontend:** Vanilla JS, HTML5, CSS3 (Modern Features).
- **Interactions:** FileReader API (이미지 미리보기), 비동기 모델 로딩, 게이지 바 애니메이션.

## 진행 상황
1. [x] 기본 UI 구조 및 테마 시스템 구축.
2. [x] 로또 번호 생성 로직 구현.
3. [x] 제휴 문의 및 댓글 기능 통합.
4. [x] **AI 동물상 테스트 모델 연동 (Teachable Machine).**
5. [x] **사진 업로드 및 실시간 분석 기능 구현.**
6. [x] **분석 결과 시각화 (게이지 바) 및 다시 하기 기능.**
7. [x] **전체 사이트 한글화 및 디자인 고도화.**
