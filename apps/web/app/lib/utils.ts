import { type ClassValue, clsx } from "clsx";
import { twMerge } from "@repo/ui";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
