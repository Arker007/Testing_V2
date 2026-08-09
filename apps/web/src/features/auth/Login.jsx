import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../../shared/context/SiteContext';
import styles from './Login.module.css';

export default function AdminLogin() {
    const { co } = useSite();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) return;

        fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (res.ok) {
                    navigate('/admin/dashboard', { replace: true });
                    return;
                }
                localStorage.removeItem('admin_token');
            })
            .catch(() => {
                localStorage.removeItem('admin_token');
            });
    }, [navigate]);

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem('admin_token', data.token);
                navigate('/admin/dashboard', { replace: true });
            } else {
                setError(data.message || data.error || 'Invalid gateway parameters provided.');
            }
        } catch {
            setError('Connection failure encountered with validation firewall.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            {/* Left brand showcase panel view */}
            <div className={styles.brand}>
                <div className={styles.brandBg} />
                <div className={styles.brandContent}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>{co("name", "VISHAL ENTERPRISE").charAt(0).toUpperCase()}</div>
                        <div>
                            <div className={styles.logoName}>{co("name", "VISHAL ENTERPRISE")}</div>
                            <div className={styles.logoSub}>Control Terminal</div>
                        </div>
                    </div>
                    <h1 className={styles.brandTitle}>Operations Center</h1>
                    <p className={styles.brandDesc}>Sync configuration profiles, monitor incoming inquiries, and manage enterprise material catalogs.</p>
                    <div className={styles.features}>
                        {['Recycled Pallet Inventory Matrices', 'B2B Inquiry Live Streams', 'Taxonomy Architecture Controls', 'High-Fidelity Diagnostics'].map(f => (
                            <div key={f} className={styles.feature}>
                                <i className="fa-solid fa-circle-check" />
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right credentials input workspace view */}
            <div className={styles.formPanel}>
                <div className={styles.formWrap}>
                    <h2 className={styles.formTitle}>Terminal Sign In</h2>
                    <p className={styles.formSub}>Provide access variables to open connection</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className="form-group">
                            <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Username Address</label>
                            <div className={styles.inputWrap}>
                                <i className={`fa-solid fa-user ${styles.inputIcon}`} />
                                <input
                                    className={styles.paddedInput}
                                    type="text"
                                    placeholder="Enter authorization user..."
                                    required
                                    value={form.username}
                                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ fontWeight: 600, fontSize: '13px', display: 'block', marginBottom: '6px' }}>Password Cipher</label>
                            <div className={styles.inputWrap}>
                                <i className={`fa-solid fa-lock ${styles.inputIcon}`} />
                                <input
                                    className={styles.brandInput || styles.paddedInput}
                                    type={showPw ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    required
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                />
                                <button type="button" className={styles.eye} onClick={() => setShowPw(v => !v)}>
                                    <i className={`fa-solid ${showPw ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className={styles.errorBox}>
                                <i className="fa-solid fa-triangle-exclamation" /> {error}
                            </div>
                        )}

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? <><i className="fa-solid fa-spinner fa-spin" /> Resolving Verification...</> : <><i className="fa-solid fa-right-to-bracket" /> Connect Node</>}
                        </button>
                    </form>

                    <p className={styles.back}>
                        <a href="/"><i className="fa-solid fa-arrow-left" /> Back to Website</a>
                    </p>
                </div>
            </div>
        </div>
    );
}