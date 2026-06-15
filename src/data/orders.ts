export type OrderStatus = "Placed" | "Packed" | "Out for Delivery" | "Delivered" | "Cancelled";

export type Order = {
  id: string;          // e.g. HMB-20260615-0042
  deliveryId: string;  // e.g. DLV-88421
  customer: string;
  phone: string;       // For phone number tracking
  items: string;       // human-readable summary
  itemCount: number;
  total: number;       // RM
  orderedAt: string;   // ISO
  deliveredAt: string; // ISO target
  status: OrderStatus;
  campus: "KTF" | "Alumni" | "KTC" | "KTHO" | "KTR";
  rating?: number;
  statusHistory?: { status: OrderStatus; timestamp: string; note?: string }[];
};

const customers = [
  "Lim Wei Jian", "Nur Aisyah", "Tan Mei Lin", "Ahmad Rizq", "Chong Kah Wai",
  "Siti Khadijah", "Wong Pui San", "Hafiz Ismail", "Yap Zhi Han", "Farah Nadia",
  "Goh Jing Yi", "Iskandar Z.", "Chen Xue", "Aida Rahman", "Khoo Cheng Yi",
  "Mohd Faiz", "Lee Hui Min", "Nurul Iman", "Teo Yong Sheng", "Hadi Putra",
];

const phoneNumbers = [
  "+60 13-555 0942", "+60 12-345 6789", "+60 19-876 5432", "+60 14-234 5678", "+60 18-765 4321",
  "+60 11-111 2222", "+60 17-333 4444", "+60 16-555 6666", "+60 13-777 8888", "+60 19-999 0000",
  "+60 12-123 4567", "+60 14-987 6543", "+60 18-456 7890", "+60 11-321 0987", "+60 17-654 3210",
  "+60 16-789 0123", "+60 13-234 5678", "+60 19-876 5432", "+60 12-345 6789", "+60 18-567 8901",
];

const itemSamples = [
  "20× Beef & Scallion", "12× Prawn & Bamboo + Chili Oil",
  "30× Mushroom Trio", "20× Chicken & Chive", "12× Lamb & Cumin",
  "20× Spicy Sichuan Beef", "20× Curry Chicken", "20× Cabbage & Tofu",
  "12× Lamb + 20× Chicken", "20× Chicken & Chive + Sauce Bundle",
];

const campuses: Order["campus"][] = ["KTF", "Alumni", "KTC", "KTHO", "KTR"];
const statuses: OrderStatus[] = ["Placed", "Packed", "Out for Delivery", "Delivered", "Delivered", "Delivered", "Cancelled"];

// seeded RNG so render is stable
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const orders: Order[] = (() => {
  const rand = mulberry32(20260615);
  const out: Order[] = [];
  for (let i = 0; i < 248; i++) {
    const days = Math.floor(rand() * 45);
    const hours = Math.floor(rand() * 24);
    const ordered = new Date(Date.now() - days * 86400000 - hours * 3600000);
    const delivered = new Date(ordered.getTime() + (2 + Math.floor(rand() * 26)) * 3600000);
    const itemCount = 1 + Math.floor(rand() * 3);
    const total = 16 + Math.floor(rand() * 80);
    const status = statuses[Math.floor(rand() * statuses.length)];
    
    // Generate status history based on current status
    const statusHistory: { status: OrderStatus; timestamp: string; note?: string }[] = [];
    const statusNotes: Record<OrderStatus, string> = {
      "Placed": "Order received and confirmed",
      "Packed": "Dumplings pleated and packed",
      "Out for Delivery": "Runner on the way to your location",
      "Delivered": "Order successfully delivered",
      "Cancelled": "Order cancelled by customer"
    };
    
    // Add initial status
    statusHistory.push({
      status: "Placed",
      timestamp: ordered.toISOString(),
      note: statusNotes["Placed"]
    });
    
    // Add intermediate statuses based on current status
    const statusIndex = statuses.indexOf(status);
    if (statusIndex >= 1) {
      const packedTime = new Date(ordered.getTime() + 30 * 60000); // 30 min after order
      statusHistory.push({
        status: "Packed",
        timestamp: packedTime.toISOString(),
        note: statusNotes["Packed"]
      });
    }
    
    if (statusIndex >= 2) {
      const outForDeliveryTime = new Date(ordered.getTime() + 60 * 60000); // 1 hour after order
      statusHistory.push({
        status: "Out for Delivery",
        timestamp: outForDeliveryTime.toISOString(),
        note: statusNotes["Out for Delivery"]
      });
    }
    
    if (statusIndex >= 3 && status !== "Cancelled") {
      statusHistory.push({
        status: "Delivered",
        timestamp: delivered.toISOString(),
        note: statusNotes["Delivered"]
      });
    }
    
    if (status === "Cancelled") {
      const cancelledTime = new Date(ordered.getTime() + 15 * 60000); // 15 min after order
      statusHistory.push({
        status: "Cancelled",
        timestamp: cancelledTime.toISOString(),
        note: statusNotes["Cancelled"]
      });
    }
    
    out.push({
      id: `HMB-${ordered.toISOString().slice(0, 10).replace(/-/g, "")}-${String(1000 + i).slice(1)}`,
      deliveryId: `DLV-${String(80000 + Math.floor(rand() * 19999))}`,
      customer: customers[Math.floor(rand() * customers.length)],
      phone: phoneNumbers[Math.floor(rand() * phoneNumbers.length)],
      items: itemSamples[Math.floor(rand() * itemSamples.length)],
      itemCount,
      total,
      orderedAt: ordered.toISOString(),
      deliveredAt: delivered.toISOString(),
      status,
      campus: campuses[Math.floor(rand() * campuses.length)],
      rating: status === "Delivered" ? 3 + Math.floor(rand() * 3) : undefined,
      statusHistory,
    });
  }
  return out.sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));
})();

export function findOrder(idOrFragment: string): Order | undefined {
  const q = idOrFragment.trim().toUpperCase();
  if (!q) return undefined;
  return orders.find(o => o.id.includes(q) || o.deliveryId.includes(q) || o.phone.toUpperCase().includes(q));
}
