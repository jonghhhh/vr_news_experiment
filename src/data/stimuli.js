// src/data/stimuli.js
// 자극 확정 후 src/public/stimuli/ 에 파일을 두거나 외부 URL을 넣으세요.

export const STIMULI = {
  UA: {
    title: "우크라이나 — [자극 제목]",
    source: "[출처: AP / BBC / AJ 등]",
    durationSec: 300,
    video360Url: "/stimuli/ua_360_2min.mp4",   // Tier 2·3 공통
    text: {
      headline: "[기사 헤드라인 — 자극 transcript에서 추출]",
      lead: "[리드 1–2 문장]",
      body: "[본문 약 600자, 영상 transcript 한국어 번역 기반]",
      images: [
        "/stimuli/ua_still1.jpg",
        "/stimuli/ua_still2.jpg",
        "/stimuli/ua_still3.jpg",
        "/stimuli/ua_still4.jpg",
        "/stimuli/ua_still5.jpg",
        "/stimuli/ua_still6.jpg",
      ],
    },
  },
  GA: {
    title: "가자 — [자극 제목]",
    source: "[출처]",
    durationSec: 120,
    video360Url: "/stimuli/ga_360_2min.mp4",
    text: {
      headline: "[기사 헤드라인]",
      lead: "[리드]",
      body: "[본문 약 600자]",
      images: [
        "/stimuli/ga_still1.jpg",
        "/stimuli/ga_still2.jpg",
        "/stimuli/ga_still3.jpg",
        "/stimuli/ga_still4.jpg",
        "/stimuli/ga_still5.jpg",
        "/stimuli/ga_still6.jpg",
      ],
    },
  },
};
