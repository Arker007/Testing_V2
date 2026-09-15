import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from '../../admin/styles/AdminTable.module.css';
import iStyles from '../styles/Inquiries.module.css';
import { normalizeInquiry } from '../../../shared/utils/parsers';
import {
    AdminPageHeader,
    EmptyState,
    ConfirmDialog,
    WhatsAppButton,
    Spinner,
    Badge,
    Button,
    CustomSelect,
} from "@/shared/ui";

import { InquiryService } from '../services/inquiry.service';

export default function AdminInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [search, setSearch] = useState('');
    const [sourceFilter, setSourceFilter] = useState('all');
    const [activeItem, setActiveItem] = useState(null);

    const load = useCallback(() => {
        setLoading(true);
        const token = localStorage.getItem('admin_token');
        InquiryService.getAll(token)
            .then(d => setInquiries(Array.isArray(d) ? d : d.inquiries || []))
            .catch(() => setInquiries([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        const { id } = itemToDelete;
        setDeleting(id);
        try {
            const token = localStorage.getItem('admin_token');
            // The API expects /inquiries/:id but legacy frontend used /inquiries/:source/:id
            // the router in api/app.js routes `/api/inquiries/:id` properly.
            await InquiryService.delete(id, token);
            load();
        } catch { alert('Delete failed'); }
        finally {
            setDeleting(null);
            setItemToDelete(null);
        }
    };

    const filteredInquiries = inquiries.filter((inq) => {
        const norm = normalizeInquiry(inq);
        const term = search.trim().toLowerCase();
        const combinedText = [norm.name, norm.email, norm.phone, norm.message, norm.productName, norm.product_name, norm.company]
            .filter(Boolean).join(' ').toLowerCase();

        return (!term || combinedText.includes(term)) && (sourceFilter === 'all' || norm.source === sourceFilter);
    }).map(normalizeInquiry);

    return (
        <div>
            <AdminPageHeader
                title="Client Inquiries"
                count={filteredInquiries.length}
                countLabel="inquiries"
                search={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                onSearchClear={() => setSearch('')}
                searchPlaceholder="Search client inquiries..."
                filter={
                    <div className="w-56">
                        <CustomSelect
                            options={[
                                { value: 'all', label: 'All Channels' },
                                { value: 'contact_form', label: 'Contact Form' },
                                { value: 'product_inquiry', label: 'Product Inquiries' },
                            ]}
                            value={sourceFilter}
                            onChange={(val) => setSourceFilter(val)}
                            placeholder="All Channels"
                        />
                    </div>
                }
            />

            <div className={styles.card}>
                <div className={styles.thead} style={{ gridTemplateColumns: '2fr 1.5fr 1.4fr 1fr 120px' }}>
                    <span>Client / Message</span><span>Contact Info</span><span>Context Origin</span><span>Date</span><span style={{ textAlign: 'center' }}>Actions</span>
                </div>

                {loading ? [1, 2, 3, 4].map(i => <div key={i} className={styles.skeleRow} />) :
                    filteredInquiries.length === 0 ? (
                        <EmptyState
                            icon="carbon:email-new"
                            title="No matching inquiries found"
                            description="Try adjusting your search terms or filter selection."
                            size="sm"
                        />
                    ) : filteredInquiries.map(inq => (
                        <div 
                            key={inq.id} 
                            className={`${styles.trow} ${activeItem?.id === inq.id && activeItem?.source === inq.source ? styles.trowActive || '' : ''}`} 
                            style={{ gridTemplateColumns: '2fr 1.5fr 1.4fr 1fr 120px', cursor: 'pointer' }}
                            onClick={(e) => {
                                if (e.target.closest('a') || e.target.closest('button')) return;
                                setActiveItem(inq);
                            }}
                        >
                            <div className={iStyles.nameCell}>
                                <div className={styles.prodName}>{inq.name || '—'}</div>
                                <div className={iStyles.previewText}>
                                    {inq.message || 'No text snippet provided.'}
                                </div>
                                <div className={iStyles.metaLine}>
                                    {inq.phone && <span><Icon icon="carbon:phone" className="w-3.5 h-3.5 inline mr-1" /> {inq.phone}</span>}
                                    {inq.company && <span><Icon icon="carbon:industry" className="w-3.5 h-3.5 inline mr-1" /> {inq.company}</span>}
                                </div>
                            </div>
                            <div className={iStyles.contactCell}>
                                <div className={iStyles.fieldLabel}>Email</div>
                                <div className={styles.muted} style={{ fontSize: '0.8125rem' }}>{inq.email || '—'}</div>
                            </div>
                            <div className={iStyles.productCell}>
                                <span className={iStyles.productName}>{inq.productName || inq.product_name || '—'}</span>
                                <Badge
                                    variant={inq.source === 'contact_form' ? 'brand' : 'neutral'}
                                    size="sm"
                                >
                                    {inq.source === 'contact_form' ? 'General Form' : 'B2B Product Asset'}
                                </Badge>
                            </div>
                            <div className={iStyles.dateCell}>
                                <span className={styles.muted}>{inq.created_at ? new Date(inq.created_at).toLocaleDateString('en-IN') : '—'}</span>
                            </div>
                            <div className={styles.rowActions} style={{ justifyContent: 'center' }}>
                                <Link to={`/admin/inquiries/${inq.source}/${inq.id}`} title="View Inquiry">
                                    <Button variant="ghost" size="sm" className="!p-1.5 !h-auto text-slate-500 hover:text-slate-800">
                                        <Icon icon="carbon:view" className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="!p-1.5 !h-auto text-rose-500 hover:text-rose-700 hover:bg-rose-500/10"
                                    onClick={() => setItemToDelete({ id: inq.id, source: inq.source })}
                                    disabled={deleting === inq.id}
                                    title="Delete Inquiry"
                                >
                                    {deleting === inq.id ? <Spinner size="sm" /> : <Icon icon="carbon:trash-can" className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmDialog
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Inquiry?"
                message="Are you sure you want to delete this inquiry permanently? This action cannot be undone."
                confirmText="Delete"
                loading={!!deleting}
            />

            {/* Right Slide Preview Drawer */}
            <div className={`${styles.previewDrawer} ${activeItem ? styles.previewDrawerActive : ''}`}>
                <div className={styles.drawerHeader}>
                    <h2 className={styles.drawerTitle}>Inquiry Details</h2>
                    <button className={styles.drawerCloseBtn} onClick={() => setActiveItem(null)}>
                        <Icon icon="carbon:close-outline" className="w-5 h-5" />
                    </button>
                </div>
                {activeItem && (
                    <div className={styles.drawerBody}>
                        <div>
                            <span className={styles.drawerLabel}>Client Name</span>
                            <div className={styles.drawerValue} style={{ fontSize: '1.05rem', fontWeight: '700', marginTop: 4 }}>
                                {activeItem.name || 'Anonymous Inquiry'}
                            </div>
                        </div>
                        {activeItem.company && (
                            <div>
                                <span className={styles.drawerLabel}>Company</span>
                                <div className={styles.drawerValue} style={{ marginTop: 4 }}>{activeItem.company}</div>
                            </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <span className={styles.drawerLabel}>Email</span>
                                <div className={styles.drawerValue} style={{ marginTop: 4, fontSize: '0.8rem', wordBreak: 'break-all' }}>
                                    <a href={`mailto:${activeItem.email}`} style={{ color: 'var(--brand-dark)' }}>{activeItem.email}</a>
                                </div>
                            </div>
                            <div>
                                <span className={styles.drawerLabel}>Phone</span>
                                <div className={styles.drawerValue} style={{ marginTop: 4, fontSize: '0.8rem' }}>
                                    {activeItem.phone ? (
                                        <a href={`tel:${activeItem.phone}`} style={{ color: 'var(--brand-dark)' }}>{activeItem.phone}</a>
                                    ) : '—'}
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className={styles.drawerLabel}>Source</span>
                            <div className={styles.drawerValue} style={{ marginTop: 4 }}>
                                <Badge
                                    variant={activeItem.source === 'contact_form' ? 'brand' : 'neutral'}
                                    size="sm"
                                >
                                    {activeItem.source === 'contact_form' ? 'Contact Form' : 'Product Page'}
                                </Badge>
                            </div>
                        </div>
                        {(activeItem.productName || activeItem.product_name) ? (
                            <div>
                                <span className={styles.drawerLabel}>Product</span>
                                <div className={styles.drawerValue} style={{ marginTop: 4 }}>
                                    {activeItem.productName || activeItem.product_name}
                                </div>
                            </div>
                        ) : null}
                        <div>
                            <span className={styles.drawerLabel}>Message</span>
                            <div className={styles.drawerValueTextarea} style={{ marginTop: 4 }}>
                                {activeItem.message || 'No message content.'}
                            </div>
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 12 }}>
                            {activeItem.phone && (
                                <WhatsAppButton
                                    phone={activeItem.phone}
                                    label="WhatsApp"
                                    variant="solid"
                                    size="sm"
                                    className="flex-1"
                                />
                            )}
                            <Button
                                variant="outline"
                                size="md"
                                style={{ flex: 1 }}
                                className="justify-center"
                                onClick={() => setActiveItem(null)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}