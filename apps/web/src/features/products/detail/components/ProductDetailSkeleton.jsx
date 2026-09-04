import React from "react";
import { Skeleton } from "@/shared/ui";

export function ProductDetailSkeleton() {
  return (
    <main className="pt-0 min-h-[80vh] bg-[var(--bg-canvas,#F2F2F2)] dark:bg-[var(--bg-canvas,#0f141a)] text-[var(--text-main,#0f141a)] dark:text-[var(--text-main,#F2F2F2)] pb-16">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-slate-200 dark:border-slate-800 py-4 bg-white dark:bg-[#161c24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2.5 items-center">
          <Skeleton width="40px" height="16px" />
          <Skeleton width="10px" height="16px" />
          <Skeleton width="64px" height="16px" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <Skeleton variant="card" className="aspect-4/3 h-auto" />
            <div className="flex gap-4 justify-center">
              {[1, 2, 3].map((_, i) => (
                <Skeleton key={i} width="64px" height="64px" className="rounded-lg" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 bg-[var(--bg-surface,#ffffff)] dark:bg-[var(--surface,#161c24)] border border-[var(--border-subtle,rgba(242,242,242,0.12))] rounded-[var(--radius-card,12px)] shadow-[var(--shadow-sm)]">
            <Skeleton width="80%" height="32px" />
            <Skeleton lines={2} variant="text" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} height="56px" className="rounded-[var(--radius-md,6px)]" />
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <Skeleton width="50%" height="48px" className="rounded-[var(--radius-btn,8px)]" />
              <Skeleton width="50%" height="48px" className="rounded-[var(--radius-btn,8px)]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailSkeleton;
