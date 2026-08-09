import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.announcementBar}>
      <div className={styles.announcementInner}>
        <span>
          🌱 Leading the change: Over{" "}
          <span className={styles.announcementHighlight}>1,500+ Tons</span> of
          industrial plastic waste diverted from landfills.
        </span>
        <Link to="/contact" className={styles.announcementLink}>
          Get Free Quote <i className="fa-solid fa-arrow-right" />
        </Link>
      </div>
    </div>
  );
}
