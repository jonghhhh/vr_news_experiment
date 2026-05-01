// src/screens/PreSurvey.jsx
import React, { useState } from "react";
import ScaleItem from "../components/ScaleItem";
import { PRE_SURVEY } from "../data/scales";
import { send } from "../lib/api";

export default function PreSurvey({ onDone }) {
  const [vals, setVals] = useState({});

  const items = [...PRE_SURVEY.attribution_GA, ...PRE_SURVEY.thermometer];
  const setV = (id, v) => setVals((s) => ({ ...s, [id]: v }));

  const allDone = items.every((it) =>
    it.type === "slider" ? true : vals[it.id] !== undefined && vals[it.id] !== "");

  const submit = () => {
    const out = items.map((it) => ({
      id: it.id,
      value: it.type === "slider" && vals[it.id] === undefined ? it.default : vals[it.id],
    }));
    send("pre_survey", { block: "pre", items: out });
    onDone();
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px", color: "#f0f0f0" }}>
      <h1>사전 설문</h1>
      <p style={{ color: "#aaa", fontSize: 14, marginBottom: 24 }}>
        가자 분쟁에 대한 현재 생각을 답해 주세요 (1 = 전혀 그렇지 않다, 7 = 매우 그렇다).
      </p>
      {items.map((it) => (
        <ScaleItem key={it.id} item={it} value={vals[it.id]}
                   onChange={(v) => setV(it.id, v)} />
      ))}
      <button disabled={!allDone} onClick={submit}
        style={{ marginTop: 24, padding: "14px 24px",
                 background: allDone ? "#2a5fa8" : "#3a3a3a",
                 color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
                 fontSize: 16 }}>
        다음
      </button>
    </div>
  );
}
