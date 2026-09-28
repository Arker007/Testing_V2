import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    // Check if error is related to stale Vite chunk or dynamic module import failure
    const errorMsg = error?.message || "";
    if (
      errorMsg.includes("Failed to fetch dynamically imported module") ||
      errorMsg.includes("dynamically imported module") ||
      errorMsg.includes("Importing a module script failed")
    ) {
      const alreadyRefreshed = sessionStorage.getItem("chunk_reload_attempt");
      if (!alreadyRefreshed) {
        sessionStorage.setItem("chunk_reload_attempt", "1");
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <Icon icon="carbon:warning-alt" className="w-8 h-8 text-rose-500" />
            </div>
            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.message}>
              An unexpected error occurred while loading this page. Please try refreshing or return to the homepage.
            </p>
            {this.state.error?.message && (
              <pre className={styles.debug}>
                {String(this.state.error.message)}
              </pre>
            )}
            <div className={styles.actions}>
              <button className={styles.btnPrimary} onClick={() => window.location.reload()}>
                <Icon icon="carbon:renew" className="w-4 h-4 mr-1.5 inline" /> Reload page
              </button>
              <a href="/" className={styles.btnOutline}>
                <Icon icon="carbon:home" className="w-4 h-4 mr-1.5 inline" /> Return to home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
