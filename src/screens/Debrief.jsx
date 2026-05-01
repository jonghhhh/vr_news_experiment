// src/screens/Debrief.jsx
import React from "react";
import { send } from "../lib/api";

export default function Debrief() {
  React.useEffect(() => {
    send("event", { kind: "completed" });
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px", color: "#f0f0f0" }}>
      <h1>참여해 주셔서 감사합니다</h1>

      <h2 style={{ marginTop: 24 }}>연구 목적 안내</h2>
      <p style={{ lineHeight: 1.7 }}>
        본 연구는 동일한 전쟁 보도가 텍스트, 360도 영상, VR 헤드셋 등 매체에 따라
        시청자의 몰입감, 공감, 정책 태도, 행동 의향에 어떻게 다른 영향을 미치는지
        검증하는 실험이었습니다. 참여자분의 응답은 매체별 효과를 비교하는 데 매우
        중요한 자료가 됩니다.
      </p>

      <h2 style={{ marginTop: 32 }}>문의</h2>
      <p style={{ lineHeight: 1.7 }}>
        연구 문의: 이종혁 교수 (경희대 미디어학과) [PI 이메일]<br/>
        IRB 문의: 경희대학교 생명윤리위원회
      </p>
    </div>
  );
}
