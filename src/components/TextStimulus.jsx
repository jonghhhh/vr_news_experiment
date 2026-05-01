// src/components/TextStimulus.jsx
import React, { useEffect, useState } from "react";
import { send } from "../lib/api";

/**
 * 텍스트 + 6장 사진 자극. 스크롤·읽기 시간 telemetry 기록.
 */
const MIN_STAY_SEC = 60;

export default function TextStimulus({
  war, mediaCell, text, durationSec, onComplete, onAbort,
}) {
  const [startedAt] = useState(Date.now());
  const [maxScroll, setMaxScroll] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    send("event", { war, mediaCell, kind: "stim_start" });

    const onScroll = () => {
      const sc = window.scrollY;
      setMaxScroll((m) => Math.max(m, sc));
    };
    window.addEventListener("scroll", onScroll);

    const interval = setInterval(() => {
      const e = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(e);
      if (e >= durationSec) finish("auto");
    }, 1000);

    function finish(reason) {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
      const e = Math.floor((Date.now() - startedAt) / 1000);
      send("event", {
        war, mediaCell, kind: "stim_end", reason,
        elapsedSec: e, maxScrollPx: maxScroll,
      });
      if (reason === "abort") onAbort?.();
      else onComplete?.();
    }

    const onKey = (e) => { if (e.key === "Escape") finish("abort"); };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px",
                  color: "#f0f0f0", lineHeight: 1.7, fontSize: 17 }}>
      <div style={{ marginBottom: 16, color: "#888", fontSize: 13 }}>{text.headline ? "" : ""}</div>
      <h1 style={{ fontSize: 28, lineHeight: 1.3 }}>{text.headline}</h1>
      <p style={{ fontSize: 19, fontWeight: 500, color: "#ccc" }}>{text.lead}</p>
      {text.images.map((src, i) => (
        <div key={i} style={{ margin: "28px 0" }}>
          <img src={src} alt="" style={{ width: "100%", borderRadius: 8 }} />
        </div>
      ))}
      <div style={{ whiteSpace: "pre-wrap" }}>{text.body}</div>

      <div style={{ marginTop: 48, padding: "16px 0", borderTop: "1px solid #2a2a2a" }}>
        <button
          disabled={elapsed < MIN_STAY_SEC}
          onClick={() => onComplete?.()}
          style={{
            background: elapsed >= MIN_STAY_SEC ? "#2a5fa8" : "#3a3a3a",
            color: "#fff", padding: "12px 24px",
            border: "none", borderRadius: 8, fontSize: 16,
            cursor: elapsed >= MIN_STAY_SEC ? "pointer" : "default",
          }}>
          {elapsed < MIN_STAY_SEC
            ? `${MIN_STAY_SEC - elapsed}초 후 이동 가능`
            : "기사를 다 읽었습니다 — 다음으로"}
        </button>
      </div>
    </div>
  );
}
