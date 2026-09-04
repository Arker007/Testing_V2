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
    { icon: "solar:map-point-linear", text: addr },
    { icon: "solar:phone-calling-linear", text: co("phone", "+91 98986 86379") },
    { icon: "solar:letter-linear", text: co("email", "info@vishalenterprise.com") },
    { icon: "solar:clock-circle-linear", text: "Mon – Sat: 9 AM – 6 PM" },
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
            <Icon icon="solar:verified-check-linear" className="text-emerald-500 w-5 h-5 inline mr-1.5" />
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
                <Icon icon="solar:letter-linear" className="text-lg" />
              </a>
            )}
            {co("phone") && (
              <a
                href={`tel:${co("phone").replace(/\s/g, "")}`}
                className={styles.social}
                aria-label="Phone"
              >
                <Icon icon="solar:phone-calling-linear" className="text-lg" />
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
              icon="solar:alt-arrow-down-linear"
              className={`${styles.headingChevron} ${openSections.products ? styles.headingChevronActive : ""}`}
            />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.products ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.list}>
              {PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.fLink}>
                    <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 inline mr-1 text-emerald-500" />
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
              icon="solar:alt-arrow-down-linear"
              className={`${styles.headingChevron} ${openSections.quick ? styles.headingChevronActive : ""}`}
            />
          </button>
          <div className={styles.headingLine} />
          <div className={`${styles.collapsibleContent} ${openSections.quick ? styles.collapsibleContentOpen : ""}`}>
            <ul className={styles.list}>
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.fLink}>
                    <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 inline mr-1 text-emerald-500" />
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
              icon="solar:alt-arrow-down-linear"
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
                <Icon icon="solar:check-circle-linear" className="text-emerald-500 inline mr-1" />
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
                  <Icon icon="solar:plain-3-linear" className="w-4 h-4 text-slate-900" />
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
