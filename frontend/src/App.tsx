import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socketClient";
import Widgets from "./perloadUi/wigets";
import { type SystemStats } from "./types/system";

function App() {
  const [systemInfo, setSystemInfo] = useState<SystemStats | null>(null);

  useEffect(() => {
    socket.on("info", (data) => {
      console.log("Received system info from server:", data);
      setSystemInfo(data);
    });
    socket.on("message", (data) => {
      console.log("Message from server:", data);
    });

    // handle unbinding
    return () => {
      socket.off("info");
      socket.off("message");
      setSystemInfo(null);
    };
  }, []);

  return (
    <>
      <div style={{ padding: 16 }}>
        <Widgets systemInfo={systemInfo} />
      </div>
    </>
  );
}

export default App;
