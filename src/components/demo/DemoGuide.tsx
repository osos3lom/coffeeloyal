"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Users,
  Store,
  ShieldCheck,
  RotateCcw,
  X,
  ChevronRight,
  Coffee,
} from "lucide-react";
import { getDemoRole, setDemoRole, type DemoRole } from "@/lib/demo/demo-session";
import { resetDemoState } from "@/lib/demo/mock-api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DemoGuide() {
  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<DemoRole>(() => getDemoRole());

  useEffect(() => {
    if (isStatic) {
      const handleRoleChange = (e: Event) => {
        const custom = e as CustomEvent<DemoRole>;
        setRole(custom.detail || getDemoRole());
      };
      window.addEventListener("coffeeloyal:role-change", handleRoleChange);
      return () => {
        window.removeEventListener("coffeeloyal:role-change", handleRoleChange);
      };
    }
  }, [isStatic]);

  if (!isStatic) return null;

  const handleSelectRole = (newRole: DemoRole, targetRoute?: string) => {
    setRole(newRole);
    setDemoRole(newRole);
    if (targetRoute) {
      router.push(targetRoute);
    }
  };

  const handleReset = () => {
    resetDemoState();
    window.location.reload();
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <aside aria-label="Interactive Demo Controls" className="fixed bottom-20 start-4 z-50 md:bottom-6">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-[#C5A869]/60 bg-[#181512] px-4 py-2.5 text-xs font-semibold text-[#F8F7F3] shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#C5A869] hover:bg-[#2C3627]"
        >
          <span className="flex size-2 rounded-full bg-[#C5A869] animate-pulse" />
          <Sparkles className="size-3.5 text-[#E8D399]" />
          <span>لوحة تجربة العرض</span>
          <span className="rounded-md bg-[#FAF7F0]/15 px-1.5 py-0.5 text-[0.625rem] text-[#E8D399]">
            {role === "customer"
              ? "عميل"
              : role === "staff"
              ? "موظف"
              : role === "admin"
              ? "إدارة"
              : "زائر"}
          </span>
        </button>
      </aside>

      {/* Slide-over sheet */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm transition-opacity">
          <div
            className="flex h-full w-full max-w-md flex-col bg-[#F8F7F3] shadow-2xl p-6 overflow-y-auto"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E3D8] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#53634B] text-white">
                  <Coffee className="size-5" />
                </div>
                <div>
                  <h2 className="font-brand-serif text-lg font-bold text-[#181512]">
                    عرض قهوة الأمراء التفاعلي
                  </h2>
                  <p className="text-xs text-[#8A8175]">
                    نسخة GitHub Pages مع محاكاة كاملة
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-[#675E54] hover:bg-[#E5E3D8] hover:text-[#181512]"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Role Switcher */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A18548]">
                تبديل الأدوار وتجربة الشاشات
              </h3>
              <p className="mt-1 text-xs text-[#675E54]">
                اختر دور المستخدم لاستعراض الواجهة والصلاحيات الخاصة به:
              </p>

              <div className="mt-4 space-y-2.5">
                {/* Customer */}
                <button
                  onClick={() => handleSelectRole("customer", "/dashboard")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-3.5 text-start transition-all",
                    role === "customer"
                      ? "border-[#53634B] bg-white shadow-sm ring-1 ring-[#53634B]"
                      : "border-[#E5E3D8] bg-white/70 hover:bg-white",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#FAF7F0] text-[#53634B]">
                      <Users className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#181512]">
                          عميل (سارة الأحمدي)
                        </span>
                        {role === "customer" && (
                          <span className="text-[0.625rem] font-semibold text-[#53634B] bg-[#53634B]/10 px-1.5 py-0.5 rounded">
                            نشط
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#675E54]">
                        ٧ من ٩ أختام في فرع التحلية مول
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-[#8A8175] rtl:rotate-180" />
                </button>

                {/* Staff */}
                <button
                  onClick={() => handleSelectRole("staff", "/staff")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-3.5 text-start transition-all",
                    role === "staff"
                      ? "border-[#53634B] bg-white shadow-sm ring-1 ring-[#53634B]"
                      : "border-[#E5E3D8] bg-white/70 hover:bg-white",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#FAF7F0] text-[#53634B]">
                      <Store className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#181512]">
                          موظف فرع (أحمد الغامدي)
                        </span>
                        {role === "staff" && (
                          <span className="text-[0.625rem] font-semibold text-[#53634B] bg-[#53634B]/10 px-1.5 py-0.5 rounded">
                            نشط
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#675E54]">
                        توليد QR للعميل ومسح الأكواد للاستبدال
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-[#8A8175] rtl:rotate-180" />
                </button>

                {/* Admin */}
                <button
                  onClick={() => handleSelectRole("admin", "/admin")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-3.5 text-start transition-all",
                    role === "admin"
                      ? "border-[#53634B] bg-white shadow-sm ring-1 ring-[#53634B]"
                      : "border-[#E5E3D8] bg-white/70 hover:bg-white",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#FAF7F0] text-[#53634B]">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#181512]">
                          مدير النظام (سلطان العتيبي)
                        </span>
                        {role === "admin" && (
                          <span className="text-[0.625rem] font-semibold text-[#53634B] bg-[#53634B]/10 px-1.5 py-0.5 rounded">
                            نشط
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#675E54]">
                        إدارة ٣٧ فرعاً والمستخدمين والتقارير
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-[#8A8175] rtl:rotate-180" />
                </button>

                {/* Guest */}
                <button
                  onClick={() => handleSelectRole("guest", "/")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-3.5 text-start transition-all",
                    role === "guest"
                      ? "border-[#53634B] bg-white shadow-sm ring-1 ring-[#53634B]"
                      : "border-[#E5E3D8] bg-white/70 hover:bg-white",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#FAF7F0] text-[#53634B]">
                      <Users className="size-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#181512]">
                        زائر عام (بدون تسجيل)
                      </span>
                      <p className="text-xs text-[#675E54]">
                        تصفح الموقع العام والقائمة والفروع
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-[#8A8175] rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Pitch narrative guide */}
            <div className="mt-8 rounded-xl border border-[#E5E3D8] bg-white p-4">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A18548]">
                <Sparkles className="size-3.5" />
                مسار العرض المقترح (Pitch Flow)
              </h3>
              <ol className="mt-3 space-y-3 text-xs leading-relaxed text-[#675E54]">
                <li className="flex gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FAF7F0] font-bold text-[#53634B]">
                    ١
                  </span>
                  <span>
                    <strong>الموقع والهوية:</strong> استعرض الصفحة الرئيسية المختصرة (٦ أقسام)، ثم المدونة والمقالات الستة، وتحذير الكافيين في التذييل.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FAF7F0] font-bold text-[#53634B]">
                    ٢
                  </span>
                  <span>
                    <strong>بطاقة ولاء العميل:</strong> افتح لوحة العميل وشاهد بطاقة الختم الرقمية (٧/٩)، ادخل على صفحة المسح واستخدم زر &quot;محاكاة المسح&quot; لتسجيل ختم فوري!
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FAF7F0] font-bold text-[#53634B]">
                    ٣
                  </span>
                  <span>
                    <strong>شاشة موظف الفرع:</strong> بدّل للموظف وافتح توليد كود QR، واعرض سجل العمليات السريعة للفرع.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FAF7F0] font-bold text-[#53634B]">
                    ٤
                  </span>
                  <span>
                    <strong>إدارة الفروع:</strong> ادخل على لوحة الإدارة لرؤية فروع جدة ومكة والطائف الـ ٣٧ وحالة كل فرع.
                  </span>
                </li>
              </ol>
            </div>

            {/* Quick Reset */}
            <div className="mt-auto pt-6 border-t border-[#E5E3D8]">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="w-full justify-center gap-2 border-[#DDD9CC] text-xs text-[#675E54]"
              >
                <RotateCcw className="size-3.5" />
                <span>إعادة ضبط بيانات العرض الأولية (٧ أختام)</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
