import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import MenuCard from "../components/MenuCard";
import SectionTitle from "../components/SectionTitle";
import "../styles/Home.css";

const steps = [
  { icon: <RestaurantMenuIcon />, title: "Choose your dishes", text: "Browse mezze, grills, manakish and desserts, and filter by what you like." },
  { icon: <ShoppingBagOutlinedIcon />, title: "Place your order", text: "Add dishes to your cart and choose delivery or pick-up at checkout." },
  { icon: <DeliveryDiningIcon />, title: "Track it live", text: "Follow your order from the kitchen to your door on the Track Order page." },
];

const reviews = [
  { id: 1, name: "Rania K.", text: "The shish taouk tastes exactly like my grandmother's. The toum is perfect!", rating: 5 },
  { id: 2, name: "Omar H.", text: "Ordering was so easy and the food arrived hot. Za'atar manakish every morning now.", rating: 5 },
  { id: 3, name: "Lea M.", text: "Beautiful website and even better knefeh. Tracking my order was a nice touch.", rating: 4 },
];

function Home() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/menu.json`)
      .then((response) => response.json())
      .then((data) => setDishes(data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const popular = dishes.filter((dish) => dish.popular).slice(0, 4);

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="hero-tag">Authentic Lebanese kitchen · Beirut</span>
            <h1>
              Taste of Lebanon, <span>delivered warm</span> to your door.
            </h1>
            <p>
              Fresh mezze, charcoal grills and manakish straight from the saj. Order online in a
              few clicks and follow your food from our kitchen to your table.
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-primary">
                Order Now <ArrowForwardIcon fontSize="small" />
              </Link>
              <Link to="/services" className="btn btn-outline">
                Our Services
              </Link>
            </div>
            <div className="hero-stats">
              <div><strong>18+</strong><span>Dishes</span></div>
              <div><strong>4.9★</strong><span>Rating</span></div>
              <div><strong>30 min</strong><span>Delivery</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle">
              <img src={`${process.env.PUBLIC_URL}/images/mixed-grill.svg`} alt="Mixed grill platter" />
            </div>
            <div className="hero-mini mini-1">
              <img src={`${process.env.PUBLIC_URL}/images/hummus.svg`} alt="Hummus" />
            </div>
            <div className="hero-mini mini-2">
              <img src={`${process.env.PUBLIC_URL}/images/manakish.svg`} alt="Za'atar manakish" />
            </div>
            <div className="hero-chip chip-1">🔥 Fresh from the grill</div>
            <div className="hero-chip chip-2">⭐ 2,000+ happy guests</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="How it works" title="From our kitchen to you in 3 steps" />
          <div className="steps">
            {steps.map((step, index) => (
              <div className="step" key={step.title}>
                <span className="step-number">{index + 1}</span>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section popular">
        <div className="container">
          <SectionTitle
            eyebrow="Guest favourites"
            title="Our most popular dishes"
            text="The plates our guests order again and again."
          />
          <div className="menu-grid">
            {popular.map((dish) => (
              <MenuCard key={dish.id} item={dish} />
            ))}
          </div>
          <div className="center">
            <Link to="/menu" className="btn btn-primary">
              See Full Menu <ArrowForwardIcon fontSize="small" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Reviews" title="What our guests say" />
          <div className="reviews">
            {reviews.map((review) => (
              <div className="review" key={review.id}>
                <FormatQuoteIcon className="quote" />
                <p>{review.text}</p>
                <div className="review-footer">
                  <strong>{review.name}</strong>
                  <span>
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} fontSize="inherit" />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="cta">
          <div>
            <h2>Hungry already?</h2>
            <p>Free delivery on your first order in Beirut. Sahtein!</p>
          </div>
          <Link to="/menu" className="btn btn-primary">
            Start Your Order <ArrowForwardIcon fontSize="small" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
