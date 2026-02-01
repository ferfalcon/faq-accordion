import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
if (!API_BASE_URL) throw new Error("Missing VITE_API_BASE_URL");

type Health = { ok: boolean };

function HealthCheck() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [data, setData] = useState<Health | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/healthz`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Health;
        setData(json);
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    };

    run();

    return () => controller.abort();
  }, []);

  return (
    <>
      <p>
        API status:{" "}
        {status === "idle" ? "Checking..." : status === "ok" ? "✅ OK" : "❌ Error"}
      </p>

      {data && <p>{JSON.stringify(data, null, 2)}</p>}

      <small>API: {API_BASE_URL}</small>
    </>
  )
}

export default HealthCheck;