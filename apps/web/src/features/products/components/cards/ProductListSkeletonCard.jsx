import React from "react";
import styles from "../../products.module.css";
import { Skeleton } from "../../../../shared/ui";

export default function ProductListSkeletonCard() {
  return (
    <article className={styles.listCard}>
      <div className={styles.listCardThumb}>
        <Skeleton variant="rectangular" className="w-full h-full rounded-none !bg-slate-100 dark:!bg-white/5" />
      </div>

      <div className={styles.listCardBody}>
        <div className={styles.listMetaRow}>
          <Skeleton variant="text" className="w-24 h-4 !rounded-md" />
          <Skeleton variant="text" className="w-20 h-4 !rounded-md" />
        </div>

        <Skeleton variant="text" className="w-2/3 h-6 mt-3 mb-2" />
        
        <div className="mb-4">
           <Skeleton variant="text" className="w-full h-3 mb-1.5" />
           <Skeleton variant="text" className="w-5/6 h-3" />
        </div>

        <div className={styles.listSpecsLine}>
          <Skeleton variant="text" className="w-24 h-6 !rounded-full" />
          <Skeleton variant="text" className="w-32 h-6 !rounded-full" />
          <Skeleton variant="text" className="w-36 h-6 !rounded-full" />
        </div>
      </div>

      <div className={styles.listActions}>
        <Skeleton variant="rectangular" className="w-full sm:w-32 h-10 !rounded-md" />
        <Skeleton variant="rectangular" className="w-10 h-10 !rounded-md" />
      </div>
    </article>
  );
}
