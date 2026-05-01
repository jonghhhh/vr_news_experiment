// src/screens/PostSurvey.jsx
import React, { useEffect, useState } from "react";
import ScaleItem from "../components/ScaleItem";
import { postSurveyFor } from "../data/scales";
import { send } from "../lib/api";

const SECTION_TITLES = {
  media_eval: "보도 평가",
  recall:     "영상 내용 회상",
  attribution: "분쟁에 대한 판단",
  thermometer: "관련 집단 호감도",
};

export default function PostSurvey({ war, onDone }) {
  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);

  const PS = postSurveyFor(war);
  const [vals, setVals] = useState({});
  const setV = (id, v) => setVals((s) => ({ ...s, [id]: v }));

  // recall은 선택 응답, slider는 기본값으로 처리
  const allDone = Object.entries(PS).every(([section, items]) =>
    section === "recall"
      ? true
      : items.every((it) =>
          it.type === "slider" ? true : vals[it.id] !== undefined && vals[it.id] !== "")
  );

  const submit = () => {
    const out = Object.values(PS).flat().map((it) => ({
      id: it.id,
      value: it.type === "slider" && vals[it.id] === undefined ? it.default : (vals[it.id] ?? null),
    }));
    send("post_survey", { war, block: "post", items: out });
    onDone();
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px", color: "#f0f0f0" }}>
      <h1>사후 설문</h1>
      <p style={{ color: "#aaa", fontSize: 14, marginBottom: 24 }}>
        방금 보신 영상에 대해 답해 주세요 (1 = 전혀 그렇지 않다, 7 = 매우 그렇다).
      </p>

      {Object.entries(PS).map(([section, items]) => (
        <div key={section}>
          <h2 style={{ marginTop: 32, marginBottom: 4, fontSize: 17, color: "#ccc" }}>
            {SECTION_TITLES[section]}
          </h2>
          {section === "recall" && (
            <p style={{ color: "#888", fontSize: 13, marginTop: 0 }}>선택 응답입니다.</p>
          )}
          {items.map((it) => (
            <ScaleItem key={it.id} item={it} value={vals[it.id]}
                       onChange={(v) => setV(it.id, v)} />
          ))}
        </div>
      ))}

      <button disabled={!allDone} onClick={submit}
        style={{ marginTop: 32, padding: "14px 24px",
                 background: allDone ? "#2a5fa8" : "#3a3a3a",
                 color: "#fff", border: "none", borderRadius: 8,
                 cursor: allDone ? "pointer" : "default", fontSize: 16 }}>
        완료
      </button>
    </div>
  );
}
