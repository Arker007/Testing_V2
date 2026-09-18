import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSite } from '../../../shared/context/SiteContext';
import { Input, Button, Alert, FormField, Checkbox } from '@/shared/ui';
import styles from '../styles/Login.module.css';
import { AuthService } from '../services/auth.service';

export default function AdminLogin() {
    const { co } = useSite();
    const [form, setForm] = useState({ username: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const navigate = useNavigate();

    const companyName = co?.("name", "VISHAL ENTERPRISE") || "VISHAL ENTERPRISE";

    useEffect(() => {
        // Pre-fill remembered username if previously saved
        const savedUser = localStorage.getItem('admin_remembered_username');
        if (savedUser) {
            setForm(prev => ({ ...prev, username: savedUser }));
            setRememberMe(true);
        }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await AuthService.login(form.username.trim(), form.password);
            if (data && data.token) {
                localStorage.setItem('admin_token', data.token);
                if (rememberMe) {
                    localStorage.setItem('admin_remembered_username', form.username.trim());
                } else {
                    localStorage.removeItem('admin_remembered_username');
                }
                navigate('/admin/dashboard', { replace: true });
            } else {
                setError(data?.message || data?.error || 'Invalid username or password. Please verify your credentials.');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed. Please check your credentials or network connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleFillDemo = () => {
        setForm({ username: 'admin', password: 'admin123' });
        setError('');
    };

    return (
        <div className={styles.page}>
            {/* Left Brand & Platform Showcase Panel */}
            <aside className={styles.brand} aria-label="Brand Overview">
                <div className={styles.brandGrid} />
                <div className={styles.brandGlow} />
                <div className={styles.brandGlowSecondary} />

                <div className={styles.brandContent}>
                    {/* Top Identity */}
                    <div className={styles.brandTop}>
                        <div className={styles.brandLogoIcon}>
                            {companyName.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.brandLogoText}>
                            <span className={styles.brandName}>{companyName}</span>
                            <span className={styles.brandTagline}>Operations & Administration</span>
                        </div>
                    </div>

                    {/* Authority Tag & Hero Headline */}
                    <div className={styles.brandBadge}>
                        <Icon icon="carbon:security" className="w-3.5 h-3.5" />
                        <span>Authorized Access Only</span>
                    </div>

                    <h1 className={styles.brandHeadline}>
                        Enterprise Polymer <br />
                        <span className={styles.brandHeadlineAccent}>Management Console</span>
                    </h1>

                    <p className={styles.brandDescription}>
                        Centralized control for industrial pallet inventories, technical specifications, incoming wholesale inquiries, and production lead tracking.
                    </p>

                    {/* Operational Highlights */}
                    <div className={styles.featureList}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIconWrap}>
                                <Icon icon="carbon:box" className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={styles.featureTitle}>Catalog & Inventory Control</div>
                                <div className={styles.featureDesc}>
                                    Real-time matrix for heavy-duty pallets, structural lumber, and outdoor municipal seating.
                                </div>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIconWrap}>
                                <Icon icon="carbon:email" className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={styles.featureTitle}>Direct RFQ & Inquiry Dispatch</div>
                                <div className={styles.featureDesc}>
                                    Instant review and response workflow for customer quote requests and custom tooling inquiries.
                                </div>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <div className={styles.featureIconWrap}>
                                <Icon icon="carbon:password" className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={styles.featureTitle}>Audit-Grade Security</div>
                                <div className={styles.featureDesc}>
                                    Encrypted session authentication, IP rate-limiting, and protected administrative endpoints.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Trust & Status Section */}
                <div className={styles.brandFooter}>
                    <div className={styles.statusIndicator}>
                        <span className={styles.pulseDot} />
                        <span>System Status: All services operational</span>
                    </div>
                    <div className={styles.complianceText}>
                        <Icon icon="carbon:locked" className="w-3.5 h-3.5" />
                        <span>256-Bit SSL Encrypted • ISO 9001:2015 Manufacturing Standard</span>
                    </div>
                </div>
            </aside>

            {/* Right Authentication Form Panel */}
            <main className={styles.formPanel}>
                {/* Top Nav Bar */}
                <header className={styles.formTopBar}>
                    <Link to="/" className={styles.backLink} title="Return to public website">
                        <Icon icon="carbon:arrow-left" className="w-4 h-4" />
                        <span>Back to Website</span>
                    </Link>
                    <span className={styles.securityBadge}>
                        <Icon icon="carbon:locked" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Admin Gateway</span>
                    </span>
                </header>

                {/* Center Form Card */}
                <div className={styles.cardWrap}>
                    <div className={styles.authCard}>
                        <div className={styles.formHeader}>
                            <span className={styles.headerTag}>Portal Authentication</span>
                            <h2 className={styles.formTitle}>Welcome Back</h2>
                            <p className={styles.formSubtitle}>
                                Sign in with your administrative credentials to manage your enterprise operations.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.authForm}>
                            {/* Username Field */}
                            <FormField label="Username or Email" htmlFor="login-username" required>
                                <Input
                                    id="login-username"
                                    type="text"
                                    size="md"
                                    placeholder="e.g. admin"
                                    required
                                    autoFocus
                                    autoComplete="username"
                                    value={form.username}
                                    onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                                    leftIcon="carbon:user"
                                />
                            </FormField>

                            {/* Password Field */}
                            <FormField label="Password" htmlFor="login-password" required>
                                <Input
                                    id="login-password"
                                    type={showPw ? 'text' : 'password'}
                                    size="md"
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                    leftIcon="carbon:password"
                                    rightIcon={
                                        <button
                                            type="button"
                                            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                                            onClick={() => setShowPw((v) => !v)}
                                            tabIndex={-1}
                                            aria-label={showPw ? 'Hide password' : 'Show password'}
                                        >
                                            <Icon
                                                icon={showPw ? 'carbon:view-off' : 'carbon:view'}
                                                className="w-4 h-4"
                                            />
                                        </button>
                                    }
                                />
                            </FormField>

                            {/* Utility Options Row: Remember Me */}
                            <div className={styles.optionsRow}>
                                <Checkbox
                                    id="login-remember"
                                    size="sm"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    label={<span className="text-xs text-[var(--text-secondary)] font-medium">Remember username</span>}
                                />
                                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                                    Encrypted TLS 1.3
                                </span>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <Alert status="danger" variant="subtle" className="text-xs py-2.5">
                                    <div className="flex items-start gap-1.5">
                                        <Icon icon="carbon:warning" className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </div>
                                </Alert>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                loading={loading}
                                loadingText="Authenticating..."
                                className={`w-full font-bold shadow-sm ${styles.submitBtn}`}
                                icon={<Icon icon="carbon:login" className="w-4 h-4 mr-1.5 inline" />}
                            >
                                Sign In to Admin Console
                            </Button>
                        </form>

                        {/* Demo Helper Pill */}
                        <div className={styles.demoAssistant}>
                            <div className={styles.demoInfo}>
                                <span className={styles.demoLabel}>
                                    <Icon icon="carbon:key" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                                    Default Access Credentials
                                </span>
                                <span className={styles.demoCreds}>
                                    Username: <strong>admin</strong> • Pass: <strong>admin123</strong>
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleFillDemo}
                                className={styles.fillDemoBtn}
                                title="Quickly fill test credentials"
                            >
                                <Icon icon="carbon:magic-wand" className="w-3 h-3" />
                                Auto-Fill
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal / Security Notice */}
                <footer className={styles.panelFooter}>
                    <p className={styles.disclaimer}>
                        This administrative portal is restricted to authorized personnel of {companyName}.
                        All authentication events and access requests are logged and monitored for compliance.
                    </p>
                </footer>
            </main>
        </div>
    );
}
