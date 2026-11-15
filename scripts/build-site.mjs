import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, watch } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

process.chdir(fileURLToPath(new URL("..", import.meta.url)));
const serve = process.argv[2] === "--serve";
if (process.argv.length > 2 && !serve) {
  throw new Error("Usage: node scripts/build-site.mjs [--serve [Hugo server options]]");
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} failed (${result.status ?? result.signal})`);
  }
}

const hugoArgs = ["--gc", ...(serve ? ["-D", "--environment", "development"] : [])];
function index(site = "public") {
  run("npx", ["--yes", "pagefind@1.6.0", "--site", site,
    "--output-path", "public/pagefind"]);
}

// public/ is generated output. Start clean so removed pages cannot be indexed.
rmSync("public", { recursive: true, force: true });
run("hugo", hugoArgs);
index();

if (serve) {
  const help = spawnSync("hugo", ["server", "--help"], { encoding: "utf8" });
  if (help.error) throw help.error;
  if (help.status !== 0) throw new Error("Could not read Hugo server options");
  const disk = help.stdout.includes("--renderToDisk") ? ["--renderToDisk"] : [];
  let timer;

  // Watch sources so replacing public/ cannot disconnect search updates.
  function refreshSearch() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const directory = mkdtempSync(join(tmpdir(), "rustvim-search-"));
      try {
        // Hugo retains deleted pages on disk. Index a fresh build instead.
        run("hugo", [...hugoArgs, "--noBuildLock", "--destination", directory]);
        index(directory);
      } catch (error) {
        console.error(error.message);
      } finally {
        rmSync(directory, { recursive: true, force: true });
      }
    }, 500);
  }

  const sourceDirectories = new Set([
    "archetypes", "assets", "config", "content", "data", "i18n", "layouts",
    "static", "themes",
  ]);
  const sourceWatchers = new Map();
  function watchSource(directory) {
    sourceWatchers.get(directory)?.close();
    sourceWatchers.delete(directory);
    if (existsSync(directory)) {
      const watcher = watch(directory, { recursive: true }, refreshSearch);
      watcher.on("error", onWatchError);
      sourceWatchers.set(directory, watcher);
    }
  }
  for (const directory of sourceDirectories) watchSource(directory);

  // Watch the parent to handle atomic config saves and source directory changes.
  const watcher = watch(".", (_, filename) => {
    if (sourceDirectories.has(filename)) {
      watchSource(filename);
      refreshSearch();
    } else if (/^(hugo|config)\.(toml|ya?ml|json)$/.test(filename ?? "")) {
      refreshSearch();
    }
  });

  const server = spawn("hugo", [
    "server", "-D", "--disableFastRender", "--noHTTPCache", ...disk,
    ...process.argv.slice(3),
  ], { stdio: "inherit" });

  function cleanup() {
    clearTimeout(timer);
    watcher.close();
    for (const watcher of sourceWatchers.values()) watcher.close();
  }

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, () => {
      cleanup();
      server.kill(signal);
    });
  }
  function onWatchError(error) {
    console.error(error.message);
    cleanup();
    server.kill("SIGTERM");
    process.exitCode = 1;
  }
  watcher.on("error", onWatchError);
  server.on("error", (error) => {
    console.error(error.message);
    cleanup();
    process.exitCode = 1;
  });
  server.on("exit", (code, signal) => {
    cleanup();
    process.exitCode ||= code ?? (signal === "SIGINT" ? 130 : 1);
  });
}
