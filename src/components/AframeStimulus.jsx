// src/components/AframeStimulus.jsx
import React, { useEffect, useRef, useState } from "react";
import { TelemetryRecorder } from "../lib/telemetry";
import { send } from "../lib/api";

export default function AframeStimulus({
  war, mediaCell, videoUrl, durationSec, onComplete, onAbort,
}) {
  const [phase, setPhase] = useState("intro"); // intro | playing
  const recorderRef = useRef(null);
  const intervalRef = useRef(null);
  const [remaining, setRemaining] = useState(durationSec);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function finish(reason) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    recorderRef.current?.stop();
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    send("event", { war, mediaCell, kind: "stim_end", reason });
    if (reason === "abort") onAbort?.();
    else onComplete?.();
  }

  const handleStart = () => {
    const video = document.querySelector("#stim-video");
    if (video) {
      video.muted = false;
      video.play().catch(() => {
        setTimeout(() => video.play().catch(() => {}), 300);
      });

      const onPause = () => send("event", { war, mediaCell, kind: "video_pause" });
      const onPlay  = () => send("event", { war, mediaCell, kind: "video_play" });
      const onSeek  = () => send("event", { war, mediaCell, kind: "video_seek", value: video.currentTime });
      video.addEventListener("pause",  onPause);
      video.addEventListener("play",   onPlay);
      video.addEventListener("seeked", onSeek);
    }

    setPhase("playing");

    setTimeout(() => {
      const camera = document.querySelector("#cam");
      const rec = new TelemetryRecorder({ war, mediaCell });
      recorderRef.current = rec;
      rec.start(camera);
      send("event", { war, mediaCell, kind: "stim_start" });
    }, 100);

    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { finish("auto"); return 0; }
        return r - 1;
      });
    }, 1000);

    const onKey = (e) => { if (e.key === "Escape") finish("abort"); };
    window.addEventListener("keydown", onKey);
  };

  const mmss = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;

  return (
    <div style={{ position: "fixed", top: 0, left: 0,
                  width: "100vw", height: "100vh", background: "#000",
                  touchAction: "none" }}>

      {/* prevent-vr: index.html에서 등록한 컴포넌트 — 모바일 스테레오 VR 모드 진입 차단 */}
      <a-scene
        prevent-vr
        embedded
        loading-screen="enabled: false"
        vr-mode-ui="enabled: false"
        xr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ width: "100%", height: "100%", touchAction: "none" }}>
        <a-assets timeout="0">
          <video id="stim-video" src={videoUrl}
                 crossOrigin="anonymous" playsInline
                 webkit-playsinline="true" preload="auto" />
        </a-assets>
        <a-videosphere src="#stim-video" rotation="0 -90 0" />
        {/* magicWindowTrackingEnabled: false → 손가락 드래그로 상하좌우 모두 제어 */}
        <a-camera id="cam"
                  look-controls="reverseMouseDrag: false; touchEnabled: true; magicWindowTrackingEnabled: false"
                  wasd-controls-enabled="false" />
      </a-scene>

      {/* 재생 중 HUD */}
      {phase === "playing" && (
        <>
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 300,
                        background: "rgba(0,0,0,0.65)", color: "#fff",
                        padding: "6px 10px", borderRadius: 6, fontSize: 14,
                        pointerEvents: "none" }}>
            남은 시간: {mmss}
          </div>
          <button onClick={() => finish("abort_button")}
            style={{ position: "absolute", top: 12, right: 12, zIndex: 300,
                     background: "rgba(120,40,40,0.85)", color: "#fff",
                     border: "none", padding: "10px 16px", borderRadius: 6,
                     cursor: "pointer", fontSize: 14 }}>
            중단하기
          </button>
        </>
      )}

      {/* 조작법 안내 오버레이 */}
      {phase === "intro" && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          zIndex: 200, background: "#0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px", boxSizing: "border-box",
        }}>
          <div style={{
            width: "100%", maxWidth: 500, padding: "32px 24px",
            background: "#111", borderRadius: 14, color: "#f0f0f0",
            border: "1px solid #2a2a2a", textAlign: "center",
            boxSizing: "border-box",
          }}>
            <h2 style={{ marginTop: 0, fontSize: 20 }}>360° 영상 조작 방법</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 16,
                          margin: "20px 0", flexWrap: "wrap" }}>
              <div style={tileStyle}>
                <div style={{ fontSize: 30 }}>🖱️</div>
                <strong style={{ fontSize: 14 }}>PC</strong>
                <p style={{ margin: "6px 0 0", color: "#aaa", fontSize: 12 }}>
                  클릭한 채 드래그해서<br />화면을 둘러보세요
                </p>
              </div>
              <div style={tileStyle}>
                <div style={{ fontSize: 30 }}>👆</div>
                <strong style={{ fontSize: 14 }}>모바일</strong>
                <p style={{ margin: "6px 0 0", color: "#aaa", fontSize: 12 }}>
                  손가락으로 드래그해서<br />상하좌우로 둘러보세요
                </p>
              </div>
            </div>
            <p style={{ color: "#aaa", fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
              영상은 약 {Math.floor(durationSec / 60)}분입니다.<br />
              우상단 버튼으로 언제든 중단할 수 있습니다.
            </p>
            <button onClick={handleStart}
              style={{
                padding: "14px 40px", background: "#2a5fa8", color: "#fff",
                border: "none", borderRadius: 10, fontSize: 17, cursor: "pointer",
                width: "100%", maxWidth: 280,
              }}>
              영상 시작하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const tileStyle = {
  background: "#1a1a1a", borderRadius: 10, padding: "16px 20px",
  minWidth: 120, flex: "1 1 120px", border: "1px solid #2a2a2a",
};
