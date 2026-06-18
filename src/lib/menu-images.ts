import menuD01 from "@/assets/menu-d01.png";
import menuD02 from "@/assets/menu-d02.png";
import menuD03 from "@/assets/menu-d03.png";
import menuD04 from "@/assets/menu-d04.png";
import menuD05 from "@/assets/menu-d05.png";
import menuD06 from "@/assets/menu-d06.png";
import menuD07 from "@/assets/menu-d07.png";
import menuD08 from "@/assets/menu-d08.png";

/** /menu page product images — replace placeholders in src/assets/menu-d0X.png */
export const menuImages: Record<string, string> = {
  d01: menuD01,
  d02: menuD02,
  d03: menuD03,
  d04: menuD04,
  d05: menuD05,
  d06: menuD06,
  d07: menuD07,
  d08: menuD08,
};

export function getMenuImage(id: string): string {
  return menuImages[id] ?? menuD01;
}
