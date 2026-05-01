// src/lib/api.js
import { APPS_SCRIPT_URL, STUDY_VERSION } from "./config";
import { getPid } from "./pid";

const QUEUE_KEY = "ij_queue_v1";

function loadQueue() {
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); }
  catch { return []; }
}
function saveQueue(q) { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); }

async function sendOnce(envelope) {
  // text/plain 으로 보내면 CORS preflight 회피 (Apps Script doPost 호환)
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(envelope),
    redirect: "follow",
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json().catch(() => ({ ok: true }));
}

export async function send(type, payload) {
  const envelope = {
    type,
    payload: { pid: getPid(), v: STUDY_VERSION, t: Date.now(), ...payload },
  };
  try {
    return await sendOnce(envelope);
  } catch (e) {
    const q = loadQueue();
    q.push(envelope);
    saveQueue(q);
    return { queued: true };
  }
}

// 페이지 로드 시 큐 비우기 시도
export async function flushQueue() {
  const q = loadQueue();
  if (!q.length) return;
  const remaining = [];
  for (const env of q) {
    try { await sendOnce(env); } catch { remaining.push(env); }
  }
  saveQueue(remaining);
}
