import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Icon } from "@iconify/react";
import styles from "./PageHero.module.css";

export default function PageHero({
  breadcrumbs = [],
  tag,
  tagIcon,
  title,
  titleAccent,
  description,
  children,
  className = "",
}) {
  return (
    <header className={`${styles.hero} ${className}`.trim()}>
      <div className={styles.heroBg} />
      <div className="container relative z-10">
        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Motion.nav
            className={styles.breadcrumb}
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={item.label || idx}>
                  {idx > 0 && (
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      className={`${styles.breadcrumbSep} w-3 h-3`}
                    />
                  )}
                  {isLast || !item.to ? (
                    <span className={isLast ? styles.breadcrumbActive : "text-white/80"}>
                      {item.label}
                    </span>
                  ) : (
                    <Link to={item.to} className={styles.breadcrumbLink}>
                      {idx === 0 && (
                        <Icon
                          icon="solar:home-2-linear"
                          className="w-3.5 h-3.5 opacity-80 shrink-0"
                        />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </Motion.nav>
        )}

        <div className="flex flex-col">
          <Motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {/* Tag / Badge */}
            {tag && (
              <div className="mb-4">
                <span className={styles.heroBadge}>
                  {tagIcon && <Icon icon={tagIcon} className={`w-4 h-4 ${styles.heroBadgeIcon}`} />}
                  <span>{tag}</span>
                </span>
              </div>
            )}

            {/* Title */}
            {title && (
              <h1 className={styles.heroTitle}>
                {title}{" "}
                {titleAccent && (
                  <span className={styles.heroTitleAccent}>{titleAccent}</span>
                )}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className={styles.heroDescription}>
                {description}
              </p>
            )}

            {children}
          </Motion.div>
        </div>
      </div>
    </header>
  );
}

