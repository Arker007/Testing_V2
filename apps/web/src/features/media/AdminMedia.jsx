import { useEffect, useState, useCallback } from 'react';
import styles from '../admin/components/AdminTable.module.css';
import mStyles from './Media.module.css';

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
                    {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading...</> : <><i className="fa-solid fa-upload" /> Upload Assets</>}
                </label>
            </div>

            <div className={mStyles.splitLayout}>
                {/* Left Folder Directory Menu */}
                <aside className={mStyles.folderTree}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', margin: '4px 8px 8px' }}>
                        Directories
                    </div>
                    {[
                        { id: 'all', label: 'All Uploads', icon: 'fa-folder-open' },
                        { id: 'pallets', label: 'pallets/', icon: 'fa-folder' },
                        { id: 'lumber', label: 'lumber/', icon: 'fa-folder' },
                        { id: 'garden-bench', label: 'garden-bench/', icon: 'fa-folder' },
                        { id: 'general', label: 'general/', icon: 'fa-folder' },
                    ].map(f => {
                        const count = media.filter(m => f.id === 'all' || getFileCategory(m.url) === f.id).length;
                        return (
                            <div
                                key={f.id}
                                className={`${mStyles.folderNode} ${activeCategory === f.id ? mStyles.folderNodeActive : ''}`}
                                onClick={() => setActiveCategory(f.id)}
                            >
                                <span>
                                    <i className={`fa-solid ${f.icon}`} style={{ marginRight: 6, color: activeCategory === f.id ? 'var(--brand-dark)' : 'var(--gray-300)' }} />
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
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={mStyles.skele} />)}
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className={styles.card} style={{ width: '100%' }}>
                            <div className={styles.empty}>
                                <i className="fa-solid fa-photo-film" />
                                <p>No media files found in this directory folder.</p>
                                <label className={styles.actionBtnPrimary} style={{ cursor: 'pointer', marginTop: '12px' }}>
                                    <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} />
                                    <i className="fa-solid fa-upload" /> Upload Files
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div className={mStyles.grid}>
                            {filteredMedia.map(m => (
                                <div key={m.id} className={mStyles.card}>
                                    <div className={mStyles.imgWrap}>
                                        <img src={m.url} alt={m.filename} onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                        <div className={mStyles.fallback} style={{ display: 'none' }}><i className="fa-solid fa-image" /></div>
                                    </div>
                                    <div className={mStyles.info}>
                                        <div className={mStyles.filename} title={m.filename}>{m.filename}</div>
                                        <div className={mStyles.url} title={m.url}>{m.url}</div>
                                        <button className={mStyles.copyBtn} onClick={() => copyUrl(m.url)}>
                                            <i className={`fa-solid ${copied === m.url ? 'fa-check' : 'fa-copy'}`} />
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