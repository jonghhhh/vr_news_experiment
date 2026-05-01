// src/screens/BehaviorChoice.jsx
import React, { useState } from "react";
import { send } from "../lib/api";

const ACTIONS = [
  { id: "info_un",     label: "UN 인도지원 페이지에서 더 알아보기",
    url: "https://www.unocha.org/" },
  { id: "info_korea",  label: "한국 외교부 분쟁 관련 페이지 보기",
    url: "https://www.mofa.go.kr/" },
  { id: "donate_un",   label: "UNHCR 한국 후원 페이지로 이동",
    url: "https://www.unhcr.or.kr/" },
  { id: "donate_kr",   label: "대한적십자사 인도주의 후원 페이지로 이동",
    url: "https://www.redcross.or.kr/" },
  { id: "share",       label: "이 보도들을 다른 사람과 공유하고 싶다",
    url: null },
];

export default function BehaviorChoice({ onDone }) {
  const [clicked, setClicked] = useState({});

  const handleClick = (a) => {
    setClicked((s) => ({ ...s, [a.id]: true }));
    send("behavior", { action: a.id, label: a.label });
    if (a.url) window.open(a.url, "_blank", "noopener");
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px", color: "#f0f0f0" }}>
      <h1>다음 단계</h1>
      <p style={{ lineHeight: 1.7, fontSize: 16 }}>
        방금 보신 두 분쟁에 대해 더 알아보거나 행동을 취하실 수 있는 옵션입니다.
        관심 있는 항목을 자유롭게 클릭하셔도 좋고, 클릭하지 않으셔도 무관합니다.
      </p>
      <div style={{ marginTop: 16 }}>
        {ACTIONS.map((a) => (
          <button key={a.id} onClick={() => handleClick(a)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "16px 20px", margin: "10px 0",
              background: clicked[a.id] ? "#1a3a6e" : "#1a1a1a",
              color: "#f0f0f0",
              border: "1px solid " + (clicked[a.id] ? "#5b9dff" : "#3a3a3a"),
              borderRadius: 8, fontSize: 15, cursor: "pointer",
            }}>
            {clicked[a.id] ? "✓ " : ""}{a.label}
          </button>
        ))}
      </div>
      <button onClick={onDone}
        style={{ marginTop: 32, padding: "14px 24px", background: "#2a5fa8",
                 color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
                 fontSize: 16 }}>
        디브리핑으로 이동
      </button>
    </div>
  );
}
