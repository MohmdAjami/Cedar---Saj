import { useState } from "react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../styles/Contact.css";

const emptyForm = { fname: "", email: "", phone: "", subject: "General question", message: "" };

function Contact() {
  const [state, setState] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (state.fname.trim().length < 3) newErrors.fname = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(state.email)) newErrors.email = "Please enter a valid email.";
    if (state.message.trim().length < 10) newErrors.message = "Your message should be at least 10 characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Contact form data:", JSON.stringify(state));
      setSent(true);
    }
  };

  const sendAnother = () => {
    setState(emptyForm);
    setSent(false);
  };

  return (
    <div className="contact-page">
      <header className="page-header">
        <h1>Contact Us</h1>
        <p>Questions, catering requests or feedback? We'd love to hear from you.</p>
      </header>

      <section className="section container">
        <div className="contact">
          <div className="leftSide">
            <h2>Get in touch</h2>
            <p>We usually reply within a few hours during opening times.</p>
            <ul>
              <li><PlaceOutlinedIcon /> <span>Hamra Street, Beirut, Lebanon</span></li>
              <li><PhoneOutlinedIcon /> <span>+961 1 000 000</span></li>
              <li><EmailOutlinedIcon /> <span>hello@cedarandsaj.example</span></li>
              <li><AccessTimeIcon /> <span>Every day, 8:00 AM – 11:00 PM</span></li>
            </ul>
            <img src={`${process.env.PUBLIC_URL}/images/coffee.svg`} alt="Lebanese coffee" />
          </div>

          <div className="rightSide">
            {sent ? (
              <div className="sent-message">
                <CheckCircleIcon />
                <h2>Thank you, {state.fname.split(" ")[0]}!</h2>
                <p>Your message was sent. We will reply to <strong>{state.email}</strong> soon.</p>
                <button className="btn btn-outline" onClick={sendAnother}>Send another message</button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} noValidate>
                <h2>Send us a message</h2>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="fname">Full Name *</label>
                    <input id="fname" name="fname" type="text" placeholder="Enter full name..." value={state.fname} onChange={handleChange} />
                    {errors.fname && <span className="error">{errors.fname}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" placeholder="Enter email..." value={state.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" placeholder="+961 ..." value={state.phone} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" value={state.subject} onChange={handleChange}>
                      <option>General question</option>
                      <option>Catering request</option>
                      <option>Private event booking</option>
                      <option>Feedback on my order</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="6" placeholder="Enter message..." value={state.message} onChange={handleChange}></textarea>
                  {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message <SendIcon fontSize="small" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
