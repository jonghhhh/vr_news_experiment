// src/lib/config.js
// ⚠️ 배포 전 APPS_SCRIPT_URL을 본인의 Web App URL로 교체하세요.

export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxsSHLPnk9XIwfHrhFPi8BShrXm644DmDxwUx9mcj4WeaEwESTWB1q60nOz0STsi3Q2/exec";

export const STUDY_VERSION = "1.0.0";

export const TELEMETRY_HZ = 10;       // 100ms 간격
export const TELEMETRY_BATCH = 50;    // 5초마다 전송

export const STIMULUS_DURATION_SEC = 120;  // 자극 2분

// 매체 cell. Tier 3은 디바이스 능력에 따라 자동 추가.
export const MEDIA_CELLS = ["text", "video360"];
