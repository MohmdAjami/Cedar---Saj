import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/storage";
import "../styles/TrackOrder.css";

const DEMO_MINUTE_MS = 1000;

function getProgress(order, now) {
  const minutesPassed = (now - order.placedAt) / DEMO_MINUTE_MS;
  const percent = Math.min(100, Math.round((minutesPassed / order.estimate) * 100));
  let step = 0;
  if (percent >= 10) step = 1;
  if (percent >= 60) step = 2;
  if (percent >= 100) step = 3;
  const minutesLeft = Math.max(0, Math.ceil(order.estimate - minutesPassed));
  return { percent, step, minutesLeft };
}

function TrackOrder() {
  const { orders } = useContext(CartContext);
  const [selectedId, setSelectedId] = useState(orders.length > 0 ? orders[0].id : "");
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setSelectedId(found.id);
      setMessage("");
    } else {
      setMessage("No order found with this number. Check the number on your confirmation.");
    }
  };

  const order = orders.find((o) => o.id === selectedId);

  if (orders.length === 0) {
    return (
      <div className="container section">
        <div className="empty-state">
          <Inventory2OutlinedIcon />
          <h2>No orders yet</h2>
          <p>When you place an order, you can follow it here step by step.</p>
          <Link to="/menu" className="btn btn-primary">Order Something Delicious</Link>
        </div>
      </div>
    );
  }

  const isDelivery = order && order.customer.method === "delivery";
  const steps = [
    { icon: <ReceiptLongIcon />, label: "Order received" },
    { icon: <SoupKitchenIcon />, label: "Preparing" },
    isDelivery
      ? { icon: <DeliveryDiningIcon />, label: "On the way" }
      : { icon: <StorefrontIcon />, label: "Ready for pick-up" },
    isDelivery
      ? { icon: <HomeIcon />, label: "Delivered" }
      : { icon: <Inventory2OutlinedIcon />, label: "Picked up" },
  ];
  const progress = order ? getProgress(order, now) : null;

  return (
    <div className="track-page">
      <header className="page-header">
        <h1>Track Your Order</h1>
        <p>Follow your food live, from our kitchen to your table.</p>
      </header>

      <section className="section container track-grid">
        <div>
          <form className="track-search" onSubmit={handleSearch}>
            <SearchIcon />
            <input
              placeholder="Enter order number, e.g. CS-123456"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Track</button>
          </form>
          {message && <p className="error">{message}</p>}

          {order && (
            <div className="track-card">
              <div className="track-card-header">
                <div>
                  <span className="muted">Order</span>
                  <h2>{order.id}</h2>
                </div>
                <div className={progress.step === 3 ? "status done" : "status"}>
                  {steps[progress.step].label}
                </div>
              </div>

              <div className="progress-bar">
                <div style={{ width: progress.percent + "%" }}></div>
              </div>
              <p className="eta">
                {progress.step === 3
                  ? "Sahtein! Enjoy your meal."
                  : `About ${progress.minutesLeft} min left`}
              </p>

              <ol className="steps-track">
                {steps.map((step, index) => (
                  <li
                    key={step.label}
                    className={index < progress.step ? "done" : index === progress.step ? "current" : ""}
                  >
                    <span className="step-dot">{step.icon}</span>
                    <span>{step.label}</span>
                  </li>
                ))}
              </ol>

              <div className="track-details">
                <div>
                  <h3>Items</h3>
                  {order.items.map((item) => (
                    <div className="summary-row" key={item.id}>
                      <span>{item.qty} × {item.name}</span>
                      <span>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
                <div>
                  <h3>{isDelivery ? "Delivery to" : "Pick-up by"}</h3>
                  <p>
                    {order.customer.name}
                    <br />
                    {order.customer.phone}
                    {isDelivery && <><br />{order.customer.address}</>}
                  </p>
                  <p className="muted">Payment: {order.customer.payment === "cash" ? "Cash" : "Card"}</p>
                </div>
              </div>
              <p className="demo-note">Demo mode: 1 second = 1 minute, so you can see every step quickly.</p>
            </div>
          )}
        </div>

        <aside className="order-history">
          <h2>Your orders</h2>
          {orders.map((o) => {
            const p = getProgress(o, now);
            return (
              <button
                key={o.id}
                className={o.id === selectedId ? "history-item active" : "history-item"}
                onClick={() => setSelectedId(o.id)}
              >
                <div>
                  <strong>{o.id}</strong>
                  <span>{new Date(o.placedAt).toLocaleString()}</span>
                </div>
                <div className="history-right">
                  <strong>{formatPrice(o.total)}</strong>
                  <span className={p.step === 3 ? "pill done" : "pill"}>{p.step === 3 ? "Completed" : "In progress"}</span>
                </div>
              </button>
            );
          })}
        </aside>
      </section>
    </div>
  );
}

export default TrackOrder;
