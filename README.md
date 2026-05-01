# IJ War Study — React 보일러플레이트

브라우저에서 360° 전쟁 뉴스 자극을 보여주고 sight-tracking + 설문 + 행동 데이터를 Apps Script Web App으로 전송하는 사전등록 실험 앱.

## 빠른 시작

```bash
cd 02_react
npm install
# src/lib/config.js 의 APPS_SCRIPT_URL 을 본인 Web App URL로 교체
# public/stimuli/ 에 360 영상 4개(UA, GA × 360 / 2D fallback) 배치 또는 URL로 변경
npm start          # http://localhost:3000 에서 미리보기
npm run build      # 정적 빌드
npm run deploy     # GitHub Pages 배포 (저장소 settings → Pages 활성화 후)
```

## 디렉토리

```
02_react/
├── public/
│   ├── index.html              # A-Frame CDN 로드
│   └── stimuli/                # 360 mp4·이미지·자막 (또는 외부 URL)
├── src/
│   ├── App.jsx                 # 라우팅, 조건 배정
│   ├── lib/
│   │   ├── config.js           # Apps Script URL, 조건 수, feature flag
│   │   ├── api.js              # POST 래퍼 (CORS 안전, 재시도)
│   │   ├── telemetry.js        # 헤드/시점 100ms 버퍼링·배치 전송
│   │   ├── randomization.js    # cell 배정 + 사건 순서 카운터밸런싱
│   │   └── pid.js              # 참가자 ID 생성·로컬 저장
│   ├── data/
│   │   ├── scales.js           # 한국어 척도 항목 (pre/post)
│   │   └── stimuli.js          # 자극 메타데이터
│   ├── screens/
│   │   ├── Consent.jsx
│   │   ├── Screening.jsx       # 인구통계, PCL-5, 정파성
│   │   ├── PreSurvey.jsx       # 정책지지·책임귀속·thermometer
│   │   ├── DeviceCheck.jsx     # WebXR 감지·매체 안내
│   │   ├── Stimulus.jsx        # Tier 1/2/3 분기
│   │   ├── PostSurvey.jsx      # 사건별 즉시 측정
│   │   ├── BehaviorChoice.jsx  # 후원·정보·공유 클릭 (실제 외부 링크)
│   │   └── Debrief.jsx         # 정신건강 자원 안내
│   └── components/
│       ├── ScaleItem.jsx       # 7점 Likert 공통
│       ├── AframeStimulus.jsx  # <a-videosphere> + telemetry
│       ├── TextStimulus.jsx    # Tier 1
│       └── TraumaWarning.jsx   # 자극 직전 안전 안내·중단 버튼
└── package.json
```

## 핵심 동작

1. **자동 cell 배정**: 첫 진입 시 매체(Tier 1·2) × 사건순서(UA→GA / GA→UA) 균형 배정. WebXR 가능 디바이스는 Tier 3 옵션 추가 노출.
2. **참가자 ID**: 첫 진입 시 UUID 생성 → localStorage 저장. 새로고침 후에도 동일 ID 유지.
3. **데이터 전송**: 모든 응답·telemetry는 즉시 Apps Script로 POST. 실패 시 로컬 큐에 적재 후 재시도.
4. **중단 가능**: 자극 중 Esc 또는 화면 우상단 "중단" 버튼으로 즉시 종료 가능 (IRB 필수).

## GitHub Pages 배포

1. 저장소 만들고 push
2. `package.json` 의 `homepage` 를 `https://USERNAME.github.io/REPO` 로 수정
3. `npm run deploy`
4. 저장소 Settings → Pages → Source: `gh-pages` 브랜치 선택

## 참고

- A-Frame은 CDN으로 로드 (npm 패키지 안 씀 — 가벼움). `public/index.html` 참조.
- WebXR API는 `navigator.xr.isSessionSupported('immersive-vr')` 로 감지.
- Tier 2의 자이로(폰 회전)는 A-Frame이 자동 처리.
