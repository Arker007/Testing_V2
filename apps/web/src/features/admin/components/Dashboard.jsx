import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";
import { InteractiveHoverButton } from "../../../registry/magicui/interactive-hover-button";
import { Icon } from "@iconify/react";

function formatRelativeTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const diffMs = Date.now() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${diffDay}d ago`;
}

function StatCard({ iconName, label, value, href }) {
  if (!iconName) return null;
  const card = (
    <div className={styles.stat}>
      <div className={styles.statIcon}>
        <Icon icon={iconName} className="w-5 h-5" />
      </div>
      <div className={styles.statInfo}>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statVal}>{value ?? "-"}</div>
      </div>
    </div>
  );
  return href ? <Link to={href} className={styles.statLink}>{card}</Link> : card;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sysStatus, setSysStatus] = useState(null);
  const [sysLoading, setSysLoading] = useState(true);

  useEffect(() => {
    const h = { Authorization: `Bearer ${localStorage.getItem("admin_token")}` };
    Promise.all([
      fetch("/api/stats", { headers: h }).then((r) => r.json()).catch(() => { setStatsError(true); return null; }),
      fetch("/api/products", { headers: h }).then((r) => r.json()).catch(() => ({ products: [] })),
      fetch("/api/inquiries", { headers: h }).then((r) => r.json()).catch(() => []),
    ]).then(([s, p, i]) => {
      setStats(s);
      setProducts((p?.products || []).slice(0, 5));
      setInquiries((Array.isArray(i) ? i : i?.inquiries || []).slice(0, 5));
    }).finally(() => setLoading(false));

    const t0 = Date.now();
    Promise.all([
      fetch("/api/products", { headers: h }).then((r) => ({ ok: r.ok, ms: Date.now() - t0 })).catch(() => ({ ok: false, ms: null })),
      fetch("/api/categories", { headers: h }).then((r) => ({ ok: r.ok })).catch(() => ({ ok: false })),
      fetch("/api/inquiries", { headers: h }).then((r) => ({ ok: r.ok })).catch(() => ({ ok: false })),
    ]).then(([api, cats, inqs]) => {
      setSysStatus({ api, cats, inqs, time: new Date() });
    }).finally(() => setSysLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div>
          <h2 className={styles.heroTitle}>{greeting}, Admin</h2>
          <p className={styles.heroSub}>Monitor key metrics, sync listings, and handle inquiries.</p>
        </div>
        <div className={styles.heroActions} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <InteractiveHoverButton onClick={() => navigate("/admin/products?new=1")} className="font-bold shadow-sm">
            Add Product
          </InteractiveHoverButton>
          <InteractiveHoverButton onClick={() => navigate("/admin/categories?new=1")} className="font-bold shadow-sm">
            Add Category
          </InteractiveHoverButton>
        </div>
      </section>

      {statsError && (
        <div className={styles.alert}>
          <Icon icon="solar:danger-triangle-linear" className="w-4 h-4 inline mr-2 text-rose-500" /> Core services are uncommunicative. check API status.
        </div>
      )}

      <section className={styles.statsRow}>
        <StatCard iconName="solar:box-minimalistic-linear" label="Products Listed" value={loading ? "..." : stats?.products ?? 0} href="/admin/products" />
        <StatCard iconName="solar:tag-linear" label="Total Categories" value={loading ? "..." : stats?.categories ?? 0} href="/admin/categories" />
        <StatCard iconName="solar:letter-linear" label="Inquiries Logged" value={loading ? "..." : inquiries.length} href="/admin/inquiries" />
      </section>

      <section className={styles.grid2}>
        <article className={styles.panel}>
          <div className={styles.panelHead}>
            <h3 className={styles.panelTitle} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="solar:box-minimalistic-linear" className="w-4.5 h-4.5" /> Recent Catalog Products
            </h3>
            <Link to="/admin/products" className={styles.link}>See all</Link>
          </div>
          {loading ? <Skel rows={5} /> : products.length === 0 ? <Empty iconName="solar:inbox-linear" msg="No products yet" /> : (
            products.map((p) => {
              let img = null;
              try { img = JSON.parse(p.image)?.[0]; } catch { img = p.image; }
              return (
                <div key={p.id} className={styles.listRow}>
                  <div className={styles.listThumb}>
                    {img ? <img src={img} alt="" /> : <Icon icon="solar:gallery-linear" className="w-4.5 h-4.5 text-slate-400" />}
                  </div>
                  <div className={styles.listInfo}>
                    <div className={styles.listName}>{p.name}</div>
                    <div className={styles.listSub}>{p.category_name || "Uncategorized"}</div>
                  </div>
                  <Link to={`/admin/products/${p.id}`} className={styles.miniBtn}><Icon icon="solar:pen-linear" className="w-3.5 h-3.5" /></Link>
                </div>
              );
            })
          )}
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHead}>
            <h3 className={styles.panelTitle} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Icon icon="solar:letter-linear" className="w-4.5 h-4.5" /> Recent Inquiries Timeline
            </h3>
            <Link to="/admin/inquiries" className={styles.link}>See all</Link>
          </div>
          {loading ? <Skel rows={5} /> : inquiries.length === 0 ? <Empty iconName="solar:inbox-linear" msg="No incoming inquiries" /> : (
            <div className={styles.activityFeed}>
              {inquiries.map((inq, idx) => {
                const isProduct = inq.product_id || inq.message?.toLowerCase().includes("product") || inq.message?.toLowerCase().includes("pallet");
                return (
                  <div key={inq.id ?? idx} className={styles.activityItem}>
                    <div className={styles.timelineTrack}>
                      <div className={styles.timelineDot} style={{ background: isProduct ? "var(--brand)" : "var(--text-primary)" }} />
                      {idx < inquiries.length - 1 && <div className={styles.timelineLine} />}
                    </div>
                    <div className={styles.activityCard}>
                      <div className={styles.activityMeta}>
                        <span className={styles.activityUser}>{inq.name || "Anonymous User"}</span>
                        <span className={styles.activityTime}>{formatRelativeTime(inq.created_at)}</span>
                      </div>
                      <p className={styles.activitySnippet}>{inq.message || ""}</p>
                      <span className={styles.activityBadge} style={{
                        background: isProduct ? "var(--brand-light)" : "var(--bg-surface)",
                        color: isProduct ? "var(--brand-dark)" : "var(--text-primary)"
                      }}>
                        {isProduct ? "Product Quote" : "General Query"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h3 className={styles.panelTitle} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon icon="solar:server-linear" className="w-4.5 h-4.5" /> System Service Metrics
          </h3>
          {sysStatus && <span className={styles.healthTime}>Refreshed at {sysStatus.time.toLocaleTimeString("en-IN")}</span>}
        </div>
        <div className={styles.statusFlexRow}>
          <StatusRow label="API Framework" ok={sysStatus?.api?.ok} loading={sysLoading} detail={sysStatus?.api?.ok ? `${sysStatus.api.ms}ms` : "Network down"} iconName="solar:pulse-linear" />
          <StatusRow label="Products Registry" ok={sysStatus?.api?.ok} loading={sysLoading} detail={sysStatus?.api?.ok ? `${stats?.products ?? 0} items` : "Locked"} iconName="solar:box-minimalistic-linear" />
          <StatusRow label="Categories Matrix" ok={sysStatus?.cats?.ok} loading={sysLoading} detail={sysStatus?.cats?.ok ? `${stats?.categories ?? 0} groups` : "Locked"} iconName="solar:tag-linear" />
          <StatusRow label="Inquiries Stream" ok={sysStatus?.inqs?.ok} loading={sysLoading} detail={sysStatus?.inqs?.ok ? "Live" : "Unreachable"} iconName="solar:letter-linear" />
        </div>
      </section>
    </div>
  );
}

function StatusRow({ iconName, label, ok, loading, detail }) {
  if (!iconName) return null;
  const stateClass = loading ? styles.stateLoading : ok ? styles.stateOk : styles.stateDown;
  return (
    <div className={`${styles.statusRowMini} ${stateClass}`}>
      <div className={styles.statusIconMini}>
        {loading ? (
          <Icon icon="solar:restart-linear" className="w-4 h-4 animate-spin" />
        ) : (
          <Icon icon={iconName} className="w-4 h-4" />
        )}
      </div>
      <div className={styles.statusLabelMini}>{label}</div>
      <div className={styles.statusDetailMini}>{loading ? "Verifying..." : detail}</div>
      <div className={styles.statusBadgeMini}>
        {loading ? (
          <Icon icon="solar:restart-linear" className="w-3.5 h-3.5 animate-spin" />
        ) : ok ? (
          <Icon icon="solar:check-circle-linear" className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Icon icon="solar:close-circle-linear" className="w-3.5 h-3.5 text-rose-500" />
        )}
      </div>
    </div>
  );
}

function Skel({ rows }) {
  return <div className={styles.skelWrap}>{Array(rows).fill(0).map((_, i) => <div key={i} className={styles.skelRow} />)}</div>;
}

function Empty({ iconName, msg }) {
  if (!iconName) return null;
  return (
    <div className={styles.empty}>
      <Icon icon={iconName} className="w-6 h-6 text-slate-400 mb-2" />
      <p>{msg}</p>
    </div>
  );
}