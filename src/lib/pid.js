// src/lib/pid.js
const KEY = "ij_pid_v1";

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getPid() {
  let pid = localStorage.getItem(KEY);
  if (!pid) {
    pid = uuid();
    localStorage.setItem(KEY, pid);
  }
  return pid;
}

export function clearPid() {
  localStorage.removeItem(KEY);
}
