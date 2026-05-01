// src/screens/DeviceCheck.jsx
import React, { useEffect, useState } from "react";
import { getAssignment } from "../lib/randomization";
import { send } from "../lib/api";

export default function DeviceCheck({ onAssigned }) {
  const [status, setStatus] = useState("checking"); // checking | done
  const [assignment, setAssignment] = useState(null);
  const [info, setInfo] = useState({});

  useEffect(() => {
    (async () => {
      const xrSupported =
        !!(navigator.xr && (await navigator.xr.isSessionSupported?.("immersive-vr").catch(() => false)));
      const isMobile = /Android|iPhone|iPad|iPod/.test(navigator.userAgent);

      const a = getAssignment(xrSupported);
      setAssignment(a);
      const i = {
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        webxr: xrSupported,
        mobile: isMobile,
      };
      setInfo(i);
      send("device", { ...i, mediaCell: a.mediaCell, warOrder: a.warOrder });
      setStatus("done");
    })();
  }, []);

  if (status === "checking") return <Center>장치 확인 중…</Center>;

  const cell = assignment?.mediaCell;
  let cellInstruction = "";
  if (cell === "text") cellInstruction = "본 연구에서는 기사(텍스트+사진) 한 편을 보시게 됩니다.";
  if (cell === "video360") cellInstruction = "본 연구에서는 360도 영상 한 편을 시청하시게 됩니다. 마우스 드래그(PC) 또는 손가락 드래그·기기 회전(모바일)으로 시점을 자유롭게 둘러보실 수 있습니다.";
  if (cell === "vrhmd") cellInstruction = "본 연구에서는 360도 영상 한 편을 VR 헤드셋으로 시청하시게 됩니다. 영상 시작 후 화면의 'Enter VR' 버튼을 눌러 헤드셋 모드로 진입하세요.";

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px", color: "#f0f0f0" }}>
      <h1>본 시청 안내</h1>
      <p style={{ lineHeight: 1.7, fontSize: 16 }}>{cellInstruction}</p>
      <p style={{ lineHeight: 1.7, fontSize: 16, color: "#bbb" }}>
        가능하시면 <strong>이어폰을 착용</strong>해 주세요. 영상은 약 2분입니다.
      </p>
      <button onClick={() => onAssigned(assignment)}
        style={{ marginTop: 24, padding: "14px 24px", background: "#2a5fa8",
                 color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
                 fontSize: 16 }}>
        준비됐습니다 — 시작
      </button>
    </div>
  );
}

function Center({ children }) {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
                       minHeight: "60vh", color: "#aaa" }}>{children}</div>;
}
