// src/screens/Consent.jsx
import React, { useState } from "react";
import { send } from "../lib/api";
import { STUDY_VERSION } from "../lib/config";

const TEXT = `
경희대학교 미디어학과 연구팀이 진행하는 "뉴스 매체 효과 비교 연구" 참여에 동의해 주셔서 감사합니다.

[연구 목적]
본 연구는 뉴스 보도가 매체 유형(텍스트, 360도 영상 등)에 따라 시청자의 인식·태도에 어떻게 다르게 영향을 미치는지 검증하는 것을 목적으로 합니다.

[참여 절차 및 시간]
약 10–15분 소요. 사전 설문 → 약 2분 분량 영상 시청 → 사후 설문 → 디브리핑 순으로 진행됩니다.

[중단의 자유]
언제든 화면의 "중단" 버튼이나 Esc 키로 종료할 수 있습니다.

[데이터의 익명성]
응답은 익명으로 처리되며, 무작위 식별번호로만 저장됩니다. IP 주소는 해시 처리됩니다. 시선 이동 등 행동 데이터는 응답 데이터와 함께 분석되나, 개인 식별 정보와는 결합되지 않습니다.

[데이터 사용]
수집된 데이터는 학술 연구 목적으로만 사용됩니다. 모든 공개 데이터는 익명 처리됩니다.

[연락처]
연구책임자: 이종혁 교수 (경희대 미디어학과)
이메일: jonghhhh@khu.ac.kr
`;

export default function Consent({ onAgree }) {
  const [agree, setAgree] = useState(false);
  const [age18, setAge18] = useState(false);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px", color: "#f0f0f0" }}>
      <h1 style={{ fontSize: 26 }}>참여 동의서</h1>
      <pre style={{
        whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: 15,
        lineHeight: 1.7, background: "#1a1a1a", padding: 20, borderRadius: 8,
        border: "1px solid #2a2a2a", maxHeight: 400, overflowY: "auto",
      }}>{TEXT}</pre>

      <label style={{ display: "block", margin: "16px 0", fontSize: 16 }}>
        <input type="checkbox" checked={age18} onChange={(e) => setAge18(e.target.checked)} />
        {" "}나는 만 19세 이상입니다.
      </label>
      <label style={{ display: "block", margin: "16px 0", fontSize: 16 }}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        {" "}위 내용을 모두 읽었으며, 자발적으로 본 연구에 참여하는 것에 동의합니다.
      </label>

      <button
        disabled={!(agree && age18)}
        onClick={() => {
          send("consent", { agreed: true, version: STUDY_VERSION });
          onAgree();
        }}
        style={{
          padding: "14px 24px",
          background: (agree && age18) ? "#2a5fa8" : "#3a3a3a",
          color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
          fontSize: 16, marginTop: 16,
        }}>
        동의하고 시작하기
      </button>
    </div>
  );
}
