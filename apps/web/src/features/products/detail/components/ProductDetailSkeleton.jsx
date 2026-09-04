import React from "react";
import { Skeleton } from "@/shared/ui";

export function ProductDetailSkeleton() {
  return (
    <main className="pt-0 min-h-[80vh] bg-[var(--bg-canvas)] text-[var(--text-primary)] pb-16">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-[var(--border-subtle)] py-4 bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2.5 items-center">
          <Skeleton width="50px" height="16px" />
          <Skeleton width="10px" height="16px" />
          <Skeleton width="70px" height="16px" />
          <Skeleton width="10px" height="16px" />
          <Skeleton width="160px" height="16px" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Stack */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <Skeleton variant="card" className="aspect-4/3 h-auto rounded-[var(--radius-card,8px)]" />
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} width="64px" height="64px" className="rounded-[var(--radius-card,8px)]" />
              ))}
            </div>
            {/* Specs Skeleton */}
            <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-card,8px)] flex flex-col gap-4">
              <Skeleton width="40%" height="24px" />
              <div className="space-y-3 pt-2">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Skeleton key={i} height="40px" className="rounded-[var(--radius-card,8px)]" />
                ))}
              </div>
            </div>
          </div>

          {/* Rail Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[var(--radius-card,8px)] shadow-xs">
            <div className="flex gap-2">
              <Skeleton width="80px" height="24px" className="rounded-[var(--radius-card,8px)]" />
              <Skeleton width="100px" height="24px" className="rounded-[var(--radius-card,8px)]" />
            </div>
            <Skeleton width="75%" height="36px" />
            <Skeleton lines={3} variant="text" />

            <Skeleton height="72px" className="rounded-[var(--radius-card,8px)]" />

            <div className="grid grid-cols-2 gap-3 mt-2">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton key={i} height="60px" className="rounded-[var(--radius-card,8px)]" />
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <Skeleton width="50%" height="48px" className="rounded-[var(--radius-card,8px)]" />
              <Skeleton width="50%" height="48px" className="rounded-[var(--radius-card,8px)]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailSkeleton;
