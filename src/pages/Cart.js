import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CartContext, DELIVERY_FEE } from "../context/CartContext";
import { formatPrice } from "../utils/storage";
import "../styles/Contact.css";
import "../styles/Cart.css";

const emptyCustomer = { name: "", phone: "", method: "delivery", address: "", payment: "cash", notes: "" };

function Cart() {
  const { cart, subtotal, changeQty, removeFromCart, clearCart, placeOrder } = useContext(CartContext);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  const deliveryFee = customer.method === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (customer.name.trim().length < 3) newErrors.name = "Please enter your name.";
    if (!/^[0-9+\s]{8,}$/.test(customer.phone)) newErrors.phone = "Please enter a valid phone number.";
    if (customer.method === "delivery" && customer.address.trim().length < 5) {
      newErrors.address = "Please enter your delivery address.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const order = placeOrder(customer);
      setPlacedOrder(order);
      setCustomer(emptyCustomer);
    }
  };

  if (placedOrder) {
    return (
      <div className="container section">
        <div className="order-success">
          <CheckCircleIcon />
          <h1>Shukran, your order is confirmed!</h1>
          <p>
            Order number <strong>{placedOrder.id}</strong> · Total {formatPrice(placedOrder.total)}
          </p>
          <p>
            Estimated {placedOrder.customer.method === "delivery" ? "delivery" : "pick-up"} time:{" "}
            <strong>{placedOrder.estimate} minutes</strong>
          </p>
          <div className="success-buttons">
            <Link to="/track" className="btn btn-primary">
              Track My Order <ArrowForwardIcon fontSize="small" />
            </Link>
            <Link to="/menu" className="btn btn-outline">Back to Menu</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <ShoppingBagOutlinedIcon />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any dishes yet.</p>
          <Link to="/menu" className="btn btn-primary">Browse the Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="page-header">
        <h1>Your Cart</h1>
        <p>Review your dishes, then fill in your details to place the order.</p>
      </header>

      <section className="section container cart-grid">
        <div>
          <div className="cart-list">
            <div className="cart-list-header">
              <h2>Order items</h2>
              <button className="link-btn" onClick={clearCart}>Clear cart</button>
            </div>

            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={`${process.env.PUBLIC_URL}/${item.image}`} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <span>{formatPrice(item.price)} each</span>
                </div>
                <div className="qty">
                  <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><RemoveIcon fontSize="small" /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><AddIcon fontSize="small" /></button>
                </div>
                <strong className="cart-item-total">{formatPrice(item.price * item.qty)}</strong>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                  <DeleteOutlineIcon />
                </button>
              </div>
            ))}
          </div>

          <form className="checkout" onSubmit={handleSubmit} noValidate>
            <h2>Your details</h2>

            <div className="method-toggle">
              <label className={customer.method === "delivery" ? "selected" : ""}>
                <input type="radio" name="method" value="delivery" checked={customer.method === "delivery"} onChange={handleChange} />
                Delivery (+{formatPrice(DELIVERY_FEE)})
              </label>
              <label className={customer.method === "pickup" ? "selected" : ""}>
                <input type="radio" name="method" value="pickup" checked={customer.method === "pickup"} onChange={handleChange} />
                Pick-up (free)
              </label>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Full Name *</label>
                <input id="name" name="name" value={customer.name} onChange={handleChange} placeholder="Your name" />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="phone">Phone *</label>
                <input id="phone" name="phone" type="tel" value={customer.phone} onChange={handleChange} placeholder="+961 70 000 000" />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
            </div>

            {customer.method === "delivery" && (
              <div className="field">
                <label htmlFor="address">Delivery Address *</label>
                <input id="address" name="address" value={customer.address} onChange={handleChange} placeholder="Street, building, floor" />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
            )}

            <div className="form-row">
              <div className="field">
                <label htmlFor="payment">Payment</label>
                <select id="payment" name="payment" value={customer.payment} onChange={handleChange}>
                  <option value="cash">Cash on {customer.method === "delivery" ? "delivery" : "pick-up"}</option>
                  <option value="card">Card on {customer.method === "delivery" ? "delivery" : "pick-up"}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="notes">Notes</label>
                <input id="notes" name="notes" value={customer.notes} onChange={handleChange} placeholder="e.g. extra toum, no onions" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary place-btn">
              Place Order · {formatPrice(total)}
            </button>
          </form>
        </div>

        <aside className="summary">
          <h2>Summary</h2>
          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.qty} × {item.name}</span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-row"><span>Delivery</span><span>{deliveryFee ? formatPrice(deliveryFee) : "Free"}</span></div>
          <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <Link to="/menu" className="btn btn-outline">Add more dishes</Link>
        </aside>
      </section>
    </div>
  );
}

export default Cart;
