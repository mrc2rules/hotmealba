export type Dumpling = {
  id: string;
  name: string;
  cn: string;
  desc: string;
  filling: "pork" | "chicken" | "beef" | "veg" | "seafood";
  packSize: 12 | 20 | 30;
  price: number;
  originalPrice?: number;
  badge?: "Bestseller" | "Halal Certified" | "New" | "Spicy";
  popularity: number;
};

export const dumplings: Dumpling[] = [
  { id: "d01", name: "Chicken Dumpling", cn: "鸡肉饺子", desc: "Delicious handmade chicken dumpling", filling: "chicken", packSize: 20, price: 22, originalPrice: 26, badge: "Bestseller", popularity: 98 },
  { id: "d02", name: "Satay", cn: "沙爹", desc: "Hand-minced kampung chicken with garden chives.", filling: "chicken", packSize: 20, price: 18, badge: "Halal Certified", popularity: 92 },
  { id: "d03", name: "Soup & Noodles", cn: "羊肉面", desc: "Xinjiang-style lamb, toasted cumin, a whisper of chili.", filling: "beef", packSize: 12, price: 24, badge: "Spicy", popularity: 88 },
  { id: "d04", name: "Handmade Noodles", cn: "鲜虾笋丁面", desc: "Whole prawn, crisp bamboo shoot, sesame oil.", filling: "seafood", packSize: 12, price: 28, originalPrice: 32, badge: "New", popularity: 81 },
  { id: "d05", name: "Vegetable Stew", cn: "蔬菜炖菜", desc: "Shiitake, oyster, enoki — vegetarian, full of umami.", filling: "veg", packSize: 20, price: 16, badge: "Halal Certified", popularity: 76 },
  { id: "d06", name: "Rice Meal Combo", cn: "米饭套餐", desc: "Numbing peppercorn, chili oil, a quiet kick.", filling: "beef", packSize: 20, price: 22, badge: "Spicy", popularity: 84 },
  { id: "d07", name: "Orange Juice", cn: "橙汁", desc: "Fresh and sweet orange juice.", filling: "veg", packSize: 30, price: 6, popularity: 70 },
  { id: "d08", name: "HMB Special Gift Box", cn: "HMB特制礼盒", desc: "Special curated gift box pack.", filling: "chicken", packSize: 20, price: 50, badge: "New", popularity: 79 },
];

export const filterCategories = [
  { key: "all", label: "All Flavours" },
  { key: "chicken", label: "Chicken" },
  { key: "beef", label: "Beef & Lamb" },
  { key: "seafood", label: "Seafood" },
  { key: "veg", label: "Vegetarian" },
] as const;
