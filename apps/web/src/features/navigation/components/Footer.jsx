import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSite } from "../../../shared/context/SiteContext";
import { Input, Button, OptimizedImage } from "@/shared/ui";
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
    ? `${co("address")}${co("city") ? ", " + co("city") : ""}${co("pincode") ? ", " + co("pincode") : ""}`
    : "Plot No. 1706/06, South 9 Road, G.I.D.C., Ankleshwar, Bharuch, Gujarat, 393002";

  const CONTACT = [
    { icon: "carbon:location", text: addr },
    { icon: "carbon:phone", text: co("phone", "+91 9898686379") },
    { icon: "carbon:email", text: co("email", "Info@vishalenterpriseank.com") },
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

  const SOCIAL_CHANNELS = [
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: "simple-icons:whatsapp",
      url: waLink,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "simple-icons:linkedin",
      url: co("linkedin") || "https://www.linkedin.com/company/vishal-enterprise",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "simple-icons:instagram",
      url: co("instagram") || "https://www.instagram.com/vishalenterprise",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "simple-icons:youtube",
      url: co("youtube") || "https://www.youtube.com/@vishalenterprise",
    },
    ...(co("facebook")
      ? [
          {
            id: "facebook",
            name: "Facebook",
            icon: "simple-icons:facebook",
            url: co("facebook"),
          },
        ]
      : []),
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Company Column */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logoRow}>
            {co("logo") && !logoError ? (
              <OptimizedImage
                src={co("logo")}
                alt={co("name", "VISHAL ENTERPRISE")}
                className={styles.logoImg}
                onError={() => setLogoError(true)}
                width="48"
                height="48"
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
              (co("description") || "Transforming industrial plastic waste into premium recycled lumber, pallets, and custom outdoor structures since 2008.")
                .replace(/\.?\s*(?:ISO\s*9001(?::2015)?|GST\s*Registered)?\s*Certified\.?/gi, "")
                .replace(/\.?\s*GST\s*Registered\.?/gi, "")
                .replace(/\.?\s*ISO\s*9001(?::2015)?\.?/gi, "")
                .trim()
            )}
          </p>
          
          <div className={styles.brandLine} />

          <div className={styles.isoRow}>
            <Icon icon="carbon:certificate" className="text-emerald-500 w-5 h-5 inline mr-1.5" />
            <span>{co("gstin") ? `GSTIN: ${co("gstin")}` : c("cert_gst", "GSTIN: 24AXCPS0336E1ZV")}</span>
          </div>

          <div className={styles.socialsSection}>
            <span className={styles.socialsHeading}>Social Media</span>
            <div className={styles.socialsGrid}>
              {SOCIAL_CHANNELS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className={`${styles.socialCard} ${styles[`social_${item.id}`]}`}
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`footer-social-${item.id}`}
                >
                  <span className={styles.socialIconWrap}>
                    <Icon icon={item.icon} className={styles.socialIcon} />
                  </span>
                  <span className={styles.socialName}>
                    {item.name}
                    <span className={styles.socialUnderline} />
                  </span>
                  <Icon icon="carbon:arrow-up-right" className={styles.socialArrow} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Products Column */}
        <div>
          <button
            type="button"
            className={`${styles.heading} ${styles.accordionHeader}`}
            onClick={() => toggleSection("products")}
            aria-expanded={openSections.products}
            aria-label="Toggle Products navigation links"
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
            aria-expanded={openSections.quick}
            aria-label="Toggle Quick Links navigation links"
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
            aria-expanded={openSections.contact}
            aria-label="Toggle Contact Information"
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
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-2">
                <Input
                  type="email"
                  size="sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  aria-label="Subscribe"
                  className="!px-3 !h-9 shrink-0"
                  icon={<Icon icon="carbon:send-alt" className="w-4 h-4" />}
                />
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
