import { branches } from "@/lib/content/branches";

const STORAGE_KEY = "coffeeloyal_demo_state_v2";

export interface DemoHistoryItem {
  id: number;
  amount: number;
  source: string;
  balance: number;
  created_at: string;
}

export interface DemoShop {
  id: number;
  name: string;
  slug: string;
  address: string;
  points_to_redeem: number;
  earned_points: string;
  redeemed_points: string;
  balance: string;
  reward_id: number | null;
  reward_status: string | null;
  reward_token: string | null;
  status?: string;
  city?: string;
}

export interface DemoOrder {
  id: number;
  order_number: string;
  shop_name: string;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  created_at: string;
}

export interface DemoState {
  shops: DemoShop[];
  history: DemoHistoryItem[];
  orders: DemoOrder[];
  staffScans: Array<{
    id: number;
    customer_name: string;
    points: number;
    type: "earn" | "redeem";
    created_at: string;
  }>;
}

function getInitialState(): DemoState {
  const seededShops: DemoShop[] = branches.map((b, index) => {
    const id = index + 1;
    // Shop 1 (Al-Tahlia) starts with 7 of 9 stamps as requested
    if (id === 1) {
      return {
        id,
        name: `قهوة الأمراء - ${b.ar}`,
        slug: b.slug,
        address: b.addressAr,
        points_to_redeem: 9,
        earned_points: "16",
        redeemed_points: "9",
        balance: "7",
        reward_id: null,
        reward_status: null,
        reward_token: null,
        status: "active",
        city: b.city,
      };
    }
    if (id === 2) {
      return {
        id,
        name: `قهوة الأمراء - ${b.ar}`,
        slug: b.slug,
        address: b.addressAr,
        points_to_redeem: 9,
        earned_points: "4",
        redeemed_points: "0",
        balance: "4",
        reward_id: null,
        reward_status: null,
        reward_token: null,
        status: "active",
        city: b.city,
      };
    }
    if (id === 15) {
      // Makkah branch
      return {
        id,
        name: `قهوة الأمراء - ${b.ar}`,
        slug: b.slug,
        address: b.addressAr,
        points_to_redeem: 9,
        earned_points: "2",
        redeemed_points: "0",
        balance: "2",
        reward_id: null,
        reward_status: null,
        reward_token: null,
        status: "active",
        city: b.city,
      };
    }
    return {
      id,
      name: `قهوة الأمراء - ${b.ar}`,
      slug: b.slug,
      address: b.addressAr,
      points_to_redeem: 9,
      earned_points: "0",
      redeemed_points: "0",
      balance: "0",
      reward_id: null,
      reward_status: null,
      reward_token: null,
      status: "active",
      city: b.city,
    };
  });

  const now = new Date();
  const d = (daysAgo: number) =>
    new Date(now.getTime() - daysAgo * 86400000).toISOString();

  return {
    shops: seededShops,
    history: [
      {
        id: 107,
        amount: 1,
        source: "طلب قهوة سعودية بالهيل - فرع التحلية، جدة",
        balance: 7,
        created_at: d(1),
      },
      {
        id: 106,
        amount: 1,
        source: "طلب آيس سبانش لاتيه - فرع التحلية، جدة",
        balance: 6,
        created_at: d(3),
      },
      {
        id: 105,
        amount: 1,
        source: "طلب كرك وكرواسون - فرع الكورنيش، جدة",
        balance: 5,
        created_at: d(5),
      },
      {
        id: 104,
        amount: 1,
        source: "طلب لوتس فرابيه - فرع التحلية، جدة",
        balance: 4,
        created_at: d(8),
      },
      {
        id: 103,
        amount: -9,
        source: "استبدال مشروب مجاني (سقنتشر الأمراء) - فرع العريشي، مكة المكرمة",
        balance: 0,
        created_at: d(12),
      },
      {
        id: 102,
        amount: 1,
        source: "طلب قهوة مختصة - فرع العريشي، مكة المكرمة",
        balance: 9,
        created_at: d(13),
      },
      {
        id: 101,
        amount: 1,
        source: "طلب قهوة سعودية مغلية - فرع التحلية، جدة",
        balance: 8,
        created_at: d(16),
      },
    ],
    orders: [
      {
        id: 501,
        order_number: "PO-8821",
        shop_name: "قهوة الأمراء - التحلية مول",
        status: "completed",
        items: [
          { name: "قهوة سعودية", quantity: 1, price: 6 },
          { name: "كرواسون لوز", quantity: 1, price: 14 },
        ],
        total: 20,
        created_at: d(1),
      },
      {
        id: 502,
        order_number: "PO-8794",
        shop_name: "قهوة الأمراء - الكورنيش",
        status: "completed",
        items: [{ name: "آيس سبانش لاتيه", quantity: 2, price: 32 }],
        total: 32,
        created_at: d(5),
      },
    ],
    staffScans: [
      {
        id: 301,
        customer_name: "سارة الأحمدي",
        points: 1,
        type: "earn",
        created_at: d(1),
      },
      {
        id: 302,
        customer_name: "خالد المحمدي",
        points: 1,
        type: "earn",
        created_at: d(1),
      },
      {
        id: 303,
        customer_name: "فاطمة الشريف",
        points: -9,
        type: "redeem",
        created_at: d(2),
      },
    ],
  };
}

