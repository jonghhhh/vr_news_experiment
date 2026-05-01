// src/lib/telemetry.js
import { send } from "./api";
import { TELEMETRY_HZ, TELEMETRY_BATCH } from "./config";

export class TelemetryRecorder {
  constructor({ war, mediaCell }) {
    this.war = war;
    this.mediaCell = mediaCell;
    this.buffer = [];
    this.intervalId = null;
    this.startedAt = null;
    this.cameraEl = null;
  }

  start(cameraEl) {
    this.cameraEl = cameraEl;
    this.startedAt = Date.now();
    const periodMs = Math.round(1000 / TELEMETRY_HZ);
    this.intervalId = setInterval(() => this.tick(), periodMs);
  }

  tick() {
    if (!this.cameraEl) return;
    let yaw = 0, pitch = 0, roll = 0;
    try {
      const r = this.cameraEl.getAttribute("rotation");
      if (r) { yaw = r.y; pitch = r.x; roll = r.z; }
    } catch {}
    this.buffer.push({
      dt: Date.now() - this.startedAt,
      y: Math.round(yaw * 10) / 10,
      p: Math.round(pitch * 10) / 10,
      r: Math.round(roll * 10) / 10,
    });
    if (this.buffer.length >= TELEMETRY_BATCH) this.flush();
  }

  flush() {
    if (!this.buffer.length) return;
    const samples = this.buffer.splice(0);
    send("telemetry", {
      war: this.war,
      mediaCell: this.mediaCell,
      startedAt: this.startedAt,
      samples,
    });
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
    this.flush();
  }
}
