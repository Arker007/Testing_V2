import React, { Component } from 'react';
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
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <i className="fa-solid fa-triangle-exclamation" />
            </div>
            <h1 className={styles.title}>Something Went Wrong</h1>
            <p className={styles.message}>
              An unexpected error occurred. Please reload the page or try again later.
            </p>
            {this.state.error?.message && (
              <pre className={styles.debug}>
                {String(this.state.error.message)}
              </pre>
            )}
            <div className={styles.actions}>
              <button className={styles.btnPrimary} onClick={() => window.location.reload()}>
                <i className="fa-solid fa-rotate-right" /> Reload Page
              </button>
              <a href="/" className={styles.btnOutline}>
                <i className="fa-solid fa-house" /> Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
