import React from "react";
import styles from "../../products.module.css";
import { Skeleton } from "../../../../shared/ui";

export default function ProductListSkeletonCard() {
  return (
    <article className={styles.listCard}>
      <div className={styles.listCardThumbWrap}>
        <Skeleton variant="rectangular" className="w-full h-full rounded-none !bg-slate-100 dark:!bg-white/5" />
      </div>

      <div className={styles.listCardDetails}>
        <div className={styles.skuRow}>
          <Skeleton variant="text" className="w-20 h-3 !rounded-md" />
        </div>

        <Skeleton variant="text" className="w-3/5 h-6 mb-2" />
        
        <div className="mb-3">
          <Skeleton variant="text" className="w-full h-3 mb-1" />
          <Skeleton variant="text" className="w-4/5 h-3" />
        </div>

        {/* Dimensions */}
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

        <div className={styles.listBentoGrid}>
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
      </div>

      <div className={styles.listCardActions}>
        <Skeleton variant="rectangular" className="h-11 w-full !rounded-[8px]" />
        <Skeleton variant="text" className="w-36 h-4 mx-auto" />
      </div>
    </article>
  );
}
