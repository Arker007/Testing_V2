import { useEffect, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import styles from '../../admin/styles/AdminTable.module.css';
import mStyles from '../styles/Media.module.css';
import { EmptyState, Skeleton } from "@/shared/ui";

const getFileCategory = (url) => {
    if (!url) return 'general';
    const lower = String(url).toLowerCase();
    if (lower.includes('pallet')) return 'pallets';
    if (lower.includes('lumber')) return 'lumber';
    if (lower.includes('bench') || lower.includes('garden')) return 'garden-bench';
    return 'general';
};

export default function AdminMedia() {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [copied, setCopied] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const load = useCallback(() => {
        setLoading(true);
        const headers = { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };
        fetch('/api/media', { headers }).then(r => r.json())
            .then(d => setMedia(d.media || []))
            .catch(() => setMedia([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleUpload = async e => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploading(true);
        const headers = { Authorization: `Bearer ${localStorage.getItem('admin_token')}` };
        const fd = new FormData();
        files.forEach(f => fd.append('images', f));
        try {
            const res = await fetch('/api/upload/images', {
                method: 'POST', headers,
                body: fd,
            });
            const data = await res.json();
            if (data.images) {
                await Promise.all(data.images.map(url =>
                    fetch('/api/media', {
                        method: 'POST',
                        headers: { ...headers, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ filename: url.split('/').pop(), url }),
                    })
                ));
                load();
            }
        } catch { alert('Upload failed'); }
        finally { setUploading(false); e.target.value = ''; }
    };

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(url);
        setTimeout(() => setCopied(null), 2000);
    };

    const filteredMedia = media.filter(m => {
        if (activeCategory === 'all') return true;
        return getFileCategory(m.url) === activeCategory;
    });

    return (
        <div>
            <div className={styles.toolbar}>
                <p className={styles.count}>
                    {filteredMedia.length} of {media.length} Files Uploaded
                </p>
                <label className={`${styles.actionBtnPrimary} ${uploading ? 'disabled' : ''}`} style={{ cursor: 'pointer' }}>
                    <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} />
                    {uploading ? <><Icon icon="solar:spinner-linear" className="w-4 h-4 animate-spin" /> Uploading...</> : <><Icon icon="solar:upload-track-2-linear" className="w-4 h-4 mr-1 inline" /> Upload Assets</>}
                </label>
            </div>

            <div className={mStyles.splitLayout}>
                {/* Left Folder Directory Menu */}
                <aside className={mStyles.folderTree}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', margin: '4px 8px 8px' }}>
                        Directories
                    </div>
                    {[
                        { id: 'all', label: 'All Uploads', icon: 'solar:folder-with-files-linear' },
                        { id: 'pallets', label: 'pallets/', icon: 'solar:folder-linear' },
                        { id: 'lumber', label: 'lumber/', icon: 'solar:folder-linear' },
                        { id: 'garden-bench', label: 'garden-bench/', icon: 'solar:folder-linear' },
                        { id: 'general', label: 'general/', icon: 'solar:folder-linear' },
                    ].map(f => {
                        const count = media.filter(m => f.id === 'all' || getFileCategory(m.url) === f.id).length;
                        return (
                            <div
                                key={f.id}
                                className={`${mStyles.folderNode} ${activeCategory === f.id ? mStyles.folderNodeActive : ''}`}
                                onClick={() => setActiveCategory(f.id)}
                            >
                                <span className="flex items-center gap-1.5">
                                    <Icon icon={f.icon} className="w-4 h-4" style={{ color: activeCategory === f.id ? 'var(--brand-dark)' : 'var(--gray-300)' }} />
                                    {f.label}
                                </span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', background: 'rgba(5, 40, 63, 0.04)', padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>
                                    {count}
                                </span>
                            </div>
                        );
                    })}
                </aside>

                {/* Right Asset Grid Canvas */}
                <main className={mStyles.canvas}>
                    {loading ? (
                        <div className={mStyles.grid}>
                            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-44 rounded-xl" />)}
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className={styles.card} style={{ width: '100%' }}>
                            <EmptyState
                                icon="solar:gallery-linear"
                                title="No media files found"
                                description="No media files found in this directory folder."
                                action={
                                    <label className={styles.actionBtnPrimary} style={{ cursor: 'pointer' }}>
                                        <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} />
                                        <Icon icon="solar:upload-track-2-linear" className="w-4 h-4 mr-1 inline" /> Upload Files
                                    </label>
                                }
                            />
                        </div>
                    ) : (
                        <div className={mStyles.grid}>
                            {filteredMedia.map(m => (
                                <div key={m.id} className={mStyles.card}>
                                    <div className={mStyles.imgWrap}>
                                        <img src={m.url} alt={m.filename} onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                        <div className={mStyles.fallback} style={{ display: 'none' }}><Icon icon="solar:gallery-linear" className="w-8 h-8 text-slate-400" /></div>
                                    </div>
                                    <div className={mStyles.info}>
                                        <div className={mStyles.filename} title={m.filename}>{m.filename}</div>
                                        <div className={mStyles.url} title={m.url}>{m.url}</div>
                                        <button className={mStyles.copyBtn} onClick={() => copyUrl(m.url)}>
                                            <Icon icon={copied === m.url ? "solar:check-read-linear" : "solar:copy-linear"} className="w-3.5 h-3.5 mr-1 inline" />
                                            {copied === m.url ? 'Copied!' : 'Copy URL'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}