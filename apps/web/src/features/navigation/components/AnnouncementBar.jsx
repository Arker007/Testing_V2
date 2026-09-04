import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "../styles/navbar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.announcementBar}>
      <div className={styles.announcementInner}>
        <span>
          <Icon icon="solar:leaf-linear" className="w-4 h-4 text-emerald-400 inline align-middle mr-1" />
          {" "}Leading the change: Over{" "}
          <span className={styles.announcementHighlight}>1,500+ Tons</span> of
          industrial plastic waste diverted from landfills.
        </span>
        <Link to="/contact" className={styles.announcementLink}>
          Get Free Quote <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 inline ml-1" />
        </Link>
      </div>
    </div>
  );
}
