// src/data/scales.js
// 모든 7점 척도. 한국어 검증된 척도 우선 사용.
// item_id 는 Sheets에 long-format으로 저장.

// ───── PRE-SURVEY ─────
export const SCREENING = {
  demographics: [
    { id: "age", label: "만 나이", type: "number", min: 18, max: 99 },
    { id: "gender", label: "성별", type: "choice",
      options: ["여성", "남성", "기타", "응답하지 않음"] },
    { id: "education", label: "최종 학력", type: "choice",
      options: ["고졸 이하", "전문대 재/졸", "4년제 재/졸", "대학원 재/졸"] },
    { id: "ideology", label: "정치 성향 (1=매우 진보, 7=매우 보수)",
      type: "likert7" },
    { id: "news_freq", label: "주당 뉴스 소비 빈도",
      type: "choice", options: ["거의 안 봄", "주 1–2회", "주 3–5회", "거의 매일", "하루 여러 번"] },
    { id: "vr_exp", label: "VR 헤드셋 사용 경험", type: "choice",
      options: ["없음", "1–2회", "여러 번 사용해 봄", "정기적으로 사용"] },
  ],
};

// 사건별 동일 측정. UA / GA 두 번 반복.
function policySupport(war) {
  const label = war === "UA" ? "우크라이나" : "가자";
  return [
    { id: `pol_refugee_${war}`, label: `한국이 ${label} 난민을 더 많이 수용해야 한다` },
    { id: `pol_aid_${war}`,     label: `한국 정부의 ${label} 인도적 원조를 늘려야 한다` },
    { id: `pol_military_${war}`,label: `한국이 ${label} 분쟁에 군사적 지원을 제공해야 한다` },
    { id: `pol_diplo_${war}`,   label: `한국이 ${label} 분쟁의 외교적 중재에 적극 참여해야 한다` },
    { id: `pol_role_${war}`,    label: `한국이 ${label} 위기에 더 많은 책임을 져야 한다` },
  ];
}

function attribution(war) {
  const label = war === "UA" ? "우크라이나" : "가자";
  return [
    { id: `att_perp_${war}`,    label: `${label} 분쟁의 가해자가 누구인지 명확하다` },
    { id: `att_victim_${war}`,  label: `${label} 분쟁의 민간인 피해자는 무고하다` },
    { id: `att_complex_${war}`, label: `${label} 분쟁은 단순한 옳고 그름의 문제가 아닌 복잡한 사안이다` },
    { id: `att_korea_${war}`,   label: `${label} 위기 해결에 한국도 일정한 책임을 진다` },
  ];
}

function thermometer(targets) {
  // 0–100 슬라이더
  return targets.map((t) => ({
    id: `thermo_${t.key}`, label: `${t.label} 에 대한 호감도 (0=매우 차가움, 100=매우 따뜻함)`,
    type: "slider", min: 0, max: 100, default: 50,
  }));
}

export const PRE_SURVEY = {
  attribution_GA: attribution("GA"),
  thermometer: thermometer([
    { key: "palestinian", label: "팔레스타인 사람들" },
    { key: "israeli",     label: "이스라엘 사람들" },
  ]),
};

// ───── POST-SURVEY (사건별 즉시) ─────
function presence(war) {
  return [
    { id: `pres_being_${war}`,  label: "그 장소에 실제로 있는 듯한 느낌이 들었다" },
    { id: `pres_real_${war}`,   label: "보고 있는 장면이 실제처럼 느껴졌다" },
    { id: `pres_visit_${war}`,  label: "그 장소를 방문한 듯한 느낌이 들었다" },
    { id: `pres_image_${war}`,  label: "단지 영상을 본 것이 아니라 직접 경험한 것 같다" },
  ];
}

function empathicConcern(war) {
  // IRI EC 7문항 한국어 (간략화)
  const target = war === "UA" ? "우크라이나" : "가자";
  return [
    { id: `ec1_${war}`, label: `${target} 사람들에게 깊은 연민을 느꼈다` },
    { id: `ec2_${war}`, label: `영상을 보며 마음이 아팠다` },
    { id: `ec3_${war}`, label: `${target} 사람들의 처지에 강하게 공감했다` },
    { id: `ec4_${war}`, label: `다른 사람의 고통에 영향을 잘 받지 않는 편이다 (역코딩)`, reverse: true },
    { id: `ec5_${war}`, label: `${target} 사람들을 돕고 싶다는 마음이 들었다` },
    { id: `ec6_${war}`, label: `이 영상이 별로 와닿지 않았다 (역코딩)`, reverse: true },
    { id: `ec7_${war}`, label: `보는 동안 가슴이 먹먹했다` },
  ];
}

function panas(war) {
  return [
    { id: `pa1_${war}`, label: "흥미로운" },
    { id: `pa2_${war}`, label: "활기찬" },
    { id: `pa3_${war}`, label: "주의 깊은" },
    { id: `na1_${war}`, label: "괴로운" },
    { id: `na2_${war}`, label: "화난" },
    { id: `na3_${war}`, label: "두려운" },
    { id: `na4_${war}`, label: "슬픈" },
    { id: `na5_${war}`, label: "죄책감을 느끼는" },
  ];
}

function recall(war) {
  // 자극 보면서 등장한 핵심 사실. 자극 확정 후 채워야 함.
  return [
    { id: `rec_q1_${war}`, label: "[자극별 사실 질문 1 — 자극 확정 후 채움]", type: "shortanswer" },
    { id: `rec_q2_${war}`, label: "[자극별 사실 질문 2]", type: "shortanswer" },
    { id: `rec_q3_${war}`, label: "[자극별 사실 질문 3]", type: "shortanswer" },
    { id: `rec_q4_${war}`, label: "[자극별 사실 질문 4]", type: "shortanswer" },
    { id: `rec_q5_${war}`, label: "[자극별 사실 질문 5]", type: "shortanswer" },
  ];
}

function mediaEval(war) {
  return [
    { id: `me_cred_${war}`,   label: "이 보도는 신뢰할 만하다" },
    { id: `me_authen_${war}`, label: "이 보도는 진정성이 있다" },
    { id: `me_ethic_${war}`,  label: "이 방식의 보도는 윤리적으로 불편했다" },
  ];
}

export function postSurveyFor(war) {
  return {
    media_eval: [
      { id: `me_cred_${war}`,   label: "이 보도는 신뢰할 만하다" },
      { id: `me_authen_${war}`, label: "이 보도는 진정성이 있다" },
      { id: `me_fair_${war}`,   label: "이 보도는 균형 잡혀 있다" },
      { id: `me_ethic_${war}`,  label: "이 방식의 보도는 윤리적으로 불편했다" },
      { id: `me_import_${war}`, label: "이 보도는 중요한 사안을 다루고 있다" },
    ],
    recall: [
      { id: `rec_q1_${war}`, label: "이 영상에서 인상 깊었던 장면이나 내용을 적어주세요.", type: "shortanswer" },
      { id: `rec_q2_${war}`, label: "[사실 확인 질문 2 — 자극 확정 후 채움]", type: "shortanswer" },
      { id: `rec_q3_${war}`, label: "[사실 확인 질문 3 — 자극 확정 후 채움]", type: "shortanswer" },
    ],
    attribution: attribution(war),
    thermometer: thermometer([
      { key: "palestinian", label: "팔레스타인 사람들" },
      { key: "israeli",     label: "이스라엘 사람들" },
    ]),
  };
}
