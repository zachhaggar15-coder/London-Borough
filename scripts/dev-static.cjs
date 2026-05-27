const { spawn } = require("node:child_process");
const path = require("node:path");

const nextBin = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const args = process.argv.slice(2);
const nextArgs = ["dev", ...(args.length > 0 ? args : ["-p", "3001"])];

const child = spawn(process.execPath, [nextBin, ...nextArgs], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    ROUTING_PROVIDER: "static",
  },
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