export function loadDemoState(): DemoState {
  if (typeof window === "undefined") return getInitialState();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const init = getInitialState();
    saveDemoState(init);
    return init;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const init = getInitialState();
    saveDemoState(init);
    return init;
  }
}

export function saveDemoState(state: DemoState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("coffeeloyal:state-change"));
}

export function resetDemoState(): void {
  if (typeof window === "undefined") return;
  const initial = getInitialState();
  saveDemoState(initial);
}

// Intercepts fetch for all /api calls in the static preview
export function initMockApi(): void {
  if (typeof window === "undefined") return;
  if ((window as unknown as { __mockApiInitialized?: boolean }).__mockApiInitialized) return;
  (window as unknown as { __mockApiInitialized?: boolean }).__mockApiInitialized = true;

  const originalFetch = window.fetch;

  window.fetch = async function (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    const urlStr = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    // Only intercept /api/ routes
    if (!urlStr.includes("/api/")) {
      return originalFetch.call(this, input, init);
    }

    const parsed = new URL(urlStr, window.location.origin);
    const pathname = parsed.pathname.replace(/^\/coffeeloyal/, ""); // Support basePath
    const method = (init?.method || "GET").toUpperCase();
    const bodyText = typeof init?.body === "string" ? init.body : "{}";
    let bodyData: Record<string, unknown> = {};
    try {
      bodyData = JSON.parse(bodyText);
    } catch {
      bodyData = {};
    }

    const state = loadDemoState();

    const json = (data: unknown, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
      });

    // 1. Customer shops
    if (pathname === "/api/customer/shops") {
      return json({ shops: state.shops });
    }

    // 2. Customer points history
    if (pathname === "/api/customer/points-history") {
      return json({ history: state.history });
    }

    // 3. Customer claim QR
    if (pathname === "/api/customer/claim" && method === "POST") {
      const shop = state.shops.find((s) => s.id === 1) || state.shops[0];
      const prevBal = parseInt(shop.balance, 10) || 0;
      const newBal = prevBal + 1;
      shop.balance = String(newBal);
      shop.earned_points = String((parseInt(shop.earned_points, 10) || 0) + 1);

      let rewardCreated = false;
      if (newBal >= 9) {
        rewardCreated = true;
        shop.reward_id = 999;
        shop.reward_status = "available";
        shop.reward_token = "RWD-PRINCES-8921";
      }

      state.history.unshift({
        id: Date.now(),
        amount: 1,
        source: `مسح رمز QR - ${shop.name}`,
        balance: newBal,
        created_at: new Date().toISOString(),
      });

      saveDemoState(state);
      return json({
        success: true,
        claimed: 1,
        newBalance: newBal,
        rewardCreated,
      });
    }

    // 4. Rewards redeem
    if (pathname === "/api/rewards/redeem" && method === "POST") {
      const shop = state.shops.find((s) => s.id === 1) || state.shops[0];
      shop.reward_id = 999;
      shop.reward_status = "available";
      shop.reward_token = "RWD-PRINCES-8921";
      saveDemoState(state);
      return json({
        success: true,
        token: "RWD-PRINCES-8921",
        reward: { id: 999, token: "RWD-PRINCES-8921", status: "available" },
      });
    }

    // 5. Rewards confirm (Staff scan check)
    if (pathname === "/api/rewards/confirm" && method === "POST") {
      return json({
        ok: true,
        reward: {
          id: 999,
          customerName: "سارة الأحمدي",
          shopName: "قهوة الأمراء - فرع التحلية مول",
          pointsCost: 9,
          item: "مشروب مجاني من اختيار العميل",
        },
      });
    }

    // 6. Rewards confirm execute
    if (pathname === "/api/rewards/confirm/execute" && method === "POST") {
      const shop = state.shops.find((s) => s.id === 1) || state.shops[0];
      const curBal = parseInt(shop.balance, 10) || 0;
      const newBal = Math.max(0, curBal - 9);
      shop.balance = String(newBal);
      shop.redeemed_points = String((parseInt(shop.redeemed_points, 10) || 0) + 9);
      shop.reward_status = "redeemed";

      state.history.unshift({
        id: Date.now(),
        amount: -9,
        source: `استبدال مكافأة مشروب مجاني - ${shop.name}`,
        balance: newBal,
        created_at: new Date().toISOString(),
      });

      state.staffScans.unshift({
        id: Date.now(),
        customer_name: "سارة الأحمدي",
        points: -9,
        type: "redeem",
        created_at: new Date().toISOString(),
      });

      saveDemoState(state);
      return json({ success: true });
    }

    // 7. Staff generate QR
    if (pathname === "/api/staff/generate-qr" && method === "POST") {
      return json({
        success: true,
        qr: {
          token: "PRINCES-DEMO-QR-" + Math.floor(Math.random() * 89999 + 10000),
          expiresAt: new Date(Date.now() + 300000).toISOString(),
        },
      });
    }

    // 8. Staff analytics
    if (pathname === "/api/staff/analytics") {
      return json({
        analytics: {
          total_customers: "1428",
          customers_this_week: "86",
          total_points_earned: "6850",
          points_this_week: "412",
          total_points_redeemed: "720",
          redeemed_this_week: "48",
          total_redemptions: "80",
          redemptions_this_week: "5",
        },
      });
    }

    // 9. Staff history
    if (pathname === "/api/staff/history") {
      return json({
        history: state.staffScans.map((s) => ({
          id: s.id,
          customer_name: s.customer_name,
          points: s.points,
          source: s.type === "redeem" ? "استبدال مكافأة" : "كسب نقاط",
          created_at: s.created_at,
        })),
      });
    }

    // 10. Staff orders & customer orders
    if (pathname === "/api/orders" || pathname === "/api/staff/orders") {
      if (method === "POST") {
        const newOrder: DemoOrder = {
          id: Date.now(),
          order_number: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
          shop_name: (bodyData.shopName as string) || "قهوة الأمراء - التحلية مول",
          status: "pending",
          items: (bodyData.items as DemoOrder["items"]) || [
            { name: "قهوة سعودية", quantity: 1, price: 6 },
          ],
          total: (bodyData.total as number) || 6,
          created_at: new Date().toISOString(),
        };
        state.orders.unshift(newOrder);
        saveDemoState(state);
        return json({ success: true, order: newOrder });
      }
      return json({ orders: state.orders });
    }

    // 11. Staff shop info & settings
    if (pathname === "/api/staff/shop") {
      const currentShop = state.shops.find((s) => s.id === 1) || state.shops[0];
      return json({
        shop: {
          id: currentShop.id,
          name: currentShop.name,
          address: currentShop.address,
          points_to_redeem: currentShop.points_to_redeem,
          status: currentShop.status || "active",
        },
      });
    }

    // 12. Admin endpoints
    if (pathname === "/api/admin/shops") {
      return json({ shops: state.shops });
    }

    if (pathname === "/api/admin/pending-shops") {
      return json({ shops: [] });
    }

    if (pathname === "/api/admin/approve-shop") {
      return json({ success: true });
    }

    if (pathname === "/api/admin/users") {
      return json({
        users: [
          {
            id: "u-1",
            name: "سارة الأحمدي",
            email: "sara@princes.sa",
            role: "customer",
            created_at: "2026-01-15T10:00:00Z",
          },
          {
            id: "u-2",
            name: "أحمد الغامدي",
            email: "ahmed@princes.sa",
            role: "staff",
            shop_name: "فرع التحلية مول",
            created_at: "2026-01-10T12:00:00Z",
          },
          {
            id: "u-3",
            name: "سلطان العتيبي",
            email: "admin@princes.sa",
            role: "admin",
            created_at: "2026-01-01T08:00:00Z",
          },
        ],
      });
    }

    // 13. User profile
    if (pathname === "/api/user/profile") {
      return json({
        user: {
          name: "سارة الأحمدي",
          email: "sara@princes.sa",
        },
      });
    }

    // Default fallback for any other intercepted API
    return json({ ok: true });
  };
}
