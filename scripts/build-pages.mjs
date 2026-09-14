import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Track renamed files for safe restoration
const renamedFiles = [];
const createdFiles = [];

// Static preview page content for /login and /register
const previewPageTemplate = (titleEn, titleAr) => `"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function StaticDemoNotice() {
  const { lang, setLang } = useTranslation();
  const isAr = lang === "ar";
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8F7F3] px-4 py-12">
      <div className="absolute top-6 start-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5A5248] transition-colors hover:text-[#181512]"
        >
          <BackArrow className="size-4" />
          <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
        </Link>
      </div>

      <div className="absolute top-6 end-6">
        <button
          onClick={() => setLang(isAr ? "en" : "ar")}
          className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#5A5248] transition-colors hover:bg-[#EFECE4] hover:text-[#181512]"
        >
          {isAr ? "EN" : "ع"}
        </button>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-[#E7E2D8] bg-white/90 p-8 shadow-sm backdrop-blur">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Princes' Coffee"
            width={140}
            height={36}
            className="h-9 w-auto object-contain"
          />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-[#C5A869]/15 px-3 py-1 text-xs font-medium text-[#7A6332] mb-4">
          <Sparkles className="size-3.5" />
          <span>{isAr ? "نسخة المعاينة (GitHub Pages)" : "Static Preview (GitHub Pages)"}</span>
        </div>

        <h1 className="text-xl font-bold text-[#181512] mb-2 font-display">
          {isAr ? "${titleAr}" : "${titleEn}"}
        </h1>

        <p className="text-sm text-[#5A5248] leading-relaxed mb-6">
          {isAr
            ? "أنت تتصفح حالياً العرض الثابت لموقع قهوة الأمراء على GitHub Pages. نظام المصادقة وقاعدة بيانات الولاء تعمل على خادم Node.js و PostgreSQL كامل."
            : "You are currently viewing the static showcase on GitHub Pages. Full user authentication, staff dashboards, and QR point tracking require a live Node.js and PostgreSQL server."}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#2C3627] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1f261c]"
          >
            {isAr ? "استكشف قائمة المشروبات والمتاجر" : "Explore Menu & Stores"}
          </Link>

          <a
            href="https://github.com/osos3lom/coffeeloyal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7E2D8] bg-[#F8F7F3] px-4 py-2.5 text-sm font-medium text-[#2C3627] transition-colors hover:bg-[#EFECE4]"
          >
            <ExternalLink className="size-4" />
            <span>{isAr ? "عرض الكود المصدري على GitHub" : "View Source on GitHub"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
`;

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
  console.log("[build-pages] Temporarily disabling non-marketing routes for static export...");

  // 1. Disable proxy.ts (middleware)
  disableFile(path.join(rootDir, "src", "proxy.ts"));

  // 2. Disable all route.ts in src/app/api
  walkAndDisable(path.join(rootDir, "src", "app", "api"), ["route.ts", "route.js"]);

  // 3. Disable page.tsx in admin, staff, dashboard, settings, forgot-password
  const dynamicDirs = ["admin", "staff", "dashboard", "settings", "forgot-password"];
  for (const d of dynamicDirs) {
    walkAndDisable(path.join(rootDir, "src", "app", d), ["page.tsx", "page.js", "layout.tsx", "layout.js"]);
  }

  // 4. Set up temporary preview pages for login and register
  const previewPages = [
    { dir: path.join(rootDir, "src", "app", "login"), titleEn: "Sign In", titleAr: "تسجيل الدخول" },
    { dir: path.join(rootDir, "src", "app", "register"), titleEn: "Join Loyalty Program", titleAr: "الانضمام لبرنامج الولاء" },
  ];

  for (const item of previewPages) {
    const pagePath = path.join(item.dir, "page.tsx");
    disableFile(pagePath);
    fs.writeFileSync(pagePath, previewPageTemplate(item.titleEn, item.titleAr), "utf8");
    createdFiles.push(pagePath);
  }
}

function restoreAll() {
  console.log("[build-pages] Restoring all original files...");

  // 1. Remove temporary preview files
  while (createdFiles.length > 0) {
    const file = createdFiles.pop();
    try {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    } catch (err) {
      console.error(`[build-pages] Error removing created file ${file}:`, err);
    }
  }

  // 2. Restore disabled files in reverse order
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
  console.log("=== QuickStamp: Preparing Static Export for GitHub Pages ===");
  backupAndPrepare();

  let buildSuccess = false;
  try {
    const env = {
      ...process.env,
      STATIC_EXPORT: "true",
      NEXT_PUBLIC_STATIC_EXPORT: "true",
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
