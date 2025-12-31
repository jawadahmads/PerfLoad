/**
 * Types matching the shape returned by nodeclient.getSystemStats()
 */

export type LoadAverage = {
  "1m": number;
  "5m": number;
  "15m": number;
};

export interface CpuInfo {
  model: string;
  cores: number;
  speedMHz: number;
  loadAverage: LoadAverage;
  usedPercent: number;
}

export interface MemoryInfo {
  totalBytes: number;
  freeBytes: number;
  usedBytes: number;
  totalMB: number;
  freeMB: number;
  usedMB: number;
  usedPercent: number;
}

export interface UptimeInfo {
  seconds: number;
  human: string;
}

export interface SystemStats {
  osType: string;
  platform: string;
  arch: string;
  uptime: UptimeInfo;
  memory: MemoryInfo;
  cpu: CpuInfo;
  macAddress: string;
  timestamp: string; // ISO string
}
