import { useState } from "react";
import { Link } from "react-router-dom";
import { useSite } from "../../shared/context/SiteContext";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Manufacturing", path: "/manufacturing" },
  { label: "Sustainability", path: "/sustainability" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const PRODUCT_LINKS = [
  { label: "Plastic Lumber", path: "/products?cat=plastic-lumber" },
  { label: "Plastic Pallets", path: "/products?cat=plastic-pallets" },
  { label: "Garden Bench", path: "/products?cat=garden-bench" },
  { label: "Plastic Table", path: "/products?cat=plastic-table" },
  { label: "Garden Fence", path: "/products?cat=garden-fence" },
  { label: "Outdoor Furniture", path: "/products?cat=outdoor-furniture" },
  { label: "Custom Products", path: "/products?cat=custom-products" }
];

export default function Footer() {
  const { co, c } = useSite();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [openSections, setOpenSections] = useState({
    products: false,
    quick: false,
    contact: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const addr = co("address")
    ? `${co("address")}${co("city") ? ", " + co("city") : ""}`
    : "Plot No. 42, GIDC Industrial Estate, Vapi – 396195, Gujarat, India";

  const CONTACT = [
    { icon: "fa-location-dot", text: addr },
    { icon: "fa-phone", text: co("phone", "+91 98986 86379") },
    { icon: "fa-envelope", text: co("email", "info@vishalenterprise.com") },
    { icon: "fa-clock", text: "Mon – Sat: 9 AM – 6 PM" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Newsletter Subscriber",
        email: email.trim(),
        message: "Newsletter signup from footer."
      })
    })
      .then(() => {
        setSubscribed(true);
        setEmail("");
      })
      .catch(() => {
        setSubscribed(true); // Fallback graciously
      });
  };

  const waLink = `https://wa.me/${co("whatsapp", "919898686379").replace(/\D/g, "")}`;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Company Column */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            {co("logo") && !logoError ? (
              <div className={styles.customLogo}>
                <img
                  src={co("logo")}
                  alt={co("name", "VISHAL ENTERPRISE")}
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className={styles.customLogo}>
                {/* Fallback designed exactly like the white rounded VE logo block in the mockup */}
                <div className={styles.fallbackLogoInner}>
                  <span className={styles.logoV}>V</span>
                  <span className={styles.logoE}>E</span>
                </div>
              </div>
            )}
            <div className={styles.logoTitles}>
              <div className={styles.logoName}>
                {co("name", "VISHAL ENTERPRISE")}
              </div>
              <div className={styles.logoSub}>
                {co("tagline", "Circular Polymers & Recycled Solutions")}
              </div>
            </div>
          </div>
          <p className={styles.tagline}>
            {c(
              "footer_tagline",
              co("description", "Transforming industrial plastic waste into premium recycled lumber, pallets, and custom outdoor structures since 2008.")
            )}
          </p>
          
          <div className={styles.brandLine} />

          <div className={styles.isoRow}>
            <i className="fa-solid fa-circle-check" />
            <span>ISO 9001:2015 Certified</span>
          </div>

          <div className={styles.socials}>
            {co("whatsapp", "919898686379") && (
              <a
                href={waLink}
                className={styles.social}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" />
              </a>
            )}
            {co("email") && (
              <a
                href={`mailto:${co("email")}`}
                className={styles.social}
                aria-label="Email"
              >
                <i className="fa-solid fa-envelope" />
              </a>
            )}
            {co("phone") && (
              <a
                href={`tel:${co("phone").replace(/\s/g, "")}`}
                className={styles.social}
                aria-label="Phone"
              >
                <i className="fa-solid fa-phone" />
              </a>
            )}
            {co("linkedin") && (
              <a
                href={co("linkedin")}
                className={styles.social}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin" />
              </a>
            )}
          </div>
        </div>

        {/* Products Column */}
        <div>
          <button
            type="button"
            className={`${styles.heading} ${styles.accordionHeader}`}
            onClick={() => toggleSection("products")}
          >
            <span>Our Products</span>
            <i className={`fa-solid fa-chevron-down ${styles.headingChevron} ${openSections.products ? styles.headingChevronActive : ""}`} />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.products ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.list}>
              {PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.fLink}>
                    <i className="fa-solid fa-chevron-right" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <button
            type="button"
            className={`${styles.heading} ${styles.accordionHeader}`}
            onClick={() => toggleSection("quick")}
          >
            <span>Quick Links</span>
            <i className={`fa-solid fa-chevron-down ${styles.headingChevron} ${openSections.quick ? styles.headingChevronActive : ""}`} />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.quick ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.list}>
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.fLink}>
                    <i className="fa-solid fa-chevron-right" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Newsletter Column */}
        <div>
          <button
            type="button"
            className={`${styles.heading} ${styles.accordionHeader}`}
            onClick={() => toggleSection("contact")}
          >
            <span>Contact Us</span>
            <i className={`fa-solid fa-chevron-down ${styles.headingChevron} ${openSections.contact ? styles.headingChevronActive : ""}`} />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.contact ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.contactList}>
              {CONTACT.map(
                (ci, i) =>
                  ci.text && (
                    <li key={i} className={styles.contactItem}>
                      <i className={`fa-solid ${ci.icon} ${styles.cIcon}`} />
                      <span>{ci.text}</span>
                    </li>
                  ),
              )}
            </ul>
          </div>

          <div className={styles.newsletterDivider} />

          <div className={styles.newsletter}>
            <h4 className={styles.heading}>Stay Updated</h4>
            <div className={styles.headingLine} />
            {subscribed ? (
              <p className={styles.subscribedText}>
                <i className="fa-solid fa-circle-check" /> Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterSubmit} aria-label="Subscribe">
                  <i className="fa-solid fa-paper-plane" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomLeft}>
            <span>
              {c(
                "footer_copy",
                `© ${new Date().getFullYear()} ${co("name", "VISHAL ENTERPRISE")}. All rights reserved.`,
              )}
            </span>
            <span className={styles.madeWith}>
              Made with 💚 in {co("state", "Gujarat")}, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
