import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import styles from "../styles/footer.module.css";

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
    { icon: "carbon:location", text: addr },
    { icon: "carbon:phone", text: co("phone", "+91 98986 86379") },
    { icon: "carbon:email", text: co("email", "info@vishalenterprise.com") },
    { icon: "carbon:time", text: "Mon – Sat: 9 AM – 6 PM" },
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
          <Link to="/" className={styles.logoRow}>
            {co("logo") && !logoError ? (
              <img
                src={co("logo")}
                alt={co("name", "VISHAL ENTERPRISE")}
                className={styles.logoImg}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className={styles.logoIcon}>
                {co("name", "VISHAL ENTERPRISE").charAt(0).toUpperCase()}
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
          </Link>
          <p className={styles.tagline}>
            {c(
              "footer_tagline",
              co("description", "Processing industrial plastic waste into premium recycled lumber, pallets, and custom outdoor structures since 2008.")
            )}
          </p>
          
          <div className={styles.brandLine} />

          <div className={styles.isoRow}>
            <Icon icon="carbon:certificate" className="text-emerald-500 w-5 h-5 inline mr-1.5" />
            <span>{co("gstin") ? `GSTIN: ${co("gstin")}` : c("cert_gst", "GST Registered")}</span>
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
                <Icon icon="logos:whatsapp-icon" className="text-lg" />
              </a>
            )}
            {co("email") && (
              <a
                href={`mailto:${co("email")}`}
                className={styles.social}
                aria-label="Email"
              >
                <Icon icon="carbon:email" className="text-lg" />
              </a>
            )}
            {co("phone") && (
              <a
                href={`tel:${co("phone").replace(/\s/g, "")}`}
                className={styles.social}
                aria-label="Phone"
              >
                <Icon icon="carbon:phone" className="text-lg" />
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
                <Icon icon="logos:linkedin-icon" className="text-lg" />
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
            <Icon
              icon="carbon:chevron-down"
              className={`${styles.headingChevron} ${openSections.products ? styles.headingChevronActive : ""}`}
            />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.products ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.list}>
              {PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.fLink}>
                    <Icon icon="carbon:chevron-right" className="w-3 h-3 inline mr-1 text-emerald-500" />
                    {item.label}
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
            <Icon
              icon="carbon:chevron-down"
              className={`${styles.headingChevron} ${openSections.quick ? styles.headingChevronActive : ""}`}
            />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.quick ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.list}>
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.fLink}>
                    <Icon icon="carbon:chevron-right" className="w-3 h-3 inline mr-1 text-emerald-500" />
                    {item.label}
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
            <Icon
              icon="carbon:chevron-down"
              className={`${styles.headingChevron} ${openSections.contact ? styles.headingChevronActive : ""}`}
            />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.contact ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.contactList}>
              {CONTACT.map(
                (ci, i) =>
                  ci.text && (
                    <li key={i} className={styles.contactItem}>
                      <Icon icon={ci.icon} className={`${styles.cIcon} text-emerald-500 shrink-0 w-4 h-4`} />
                      <span>{ci.text}</span>
                    </li>
                  ),
              )}
            </ul>
          </div>

          <div className={styles.newsletterDivider} />

          <div className={styles.newsletter}>
            <p className={styles.heading}>Stay Updated</p>
            <div className={styles.headingLine} />
            {subscribed ? (
              <p className={styles.subscribedText}>
                <Icon icon="carbon:checkmark-outline" className="text-emerald-500 inline mr-1" />
                Thank you for subscribing!
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
                  <Icon icon="carbon:send-alt" className="w-4 h-4 text-slate-900" />
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
