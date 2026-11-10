import { useState } from "react";
import { Link } from "react-router-dom";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import CelebrationIcon from "@mui/icons-material/Celebration";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectionTitle from "../components/SectionTitle";
import "../styles/Services.css";

const services = [
  { icon: <DeliveryDiningIcon />, title: "Home Delivery", text: "Hot food delivered across Beirut in about 30 minutes.", features: ["Live order tracking", "Free delivery on first order", "Cash or card on delivery"] },
  { icon: <TakeoutDiningIcon />, title: "Take-Away", text: "Order online and pick up your food without waiting in line.", features: ["Ready in 15–20 minutes", "Eco-friendly packaging", "Express pick-up counter"] },
  { icon: <TableRestaurantIcon />, title: "Dine-In", text: "Enjoy your mezze in our cosy restaurant with a garden terrace.", features: ["60 indoor seats", "Outdoor terrace", "Family-friendly"] },
  { icon: <BakeryDiningIcon />, title: "Saj Breakfast Corner", text: "Manakish baked in front of you on the traditional saj every morning.", features: ["Open from 8:00 AM", "Fresh dough daily", "Lebanese coffee included"] },
  { icon: <CelebrationIcon />, title: "Catering", text: "Mezze and grill platters for birthdays, offices and weddings.", features: ["10 to 300 guests", "Custom menus", "Setup and serving staff"] },
  { icon: <GroupsIcon />, title: "Private Events", text: "Book our upper hall for private dinners and celebrations.", features: ["Up to 40 guests", "Set menus from $20 / person", "Music and decoration on request"] },
];

const hours = [
  { day: "Monday – Thursday", time: "8:00 AM – 11:00 PM" },
  { day: "Friday", time: "8:00 AM – 12:00 AM" },
  { day: "Saturday – Sunday", time: "9:00 AM – 12:00 AM" },
];

const faqs = [
  { q: "Where do you deliver?", a: "We deliver everywhere in Beirut. A delivery fee of $2 is added at checkout; your first order is free." },
  { q: "Can I change my order after placing it?", a: "Call us within 5 minutes of ordering and we will update it before the kitchen starts cooking." },
  { q: "Do you have vegetarian options?", a: "Yes! Most of our mezze, salads, manakish and desserts are vegetarian. Use the Vegetarian filter on the menu." },
  { q: "How do I book catering?", a: "Send us a message from the Contact page with the date and number of guests and we will reply within 24 hours." },
];

function Services() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="services-page">
      <header className="page-header">
        <h1>Our Services</h1>
        <p>Whether you eat at home, at work or with us, there is a Cedar &amp; Saj service for you.</p>
      </header>

      <section className="section container">
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircleIcon fontSize="small" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section services-extra">
        <div className="container extra-grid">
          <div className="hours-card">
            <h3>Opening Hours</h3>
            <table>
              <tbody>
                {hours.map((row) => (
                  <tr key={row.day}>
                    <td>{row.day}</td>
                    <td>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/contact" className="btn btn-primary">Book Catering or an Event</Link>
          </div>

          <div>
            <SectionTitle eyebrow="FAQ" title="Questions? We have answers" />
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div className={openFaq === index ? "faq open" : "faq"} key={faq.q}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    {faq.q}
                    <ExpandMoreIcon className="faq-arrow" />
                  </button>
                  {openFaq === index && <p className="faq-answer">{faq.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
