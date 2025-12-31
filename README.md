# PERFLOAD

Lightweight system performance reporter: a Node client that samples local system stats (CPU, memory, uptime, MAC, etc.) and sends them to a Socket.IO server. A React frontend receives and displays the stats as widgets.

---

## Features

- Periodic sampling of system stats (CPU usage %, load average, memory usage, uptime, MAC)
- Socket.IO transport: node client -> server -> web clients
- React UI with typed components (TypeScript types under `frontend/src/types`)
- Small, modular codebase suitable for local monitoring or demoing transports

---

## Tech stack

- Backend / client: Node.js (CommonJS)
  - os (built-in) for system stats
  - socket.io-client for sending stats
- Server: Node.js + Socket.IO (server)
- Frontend: React + TypeScript (Vite / Create React App compatible)
- Styling: plain CSS (App.css)

---

## Repo layout (important files)

- nodeclient/index.js — local system stats sampler + socket.io client (emits `info`)
- server/socketMain.js — server socket handlers (receives `info`, broadcasts to clients)
- frontend/src — React app
  - App.tsx — subscribes to socket events and stores systemInfo
  - perloadUi/wigets.tsx, cpu.tsx, memory.tsx — widgets
  - types/system.ts — SystemStats TypeScript definitions
  - socketClient.ts — socket client used by frontend
- frontend/src/App.css — UI styles

---

## Prerequisites

- Linux (development tested here), macOS/Windows should work with minor differences
- Node.js 18+ and npm (or yarn)
- Recommended: run server and client on same machine / local network for easiest setup

---

## Quick start (development)

1. Start the Socket.IO server
   - Example: inside your `server` folder run your server entry (port 3001 in examples)

```bash
npm install
node server/index.js
```
