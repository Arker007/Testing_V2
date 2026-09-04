import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from '../styles/NotFound.module.css';

export default function NotFoundPage() {
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
            <Icon icon="solar:home-2-linear" className="w-4 h-4 mr-1.5" /> Back to Safety
          </Link>
          <Link to="/products" className={styles.btnOutline}>
            <Icon icon="solar:box-minimalistic-linear" className="w-4 h-4 mr-1.5" /> Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
