"use client";

import { useEffect, useState } from "react";

import styles from "./DirectusConnectionCheck.module.css";

type PingResult =
  | {
      ok: true;
      status: number;
      directusUrl: string;
      endpoint: string;
      body: string | null;
    }
  | {
      ok: false;
      directusUrl: string;
      endpoint: string;
      error: string;
    };

export function DirectusConnectionCheck() {
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "success"; data: PingResult }
    | { kind: "error"; error: string }
  >({ kind: "idle" });

  useEffect(() => {
    let canceled = false;

    async function run() {
      setState({ kind: "loading" });
      try {
        const response = await fetch("/api/directus/ping", { cache: "no-store" });
        const data = (await response.json()) as PingResult;
        if (!canceled) setState({ kind: "success", data });
      } catch (error) {
        if (!canceled)
          setState({
            kind: "error",
            error: error instanceof Error ? error.message : String(error),
          });
      }
    }

    run();
    return () => {
      canceled = true;
    };
  }, []);

  let content: React.ReactNode;

  if (state.kind === "idle" || state.kind === "loading") {
    content = <p className={styles.text}>Проверяю соединение…</p>;
  } else if (state.kind === "error") {
    content = <p className={styles.text}>Ошибка проверки: {state.error}</p>;
  } else if (state.data.ok) {
    content = (
      <p className={styles.text}>
        Connected ({state.data.status}). Endpoint:{" "}
        <span className={styles.mono}>{state.data.endpoint}</span>
      </p>
    );
  } else {
    content = (
      <p className={styles.text}>
        Not connected. Endpoint: <span className={styles.mono}>{state.data.endpoint}</span>
        {" "}— {state.data.error}
      </p>
    );
  }

  return (
    <section className={styles.wrap} aria-label="Directus connection check">
      <p className={styles.title}>Directus</p>
      {content}
    </section>
  );
}
