import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TAX_RATE = 0.13;

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}

export function calcTax(subtotal: number) {
  return subtotal * TAX_RATE;
}
