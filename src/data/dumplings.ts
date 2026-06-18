export type Dumpling = {
  id: string;
  name: string;
  cn: string;
  desc: string;
  filling: "lamb" | "chicken" | "beef" | "veg" | "seafood";
  packSize: number;
  price: number;
  originalPrice?: number;
  badge?: "Bestseller" | "Hot" | "New" | "Spicy";
  popularity: number;
};

export const dumplings: Dumpling[] = [
  { id: "d01", name: "Chicken Mushroom Dumplings", cn: "鸡肉饺子", desc: "Savory chicken and mushroom-filled dumplings, delicately steamed to perfection and served with a tangy sauce.", filling: "chicken", packSize: 15, price: 10, originalPrice: 15, badge: "Bestseller", popularity: 98 },
  { id: "d02", name: "Xinjiang Bbq Chicken", cn: "新疆鸡肉串", desc: "Grilled chicken skewers with spice, smoky and juicy taste", filling: "chicken", packSize: 2, price: 10, badge: "Hot", popularity: 92 },
  { id: "d03", name: "Mee Tarik with Beef Soup", cn: "好米巴牛肉面", desc: "Hand-pulled noodles served in a rich beef broth, garnished with fresh herbs and spices.", filling: "beef", packSize: 1, price: 9, badge: "Spicy", popularity: 88 },
  { id: "d04", name: "Beijing Noodles", cn: "炸酱面", desc: "Chicken in savory soybean paste, rich noodles with bite", filling: "chicken", packSize: 1, price: 16, originalPrice: 25, badge: "New", popularity: 81 },
  { id: "d05", name: "Xinjiang Fried Lamb With Black Fungus Cabbage", cn: "新疆过油肉-羊肉", desc: "Crispy lamb stir-fried with cabbage and fungus, savory bold flavor", filling: "lamb", packSize: 1, price: 24.5  , badge: "Hot", popularity: 76 },
  { id: "d06", name: "Sliced Potato With Chicken", cn: "鸡肉土豆片", desc: "Chicken and potato slices stir-fried, tender and comforting kick.", filling: "chicken", packSize: 1, price: 20, badge: "Spicy", popularity: 84 },
  { id: "d07", name: "Orange Juice", cn: "橙汁", desc: "Fresh and sweet orange juice.", filling: "veg", packSize: 1, price: 6, popularity: 70 },
  { id: "d08", name: "HMB Special Gift Box", cn: "HMB特制礼盒", desc: "Special curated gift box pack.", filling: "chicken", packSize: 1, price: 50, badge: "New", popularity: 79 },
];

export const filterCategories = [
  { key: "all", label: "All Flavours" },
  { key: "chicken", label: "Chicken" },
  { key: "beef", label: "Beef & Lamb" },
  { key: "seafood", label: "Seafood" },
  { key: "veg", label: "Vegetarian" },
] as const;
