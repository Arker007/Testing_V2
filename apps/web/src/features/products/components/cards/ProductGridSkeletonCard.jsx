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
        
        <div className={styles.specList}>
           <div className={styles.specRowItem}>
             <Skeleton variant="text" className="w-20 h-3" />
             <Skeleton variant="text" className="w-24 h-3" />
           </div>
           <div className={styles.specRowItem}>
             <Skeleton variant="text" className="w-16 h-3" />
             <Skeleton variant="text" className="w-20 h-3" />
           </div>
           <div className={styles.specRowItem}>
             <Skeleton variant="text" className="w-24 h-3" />
             <Skeleton variant="text" className="w-16 h-3" />
           </div>
           <div className={styles.specRowItem}>
             <Skeleton variant="text" className="w-28 h-3" />
             <Skeleton variant="text" className="w-20 h-3" />
           </div>
           <div className={styles.specRowItem}>
             <Skeleton variant="text" className="w-20 h-3" />
             <Skeleton variant="text" className="w-16 h-3" />
           </div>
        </div>

        <div className={styles.gridCardBtnWrap}>
          <Skeleton variant="rectangular" className="h-10 w-full !rounded-md" />
        </div>

        <div className={styles.datasheetLinkWrap}>
          <Skeleton variant="text" className="w-32 h-3" />
        </div>
      </div>
    </article>
  );
}
