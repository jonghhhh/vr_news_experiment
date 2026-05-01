// src/components/TraumaWarning.jsx
import React from "react";

export default function TraumaWarning({ war, onContinue, onWithdraw }) {
  const place = war === "UA" ? "우크라이나" : "가자";
  return (
    <div style={{ maxWidth: 640, margin: "60px auto", padding: 24,
                  background: "#1a1a1a", borderRadius: 12, color: "#f0f0f0",
                  border: "1px solid #5a3a3a" }}>
      <h2 style={{ marginTop: 0, color: "#ff9b9b" }}>⚠️ 자극 사전 안내</h2>
      <p style={{ lineHeight: 1.7 }}>
        다음으로 보실 약 5분 분량의 보도는 <strong>{place} 분쟁 현장</strong>의
        영상·이미지를 포함합니다. 폐허, 이재민, 인터뷰 등 정서적으로 무거운
        장면이 포함될 수 있습니다.
      </p>
      <p style={{ lineHeight: 1.7 }}>
        <strong>언제든 중단할 수 있습니다.</strong> 화면 우상단의 <em>중단하기</em>
        버튼을 누르거나 <kbd>Esc</kbd> 키를 누르시면 즉시 자극이 종료되며,
        그래도 보상은 정상 지급됩니다.
      </p>
      <p style={{ lineHeight: 1.7, color: "#bbb" }}>
        강한 정서적 반응이 예상되시면 <em>참여 종료</em>를 선택하셔도 좋습니다.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button onClick={onContinue}
          style={{ flex: 1, padding: "14px 16px", background: "#2a5fa8",
                   color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
                   fontSize: 16 }}>
          계속하기
        </button>
        <button onClick={onWithdraw}
          style={{ flex: 1, padding: "14px 16px", background: "transparent",
                   color: "#ccc", border: "1px solid #555", borderRadius: 8,
                   cursor: "pointer", fontSize: 16 }}>
          참여 종료
        </button>
      </div>
    </div>
  );
}
