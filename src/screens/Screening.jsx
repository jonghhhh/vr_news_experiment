// src/screens/Screening.jsx
import React, { useState } from "react";
import ScaleItem from "../components/ScaleItem";
import { SCREENING } from "../data/scales";
import { send } from "../lib/api";

export default function Screening({ onPass }) {
  const [vals, setVals] = useState({});

  const setV = (id, v) => setVals((s) => ({ ...s, [id]: v }));

  const allDone = SCREENING.demographics.every((it) =>
    vals[it.id] !== undefined && vals[it.id] !== "");

  const onSubmit = () => {
    const items = SCREENING.demographics.map((it) => ({
      block: "demographics", id: it.id, value: vals[it.id],
    }));
    send("screening", { items });
    onPass();
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px", color: "#f0f0f0" }}>
      <h1>기본 정보</h1>
      {SCREENING.demographics.map((it) => (
        <ScaleItem key={it.id} item={it} value={vals[it.id]}
                   onChange={(v) => setV(it.id, v)} />
      ))}

      <button disabled={!allDone} onClick={onSubmit}
        style={{ marginTop: 24, padding: "14px 24px",
                 background: allDone ? "#2a5fa8" : "#3a3a3a",
                 color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
                 fontSize: 16 }}>
        다음
      </button>
    </div>
  );
}
