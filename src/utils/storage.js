export const KEYS = {
  cart: "cedar-cart",
  favourites: "cedar-favourites",
  orders: "cedar-orders",
  theme: "cedar-theme",
};

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  } catch {
  }
}

export function formatPrice(value) {
  return "$" + Number(value).toFixed(2);
}
