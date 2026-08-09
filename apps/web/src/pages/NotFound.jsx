import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.badge}>404 Error</span>
        <h1 className={styles.title}>Resource Not Found</h1>
        <p className={styles.desc}>
          The directory path or product record you are looking for has been moved, renamed, or is currently unavailable.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>
            <i className="fa-solid fa-house" /> Back to Safety
          </Link>
          <Link to="/products" className={styles.btnOutline}>
            <i className="fa-solid fa-box-open" /> Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
