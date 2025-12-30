//  What we need ?
//  -> CPU (load)
//  -> MEM (usage)
//      - total
//      - free
//  -> OS TYPE
//  -> up-TIME
//  -> CPU (info)
//      - type
//      - number of cores
//      - clock speed

const os = require("node:os");

function bytesToMB(bytes) {
  return +(bytes / 1024 / 1024).toFixed(2);
}

function formatSeconds(sec) {
  const days = Math.floor(sec / 86400);
  sec %= 86400;
  const hrs = Math.floor(sec / 3600);
  sec %= 3600;
  const mins = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${days}d ${hrs}h ${mins}m ${s}s`;
}

// sample CPU usage over a short interval and compute percent used
function sampleCpuUsage(delayMs = 100) {
  const snapshot = os.cpus();
  return new Promise((resolve) => {
    setTimeout(() => {
      const snapshot2 = os.cpus();
      let totalIdleDelta = 0;
      let totalTickDelta = 0;

      for (let i = 0; i < snapshot.length; i++) {
        const t1 = snapshot[i].times;
        const t2 = snapshot2[i].times;

        const idleDelta = t2.idle - t1.idle;
        const userDelta = t2.user - t1.user;
        const niceDelta = t2.nice - t1.nice;
        const sysDelta = t2.sys - t1.sys;
        const irqDelta = t2.irq - t1.irq;

        const totalDelta =
          idleDelta + userDelta + niceDelta + sysDelta + irqDelta;

        totalIdleDelta += idleDelta;
        totalTickDelta += totalDelta;
      }

      const usedPercent =
        totalTickDelta > 0
          ? +(100 * (1 - totalIdleDelta / totalTickDelta)).toFixed(2)
          : 0;

      resolve(usedPercent);
    }, delayMs);
  });
}

async function getSystemStats() {
  const cpus = os.cpus() || [];
  const cpuModel = cpus.length ? cpus[0].model : "unknown";
  const cpuSpeedMHz = cpus.length ? cpus[0].speed : 0;
  const cpuCores = cpus.length;

  const loadAvg = os.loadavg(); // [1m, 5m, 15m] (Unix)
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsagePercent = +((usedMem / totalMem) * 100).toFixed(2);

  // measure CPU used percentage over 100ms
  const cpuUsedPercent = await sampleCpuUsage(100);

  return {
    osType: os.type(), // e.g. 'Linux'
    platform: os.platform(), // e.g. 'linux'
    arch: os.arch(), // e.g. 'x64'
    uptime: {
      seconds: os.uptime(),
      human: formatSeconds(os.uptime()),
    },
    memory: {
      totalBytes: totalMem,
      freeBytes: freeMem,
      usedBytes: usedMem,
      totalMB: bytesToMB(totalMem),
      freeMB: bytesToMB(freeMem),
      usedMB: bytesToMB(usedMem),
      usedPercent: memUsagePercent,
    },
    cpu: {
      model: cpuModel,
      cores: cpuCores,
      speedMHz: cpuSpeedMHz,
      loadAverage: {
        "1m": +loadAvg[0].toFixed(2),
        "5m": +loadAvg[1].toFixed(2),
        "15m": +loadAvg[2].toFixed(2),
      },
      usedPercent: cpuUsedPercent, // newly added
    },
    timestamp: new Date().toISOString(),
  };
}

// export for other modules
module.exports = { getSystemStats };

// Print once, and optionally every N seconds if run directly
if (require.main === module) {
  (async () => {
    console.log(JSON.stringify(await getSystemStats(), null, 2));

    // Uncomment to print repeatedly every 5 seconds:
    // setInterval(async () => console.log(JSON.stringify(await getSystemStats(), null, 2)), 5000);
  })();
}
