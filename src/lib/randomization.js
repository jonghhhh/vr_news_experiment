// src/lib/randomization.js
import { MEDIA_CELLS } from "./config";

const KEY = "ij_assign_v1";

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// 페이지 첫 진입 시 1회 배정. 이후 동일 참가자는 같은 조건 유지.
export function getAssignment(webxrAvailable) {
  let a = null;
  try { a = JSON.parse(localStorage.getItem(KEY) || "null"); } catch {}
  if (a) return a;

  // WebXR 가능하면 Tier 3 자연 배정 (균형 유지 위해 1/3 확률만 Tier 3 풀)
  let cell;
  if (webxrAvailable && Math.random() < 0.34) {
    cell = "vrhmd";
  } else {
    cell = pick(MEDIA_CELLS);
  }

  a = { mediaCell: cell, assignedAt: Date.now() };
  localStorage.setItem(KEY, JSON.stringify(a));
  return a;
}

export function clearAssignment() {
  localStorage.removeItem(KEY);
}
