import { spawn } from "node:child_process";
import path from "node:path";

const PORT = process.env.PORT ?? "4173";
const HOST = process.env.HOST ?? "127.0.0.1";
const BASE = process.env.BASE ?? "/master-mystery/";
const PW_BASE_URL = `http://${HOST}:${PORT}${BASE}`;

const viteBin = path.resolve("node_modules/.bin/vite");

const preview = spawn(viteBin, ["preview", "--host", HOST, "--port", PORT, "--strictPort"], {
  stdio: "inherit",
});

let finished = false;
function finish(code) {
  if (finished) return;
  finished = true;

  preview.kill("SIGTERM");
  setTimeout(() => preview.kill("SIGKILL"), 1000).unref();

  setTimeout(() => process.exit(code), 200).unref();
}

preview.on("exit", (code, signal) => {
  if (finished) return;
  console.error(`vite preview exited early (${signal ?? code})`);
  finish(1);
});

setTimeout(() => {
  const project = process.env.PW_PROJECT ?? "chromium";

  const test = spawn("pnpm", ["exec", "playwright", "test", `--project=${project}`], {
    stdio: "inherit",
    env: { ...process.env, PW_BASE_URL },
  });

  test.on("exit", (code) => finish(code ?? 1));
}, 800);
