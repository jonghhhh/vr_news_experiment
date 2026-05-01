// src/screens/Landing.jsx
import React from "react";

export default function Landing({ onStart }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "24px",
      background: "#0a0a0a",
    }}>
      <div style={{
        maxWidth: 600, width: "100%", textAlign: "center", color: "#f0f0f0",
      }}>
        <p style={{ color: "#8ab4f8", fontSize: 14, letterSpacing: 1,
                    marginBottom: 16, textTransform: "uppercase" }}>
          VR 뉴스 연구팀
        </p>

        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.4,
                     margin: "0 0 20px" }}>
          VR 뉴스 효과 실험
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#ccc",
                    marginBottom: 12 }}>
          이 연구는 뉴스 보도의 매체 형식(텍스트, 360도 영상 등)이
          시청자의 인식과 태도에 미치는 영향을 알아보는 실험입니다.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "#aaa",
                    marginBottom: 40 }}>
          참여 시간은 약 <strong style={{ color: "#f0f0f0" }}>10–15분</strong>이며,
          짧은 사전 설문 → 영상 시청(약 2분) → 사후 설문 → 종료 순으로 진행됩니다.
        </p>

        <button onClick={onStart}
          style={{
            padding: "16px 48px", background: "#2a5fa8", color: "#fff",
            border: "none", borderRadius: 10, fontSize: 17, cursor: "pointer",
            width: "100%", maxWidth: 280,
          }}>
          연구 참여하기
        </button>

        <p style={{ marginTop: 24, fontSize: 12, color: "#555" }}>
          연구책임자: 이종혁 교수 (경희대 미디어학과) · jonghhhh@khu.ac.kr
        </p>
      </div>
    </div>
  );
}
