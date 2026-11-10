import { createContext, useEffect, useState } from "react";
import { KEYS, load, save } from "../utils/storage";

export const CartContext = createContext();

export const DELIVERY_FEE = 2;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => load(KEYS.cart, []));
  const [favourites, setFavourites] = useState(() => load(KEYS.favourites, []));
  const [orders, setOrders] = useState(() => load(KEYS.orders, []));

  useEffect(() => save(KEYS.cart, cart), [cart]);
  useEffect(() => save(KEYS.favourites, favourites), [favourites]);
  useEffect(() => save(KEYS.orders, orders), [orders]);

  const addToCart = (item) => {
    const exists = cart.find((c) => c.id === item.id);
    if (exists) {
      setCart(cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      setCart([...cart, { id: item.id, name: item.name, price: item.price, image: item.image, prepTime: item.prepTime, qty: 1 }]);
    }
  };

  const changeQty = (id, amount) => {
    const updated = cart
      .map((c) => (c.id === id ? { ...c, qty: c.qty + amount } : c))
      .filter((c) => c.qty > 0);
    setCart(updated);
  };

  const removeFromCart = (id) => setCart(cart.filter((c) => c.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  const toggleFavourite = (id) => {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((f) => f !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  };

  const placeOrder = (customer) => {
    const longestPrep = Math.max(...cart.map((c) => c.prepTime || 10));
    const order = {
      id: "CS-" + Date.now().toString().slice(-6),
      items: cart,
      customer: customer,
      subtotal: subtotal,
      deliveryFee: customer.method === "delivery" ? DELIVERY_FEE : 0,
      total: subtotal + (customer.method === "delivery" ? DELIVERY_FEE : 0),
      placedAt: Date.now(),
      estimate: longestPrep + (customer.method === "delivery" ? 20 : 5),
    };
    setOrders([order, ...orders]);
    clearCart();
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        cart, cartCount, subtotal, addToCart, changeQty, removeFromCart, clearCart,
        favourites, toggleFavourite,
        orders, placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
