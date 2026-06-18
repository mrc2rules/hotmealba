import homeD01 from "@/assets/home-d01.png";
import homeD02 from "@/assets/home-d02.png";
import homeD03 from "@/assets/home-d03.png";
import homeD04 from "@/assets/home-d04.png";
import homeD05 from "@/assets/home-d05.png";

/** Homepage stamp-card images — replace placeholders in src/assets/home-d0X.png */
export const homeMenuImages: Record<string, string> = {
  d01: homeD01,
  d02: homeD02,
  d03: homeD03,
  d04: homeD04,
  d05: homeD05,
};

export function getHomeMenuImage(id: string): string {
  return homeMenuImages[id] ?? homeD01;
}
