import { restaurant } from "./config.js";
export const formatPrice = (value) =>
  new Intl.NumberFormat(restaurant.locale, {
    style: "currency",
    currency: restaurant.currency,
  }).format(value);
export function whatsappLink(phone, product, quantity = 1, note = "") {
  if (!phone || !/^\d{10,15}$/.test(phone)) return null;
  const count = Math.min(20, Math.max(1, Math.floor(Number(quantity) || 1)));
  const message = product
    ? `Olá, ${restaurant.name}! Quero pedir ${count}x ${product.name} (${formatPrice(product.price * count)}).${note.trim() ? `\nObservação: ${note.trim().slice(0, 300)}` : ""}\nPodem confirmar a disponibilidade, a entrega e o valor total?`
    : `Olá, ${restaurant.name}! Quero fazer um pedido. Podem me ajudar?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
export function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
