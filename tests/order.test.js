import test from "node:test";
import assert from "node:assert/strict";
import { whatsappLink, safeExternalUrl } from "../src/order.js";
import { products, combo } from "../src/config.js";

test("demo does not create fake WhatsApp destinations", () => {
  assert.equal(whatsappLink(null, products[0]), null);
  assert.equal(whatsappLink("invalid", products[0]), null);
});
test("order includes quantity, accurate total, encoded note and confirmation", () => {
  const url = new URL(
    whatsappLink("5511999999999", products[0], 2, "Sem picles & molho à parte"),
  );
  assert.equal(url.hostname, "wa.me");
  const message = url.searchParams.get("text");
  assert.match(message, /2x O Original/);
  assert.match(message, /64,00/);
  assert.match(message, /Sem picles & molho à parte/);
  assert.match(message, /confirmar a disponibilidade/);
});
test("quantities stay inside bounds", () => {
  assert.match(
    new URL(whatsappLink("5511999999999", combo, 0)).searchParams.get("text"),
    /1x/,
  );
  assert.match(
    new URL(whatsappLink("5511999999999", combo, 100)).searchParams.get("text"),
    /20x/,
  );
});
test("delivery rejects non-HTTPS and malformed destinations", () => {
  for (const value of [
    null,
    "",
    "javascript:alert(1)",
    "http://example.com",
    "/relative",
  ])
    assert.equal(safeExternalUrl(value), null);
  assert.equal(
    safeExternalUrl("https://example.com/order"),
    "https://example.com/order",
  );
});
test("catalog ids are unique and all products are complete", () => {
  assert.equal(
    new Set([...products, combo].map((p) => p.id)).size,
    products.length + 1,
  );
  for (const item of [...products, combo]) {
    assert.ok(
      item.price > 0 && item.name && item.description && item.allergens,
    );
    assert.ok(item.ingredients.length > 0);
  }
});
