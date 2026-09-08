import React from "react";
import styles from "../../products.module.css";
import { Skeleton } from "../../../../shared/ui";

export default function ProductGridSkeletonCard() {
  return (
    <article className={styles.gridCard}>
      <div className={styles.gridCardThumbWrap}>
        <Skeleton variant="rectangular" className="w-full h-full rounded-none !bg-slate-100 dark:!bg-white/5" />
      </div>

      <div className={styles.gridCardDetails}>
        <div className="mb-4">
          <Skeleton variant="text" className="w-3/4 h-5 mb-2" />
          <Skeleton variant="text" className="w-1/2 h-5" />
        </div>
        
        {/* Dimensions Skeleton */}
        <div className={styles.dimBlock}>
          <div className={styles.dimIconWrap}>
            <Skeleton variant="circular" className="w-8 h-8 !rounded-full" />
          </div>
          <div className={styles.dimContent}>
            <Skeleton variant="text" className="w-16 h-3 mb-1" />
            <Skeleton variant="text" className="w-36 h-4" />
          </div>
        </div>

        <hr className={styles.cardDivider} />

        {/* 2x2 Bento Grid Skeleton */}
        <div className={styles.bentoGrid}>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className={styles.bentoItem}>
              <div className={styles.bentoIconWrap}>
                <Skeleton variant="circular" className="w-6 h-6 !rounded-full" />
              </div>
              <div className={styles.bentoContent}>
                <Skeleton variant="text" className="w-10 h-2.5 mb-1" />
                <Skeleton variant="text" className="w-16 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.gridCardActions}>
          <Skeleton variant="rectangular" className="h-11 w-full !rounded-[8px]" />
          <Skeleton variant="text" className="w-36 h-4 mx-auto" />
        </div>
      </div>
    </article>
  );
}
