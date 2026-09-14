"use client";

import { useSession, signOut } from "next-auth/react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function PendingApprovalPage() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const shopStatus = session?.user?.shopStatus;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="crema-card w-full max-w-md p-8 text-center shadow-sm">
        {shopStatus === "pending" ? (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FAF7F0] border border-[#E8D399] text-2xl text-[#886C37]">
              ⏳
            </div>
            <h1 className="font-brand-serif text-xl font-bold tracking-tight text-[#181512]">
              {t.pending.awaiting}
            </h1>
            <p className="mt-2 text-xs text-[#675E54]">{t.pending.pendingDesc}</p>
            <p className="mt-4 text-[11px] text-[#968D82]">{t.pending.checkBack}</p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-[#A8423F]">
              ✕
            </div>
            <h1 className="font-brand-serif text-xl font-bold tracking-tight text-[#181512]">
              {t.pending.rejected}
            </h1>
            <p className="mt-2 text-xs text-[#675E54]">{t.pending.rejectedDesc}</p>
          </>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-8 rounded-xl border border-[#E5E3D8] bg-white px-6 py-2 text-xs font-semibold text-[#675E54] hover:bg-[#F8F7F3] transition-colors"
        >
          {t.nav.signOut}
        </button>
      </div>
    </div>
  );
}
