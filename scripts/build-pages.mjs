import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Track renamed files for safe restoration
const renamedFiles = [];

function disableFile(filePath) {
  if (fs.existsSync(filePath)) {
    const disabledPath = `${filePath}.disabled`;
    fs.renameSync(filePath, disabledPath);
    renamedFiles.push({ original: filePath, disabled: disabledPath });
  }
}

function walkAndDisable(dir, targetFileNames) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndDisable(fullPath, targetFileNames);
    } else if (entry.isFile() && targetFileNames.includes(entry.name)) {
      disableFile(fullPath);
    }
  }
}

function backupAndPrepare() {
  console.log("[build-pages] Preparing static export: disabling server-only API route handlers...");

  // 1. Disable proxy.ts if it exists
  disableFile(path.join(rootDir, "src", "proxy.ts"));

  // 2. Disable all server-only route handlers in src/app/api (intercepted by client mock-api in static export)
  walkAndDisable(path.join(rootDir, "src", "app", "api"), ["route.ts", "route.js"]);

  console.log("[build-pages] All UI routes (marketing, dashboard, staff, admin, blog, auth) are active for static compilation.");
}

function restoreAll() {
  console.log("[build-pages] Restoring all original files...");

  // Restore disabled files in reverse order
  while (renamedFiles.length > 0) {
    const item = renamedFiles.pop();
    try {
      if (fs.existsSync(item.disabled)) {
        fs.renameSync(item.disabled, item.original);
      }
    } catch (err) {
      console.error(`[build-pages] Failed to restore ${item.original}:`, err);
    }
  }

  console.log("[build-pages] Repository restored to original state.");
}

// Ensure cleanup runs on interruptions
process.on("SIGINT", () => {
  restoreAll();
  process.exit(1);
});
process.on("SIGTERM", () => {
  restoreAll();
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("[build-pages] Uncaught error:", err);
  restoreAll();
  process.exit(1);
});

async function main() {
  console.log("=== Princes Coffee: Preparing Static Export for GitHub Pages ===");
  backupAndPrepare();

  let buildSuccess = false;
  try {
    const repoName = process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
      : "/coffeeloyal";

    const basePath =
      process.env.NEXT_PUBLIC_BASE_PATH !== undefined
        ? process.env.NEXT_PUBLIC_BASE_PATH
        : repoName;

    const env = {
      ...process.env,
      STATIC_EXPORT: "true",
      NEXT_PUBLIC_STATIC_EXPORT: "true",
      NEXT_PUBLIC_BASE_PATH: basePath,
    };

    console.log("[build-pages] Running Next.js build...");
    const buildResult = spawnSync("npx", ["next", "build"], {
      cwd: rootDir,
      env,
      stdio: "inherit",
      shell: true,
    });

    if (buildResult.status !== 0) {
      throw new Error(`next build exited with code ${buildResult.status}`);
    }

    // Ensure .nojekyll exists in out/
    const outDir = path.join(rootDir, "out");
    if (fs.existsSync(outDir)) {
      fs.writeFileSync(path.join(outDir, ".nojekyll"), "", "utf8");

      // If trailingSlash created out/404/index.html, ensure out/404.html also exists
      const trailing404 = path.join(outDir, "404", "index.html");
      const root404 = path.join(outDir, "404.html");
      if (fs.existsSync(trailing404) && !fs.existsSync(root404)) {
        fs.copyFileSync(trailing404, root404);
      }
    }

    console.log("[build-pages] Static export completed successfully in out/");
    buildSuccess = true;
  } finally {
    restoreAll();
  }

  if (!buildSuccess) {
    process.exit(1);
  }
}

main();
