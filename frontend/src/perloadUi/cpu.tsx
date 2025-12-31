import React from "react";

type Cpu = {
  model?: string;
  cores?: number;
  speedMHz?: number;
  loadAverage?: { "1m"?: number; "5m"?: number; "15m"?: number };
  usedPercent?: number;
};

export default function CpuWidget({ cpu }: { cpu: Cpu }) {
  const used = typeof cpu?.usedPercent === "number" ? cpu.usedPercent : 0;

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        padding: 12,
        background: "#fff",
      }}
    >
      <h4 style={{ margin: "0 0 8px 0" }}>CPU</h4>

      <div style={{ fontSize: 13, color: "#333", marginBottom: 8 }}>
        <div>{cpu?.model || "unknown"}</div>
        <div style={{ color: "#666", fontSize: 12 }}>
          {cpu?.cores} cores · {cpu?.speedMHz} MHz
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
          Usage: {used}%{" "}
        </div>
        <div
          style={{
            height: 12,
            background: "#f0f0f0",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(Math.max(used, 0), 100)}%`,
              height: "100%",
              background: used > 75 ? "#e64a19" : "#1976d2",
            }}
          />
        </div>
      </div>

      <div style={{ fontSize: 12, color: "#666" }}>
        Load Avg: 1m {cpu?.loadAverage?.["1m"] ?? "-"}, 5m{" "}
        {cpu?.loadAverage?.["5m"] ?? "-"}, 15m{" "}
        {cpu?.loadAverage?.["15m"] ?? "-"}
      </div>
    </div>
  );
}
