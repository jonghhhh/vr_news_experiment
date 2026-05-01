// src/components/ScaleItem.jsx
import React from "react";

const wrap  = { padding: "14px 0", borderBottom: "1px solid #2a2a2a" };
const label = { display: "block", marginBottom: 10, fontSize: 15, lineHeight: 1.5 };

function btn(active) {
  return {
    flex: "1 1 0",
    minWidth: 0,
    padding: "10px 2px",
    borderRadius: 6,
    border: "1px solid " + (active ? "#5b9dff" : "#3a3a3a"),
    background: active ? "#1a3a6e" : "transparent",
    color: "#f0f0f0",
    cursor: "pointer",
    fontSize: 13,
    textAlign: "center",
  };
}

export default function ScaleItem({ item, value, onChange }) {
  if (item.type === "number") {
    return (
      <div style={wrap}>
        <label style={label}>{item.label}</label>
        <input type="number" min={item.min} max={item.max} value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{ padding: 10, width: 120, fontSize: 16,
                   background: "#1a1a1a", color: "#f0f0f0",
                   border: "1px solid #3a3a3a", borderRadius: 6 }} />
      </div>
    );
  }

  if (item.type === "choice") {
    return (
      <div style={wrap}>
        <label style={label}>{item.label}</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {item.options.map((opt) => (
            <button key={opt}
              style={{
                padding: "10px 14px", borderRadius: 8, cursor: "pointer",
                border: "1px solid " + (value === opt ? "#5b9dff" : "#3a3a3a"),
                background: value === opt ? "#1a3a6e" : "transparent",
                color: "#f0f0f0", fontSize: 14,
              }}
              onClick={() => onChange(opt)}>{opt}</button>
          ))}
        </div>
      </div>
    );
  }

  if (item.type === "slider") {
    const v = value === undefined || value === "" ? item.default : value;
    return (
      <div style={wrap}>
        <label style={label}>{item.label}: <strong>{v}</strong></label>
        <input type="range" min={item.min} max={item.max} value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#5b9dff" }} />
        <div style={{ display: "flex", justifyContent: "space-between",
                      fontSize: 11, color: "#888", marginTop: 4 }}>
          <span>매우 차가움 (0)</span><span>매우 따뜻함 (100)</span>
        </div>
      </div>
    );
  }

  if (item.type === "shortanswer") {
    return (
      <div style={wrap}>
        <label style={label}>{item.label}</label>
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)}
          rows={3} style={{ width: "100%", padding: 10, fontSize: 14, boxSizing: "border-box",
                            background: "#1a1a1a", color: "#f0f0f0",
                            border: "1px solid #3a3a3a", borderRadius: 6 }} />
      </div>
    );
  }

  // likert7 — 모바일 대응: flex wrap 없이 min-width 0으로 균등 분배
  return (
    <div style={wrap}>
      <label style={label}>{item.label}</label>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <button key={n} style={btn(value === n)} onClick={() => onChange(n)}>{n}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between",
                    marginTop: 6, fontSize: 11, color: "#888" }}>
        <span>전혀 그렇지 않다</span><span>매우 그렇다</span>
      </div>
    </div>
  );
}
