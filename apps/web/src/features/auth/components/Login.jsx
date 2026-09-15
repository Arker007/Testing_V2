import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSite } from '../../../shared/context/SiteContext';
import { Input, Button, Alert, Card, CardContent } from '@/shared/ui';
import styles from '../styles/Login.module.css';

import { AuthService } from '../services/auth.service';

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

        AuthService.me(token)
            .then((res) => {
                if (res) {
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
            const data = await AuthService.login(form.username, form.password);
            if (data && data.token) {
                localStorage.setItem('admin_token', data.token);
                navigate('/admin/dashboard', { replace: true });
            } else {
                setError(data.message || data.error || 'Invalid gateway parameters provided.');
            }
        } catch (err) {
            setError(err.message || 'Connection failure encountered with validation firewall.');
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
                                <Icon icon="carbon:certificate" className="text-emerald-500 w-4 h-4" />
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right credentials input workspace view */}
            <div className={styles.formPanel}>
                <div className={styles.formWrap}>
                    <Card variant="elevated" className="border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                        <CardContent className="p-8">
                            <h2 className={styles.formTitle}>Terminal Sign In</h2>
                            <p className={styles.formSub}>Provide access variables to open connection</p>

                            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                                <div className="space-y-1.5">
                                    <label htmlFor="login-username" className="block text-xs font-semibold text-[var(--text-primary)]">
                                        Username Address
                                    </label>
                                    <Input
                                        id="login-username"
                                        type="text"
                                        placeholder="Enter authorization user..."
                                        required
                                        value={form.username}
                                        onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                        leftIcon="carbon:user"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="login-password" className="block text-xs font-semibold text-[var(--text-primary)]">
                                        Password Cipher
                                    </label>
                                    <Input
                                        id="login-password"
                                        type={showPw ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        required
                                        value={form.password}
                                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                        leftIcon="carbon:password"
                                        rightIcon={
                                            <button
                                                type="button"
                                                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                                                onClick={() => setShowPw(v => !v)}
                                                tabIndex={-1}
                                                aria-label={showPw ? "Hide password" : "Show password"}
                                            >
                                                <Icon icon={showPw ? "carbon:view-off" : "carbon:view"} className="w-4 h-4" />
                                            </button>
                                        }
                                    />
                                </div>

                                {error && (
                                    <Alert status="danger" variant="subtle" className="text-xs">
                                        {error}
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={loading}
                                    loadingText="Resolving Verification..."
                                    className="w-full mt-2"
                                    icon={<Icon icon="carbon:login" className="w-4 h-4 mr-1.5 inline" />}
                                >
                                    Connect Node
                                </Button>
                            </form>

                            <p className={`${styles.back} mt-6`}>
                                <Link to="/" className="inline-flex items-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                    <Icon icon="carbon:arrow-left" className="w-4 h-4 mr-1" /> Back to Website
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}