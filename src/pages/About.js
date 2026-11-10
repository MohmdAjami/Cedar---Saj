import { Link } from "react-router-dom";
import EcoIcon from "@mui/icons-material/Spa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SectionTitle from "../components/SectionTitle";
import "../styles/About.css";

const values = [
  { icon: <EcoIcon />, title: "Fresh every day", text: "Vegetables from the Bekaa valley and bread baked every morning." },
  { icon: <FavoriteIcon />, title: "Family recipes", text: "Dishes passed down from our grandmother Teta Salma's kitchen." },
  { icon: <LocalFireDepartmentIcon />, title: "Real charcoal grill", text: "All our skewers are grilled over charcoal for that smoky taste." },
  { icon: <HandshakeIcon />, title: "Lebanese hospitality", text: "Ahla w sahla! Every guest is treated like family." },
];

const timeline = [
  { year: "2012", text: "Teta Salma opens a small saj stand on Hamra Street." },
  { year: "2016", text: "The stand becomes a 20-seat family restaurant." },
  { year: "2021", text: "We add the charcoal grill and the garden terrace." },
  { year: "2026", text: "Cedar & Saj goes online with ordering and live tracking." },
];

const team = [
  { name: "Salma Haddad", role: "Founder & Head of Recipes", initials: "SH" },
  { name: "Karim Haddad", role: "Grill Master", initials: "KH" },
  { name: "Maya Saad", role: "Pastry Chef", initials: "MS" },
];

function About() {
  return (
    <div className="about-page">
      <header className="page-header">
        <h1>Our Story</h1>
        <p>A small saj stand that grew into a neighbourhood favourite, without ever changing the recipes.</p>
      </header>

      <section className="section container about-intro">
        <div className="about-image">
          <img src={`${process.env.PUBLIC_URL}/images/manakish.svg`} alt="Za'atar manakish fresh from the saj" />
          <div className="about-badge">
            <strong>14</strong>
            <span>years of cooking</span>
          </div>
        </div>
        <div>
          <span className="eyebrow-text">Who we are</span>
          <h2>Home cooking, the Lebanese way</h2>
          <p>
            Cedar &amp; Saj started in 2012 when Teta Salma began baking manakish for her neighbours on a
            single saj. People kept coming back, so the family opened a small restaurant serving the dishes
            they grew up with: creamy hummus, crispy falafel, charcoal-grilled taouk and warm knefeh.
          </p>
          <p>
            Today our online ordering lets more people enjoy the same food at home. The recipes, the fresh
            ingredients and the welcome are the same as on day one.
          </p>
          <Link to="/menu" className="btn btn-primary">Explore the Menu</Link>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <SectionTitle eyebrow="Our values" title="What makes us different" />
          <div className="values-grid">
            {values.map((value) => (
              <div className="value-card" key={value.title}>
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle eyebrow="Our journey" title="From one saj to your screen" />
        <div className="timeline">
          {timeline.map((item) => (
            <div className="timeline-item" key={item.year}>
              <span className="timeline-year">{item.year}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionTitle eyebrow="The team" title="Meet the people in the kitchen" />
        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
