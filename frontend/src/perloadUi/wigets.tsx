import CpuWidget from "./cpu";
import MemoryWidget from "./memory";
import type { SystemStats } from "../types/system";

type Props = {
  systemInfo: SystemStats | null;
};

export default function Widgets({ systemInfo }: Props) {
  if (!systemInfo) {
    return <div>Waiting for system info...</div>;
  }

  const { osType, platform, arch, uptime, macAddress, timestamp, cpu, memory } =
    systemInfo;

  return (
    <div style={{ fontFamily: "sans-serif", gap: 12 }}>
      <header style={{ marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>
          {osType} / {platform} ({arch})
        </h3>
        <div style={{ fontSize: 12, color: "#555" }}>
          Uptime: {uptime?.human} · MAC: {macAddress} · updated:{" "}
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </header>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <CpuWidget cpu={cpu} />
        </div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <MemoryWidget memory={memory} />
        </div>
      </div>
    </div>
  );
}
