import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../admin/components/AdminTable.module.css';
import iStyles from './Inquiries.module.css';
import { normalizeInquiry } from '../../shared/utils/parsers';

export default function AdminInquiryDetail() {
    const { source, id } = useParams();
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const headers = { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };
        fetch('/api/inquiries', { headers })
            .then((r) => r.json())
            .then((d) => setInquiries(Array.isArray(d) ? d : d.inquiries || []))
            .catch(() => setInquiries([]))
            .finally(() => setLoading(false));
    }, []);

    const currentIndex = useMemo(
        () => inquiries.findIndex((inq) => String(inq.id) === String(id) && String(inq.source) === String(source)),
        [inquiries, id, source]
    );

    const current = currentIndex >= 0 ? normalizeInquiry(inquiries[currentIndex]) : null;
    const previous = currentIndex > 0 ? inquiries[currentIndex - 1] : null;
    const next = currentIndex >= 0 && currentIndex < inquiries.length - 1 ? inquiries[currentIndex + 1] : null;

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <i className="fa-solid fa-spinner fa-spin" /> Loading inquiry details...
            </div>
        );
    }

    if (!current) {
        return (
            <div className={`${styles.card} ${styles.notFoundCard}`}>
                <h2 className={styles.notFoundTitle}>Inquiry Not Found</h2>
                <p className={styles.muted} style={{ marginBottom: '16px' }}>The requested inquiry does not exist or has been deleted.</p>
                <Link to="/admin/inquiries" className={styles.actionBtnSecondary}>
                    <i className="fa-solid fa-arrow-left" /> Return to Inquiries
                </Link>
            </div>
        );
    }

    const sourceLabel = current.source === 'contact_form' ? 'Contact Form' : 'Product Inquiry';

    return (
        <div>
            <div className={iStyles.headRow}>
                <button className={styles.actionBtnSecondary} style={{ padding: '8px 16px' }} onClick={() => navigate('/admin/inquiries')}>
                    <i className="fa-solid fa-arrow-left" /> Back
                </button>
                <div className={iStyles.navCluster}>
                    <Link
                        to={previous ? `/admin/inquiries/${previous.source}/${previous.id}` : '#'}
                        className={`${styles.actionBtnSecondary} ${!previous ? iStyles.disabledNav : ''}`}
                        style={{ padding: '8px 14px' }}
                        onClick={(e) => !previous && e.preventDefault()}
                    >
                        <i className="fa-solid fa-chevron-left" /> Prev
                    </Link>
                    <Link
                        to={next ? `/admin/inquiries/${next.source}/${next.id}` : '#'}
                        className={`${styles.actionBtnSecondary} ${!next ? iStyles.disabledNav : ''}`}
                        style={{ padding: '8px 14px' }}
                        onClick={(e) => !next && e.preventDefault()}
                    >
                        Next <i className="fa-solid fa-chevron-right" />
                    </Link>
                </div>
            </div>

            <div className={`${styles.card} ${styles.detailCard}`}>
                <div className={iStyles.detailHeader}>
                    <div>
                        <h2 className={iStyles.detailTitle}>{current.name || 'Anonymous Inquiry'}</h2>
                        <p className={iStyles.detailMeta}>
                            Date Received: {current.created_at ? new Date(current.created_at).toLocaleString('en-IN') : 'N/A'}
                        </p>
                    </div>
                    <span className={iStyles.sourceBadge}>
                        <i className="fa-solid fa-inbox" /> {sourceLabel}
                    </span>
                </div>

                <div className={iStyles.blocks}>
                    <section className={iStyles.block}>
                        <h3 className={iStyles.blockTitle}>Contact Details</h3>
                        <div className={iStyles.detailGrid}>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Email Address</span><span className={iStyles.detailVal}>{current.email || '—'}</span></div>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Phone Number</span><span className={iStyles.detailVal}>{current.phone || '—'}</span></div>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Company</span><span className={iStyles.detailVal}>{current.company || '—'}</span></div>
                        </div>
                    </section>

                    <section className={iStyles.block}>
                        <h3 className={iStyles.blockTitle}>Inquiry Details</h3>
                        <div className={iStyles.detailGrid}>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Product</span><span className={iStyles.detailVal}>{current.productName || current.product_name || '—'}</span></div>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Inquiry Type</span><span className={iStyles.detailVal}>{current.inquiryType || current.inquiry_type || 'General Info'}</span></div>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Source</span><span className={iStyles.detailVal}>{current.source}</span></div>
                        </div>
                    </section>
                </div>

                <section className={iStyles.messageBox}>
                    <div className={iStyles.messageLabel}>Message Content</div>
                    <p>{current.message || 'No message content.'}</p>
                </section>

                <div className={iStyles.actionsRow}>
                    {current.email && (
                        <a href={`mailto:${current.email}?subject=Re: ${current.productName || 'Your Request'}`} className={styles.actionBtnPrimary}>
                            <i className="fa-solid fa-reply" /> Reply via Email
                        </a>
                    )}
                    {current.phone && (
                        <a
                            href={`https://wa.me/${current.phone.replace(/\D/g, '')}?text=Hi ${current.name}, thank you for reaching out to us...`}
                            className={`${styles.actionBtnSecondary} ${styles.whatsappBtn}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fa-brands fa-whatsapp" /> WhatsApp
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}