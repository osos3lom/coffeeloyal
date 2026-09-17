import type { Session } from "next-auth";

export type DemoRole = "customer" | "staff" | "admin" | "guest";

export const DEMO_ROLE_KEY = "coffeeloyal_demo_role";

export const DEMO_USERS: Record<Exclude<DemoRole, "guest">, Session["user"]> = {
  customer: {
    id: "demo-cust-1",
    name: "سارة الأحمدي",
    email: "sara@princes.sa",
    role: "customer",
    shopId: null,
  },
  staff: {
    id: "demo-staff-1",
    name: "أحمد الغامدي",
    email: "ahmed@princes.sa",
    role: "staff",
    shopId: "1",
    shopName: "قهوة الأمراء - فرع التحلية مول",
    shopStatus: "active",
  },
  admin: {
    id: "demo-admin-1",
    name: "سلطان العتيبي",
    email: "admin@princes.sa",
    role: "admin",
    shopId: null,
  },
};

export function getDemoRole(): DemoRole {
  if (typeof window === "undefined") return "customer";
  const stored = window.localStorage.getItem(DEMO_ROLE_KEY) as DemoRole | null;
  if (stored && ["customer", "staff", "admin", "guest"].includes(stored)) {
    return stored;
  }
  return "customer";
}

export function setDemoRole(role: DemoRole): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_ROLE_KEY, role);
  window.dispatchEvent(new CustomEvent("coffeeloyal:role-change", { detail: role }));
}

export function getDemoSession(role?: DemoRole): Session | null {
  const activeRole = role ?? getDemoRole();
  if (activeRole === "guest") return null;

  const user = DEMO_USERS[activeRole];
  if (!user) return null;

  return {
    user,
    expires: "2099-01-01T00:00:00.000Z",
  };
}
