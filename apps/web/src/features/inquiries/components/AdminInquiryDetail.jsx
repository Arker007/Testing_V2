import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from '../../admin/styles/AdminTable.module.css';
import iStyles from '../styles/Inquiries.module.css';
import { normalizeInquiry } from '../../../shared/utils/parsers';
import { Spinner, EmptyState, WhatsAppButton, BackHeader } from "@/shared/ui";

export default function AdminInquiryDetail() {
    const { source, id } = useParams();
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
            <div className="py-12 flex items-center justify-center">
                <Spinner label="Loading inquiry details..." size="lg" />
            </div>
        );
    }

    if (!current) {
        return (
            <EmptyState
                icon="solar:inbox-line-linear"
                title="Inquiry Not Found"
                description="The requested inquiry does not exist or has been deleted."
                action={
                    <Link to="/admin/inquiries" className={styles.actionBtnSecondary}>
                        <Icon icon="solar:arrow-left-linear" className="w-4 h-4 mr-1 inline" /> Return to Inquiries
                    </Link>
                }
            />
        );
    }

    const sourceLabel = current.source === 'contact_form' ? 'Contact Form' : 'Product Inquiry';

    return (
        <div>
            <BackHeader
                to="/admin/inquiries"
                backLabel="Back to Inquiries"
                title={current.name || 'Anonymous Inquiry'}
                subtitle={`Date Received: ${current.created_at ? new Date(current.created_at).toLocaleString('en-IN') : 'N/A'}`}
                actions={
                    <div className={iStyles.navCluster}>
                        <Link
                            to={previous ? `/admin/inquiries/${previous.source}/${previous.id}` : '#'}
                            className={`${styles.actionBtnSecondary} ${!previous ? iStyles.disabledNav : ''}`}
                            style={{ padding: '8px 14px' }}
                            onClick={(e) => !previous && e.preventDefault()}
                        >
                            <Icon icon="solar:alt-arrow-left-linear" className="w-4 h-4 mr-1 inline" /> Prev
                        </Link>
                        <Link
                            to={next ? `/admin/inquiries/${next.source}/${next.id}` : '#'}
                            className={`${styles.actionBtnSecondary} ${!next ? iStyles.disabledNav : ''}`}
                            style={{ padding: '8px 14px' }}
                            onClick={(e) => !next && e.preventDefault()}
                        >
                            Next <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 ml-1 inline" />
                        </Link>
                    </div>
                }
            />

            <div className={`${styles.card} ${styles.detailCard}`}>
                <div className={iStyles.detailHeader}>
                    <div>
                        <span className={iStyles.sourceBadge}>
                            <Icon icon="solar:inbox-linear" className="w-4 h-4 mr-1 inline text-emerald-500" /> {sourceLabel}
                        </span>
                    </div>
                </div>

                <div className={iStyles.blocks}>
                    <section className={iStyles.block}>
                        <h2 className={iStyles.blockTitle}>Contact Details</h2>
                        <div className={iStyles.detailGrid}>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Email Address</span><span className={iStyles.detailVal}>{current.email || '—'}</span></div>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Phone Number</span><span className={iStyles.detailVal}>{current.phone || '—'}</span></div>
                            <div className={iStyles.detailRow}><span className={iStyles.detailKey}>Company</span><span className={iStyles.detailVal}>{current.company || '—'}</span></div>
                        </div>
                    </section>

                    <section className={iStyles.block}>
                        <h2 className={iStyles.blockTitle}>Inquiry Details</h2>
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
                            <Icon icon="solar:reply-linear" className="w-4 h-4 mr-1.5 inline" /> Reply via Email
                        </a>
                    )}
                    {current.phone && (
                        <WhatsAppButton
                            phone={current.phone}
                            text={`Hi ${current.name}, thank you for reaching out to us...`}
                            label="WhatsApp"
                            variant="subtle"
                            size="md"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}