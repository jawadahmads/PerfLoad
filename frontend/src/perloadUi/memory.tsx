type Memory = {
  totalMB?: number;
  freeMB?: number;
  usedMB?: number;
  usedPercent?: number;
};

export default function MemoryWidget({ memory }: { memory: Memory }) {
  const usedPct =
    typeof memory?.usedPercent === "number" ? memory.usedPercent : 0;

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        padding: 12,
        background: "#fff",
      }}
    >
      <h4 style={{ margin: "0 0 8px 0" }}>Memory</h4>

      <div style={{ fontSize: 13, color: "#333", marginBottom: 8 }}>
        <div>
          Total: {memory?.totalMB ?? "-"} MB · Used: {memory?.usedMB ?? "-"} MB
        </div>
        <div style={{ color: "#666", fontSize: 12 }}>
          Free: {memory?.freeMB ?? "-"} MB
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
          Usage: {usedPct}%
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
              width: `${Math.min(Math.max(usedPct, 0), 100)}%`,
              height: "100%",
              background: usedPct > 75 ? "#e64a19" : "#388e3c",
            }}
          />
        </div>
      </div>
    </div>
  );
}
