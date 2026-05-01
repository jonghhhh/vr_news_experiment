// src/data/stimuli.js
// PUBLIC_URL: 로컬=""  GitHub Pages="/vr_news_experiment"
const base = process.env.PUBLIC_URL || "";

export const STIMULI = {
  GA: {
    title: "가자 — [자극 제목]",
    source: "[출처]",
    durationSec: 120,
    video360Url: `${base}/stimuli/ga_360_2min.mp4`,
    text: {
      headline: "[기사 헤드라인]",
      lead: "[리드]",
      body: "[본문 약 600자]",
      images: [
        `${base}/stimuli/ga_still1.jpg`,
        `${base}/stimuli/ga_still2.jpg`,
        `${base}/stimuli/ga_still3.jpg`,
        `${base}/stimuli/ga_still4.jpg`,
        `${base}/stimuli/ga_still5.jpg`,
        `${base}/stimuli/ga_still6.jpg`,
      ],
    },
  },
};
