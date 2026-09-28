import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from '../styles/NotFound.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.badge}>404 error</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.desc}>
          The page or product record you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>
            <Icon icon="carbon:home" className="w-4 h-4 mr-1.5" /> Return to home
          </Link>
          <Link to="/products" className={styles.btnOutline}>
            <Icon icon="carbon:cube" className="w-4 h-4 mr-1.5" /> Browse catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
