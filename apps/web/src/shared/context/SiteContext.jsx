import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const SiteContext = createContext({})
// eslint-disable-next-line react-refresh/only-export-components
export const SiteUIContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export function useSite() {
    return useContext(SiteContext)
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteUI() {
    return useContext(SiteUIContext)
}

export function SiteProvider({ children }) {
    const [company, setCompany] = useState({})
    const [cms, setCms] = useState({})
    const [ready, setReady] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const pf = window.__prefetch || {}
        const companyPromise = pf.company || fetch('/api/company').then(r => r.json()).catch(() => ({}))
        const contentPromise = pf.content || fetch('/api/content').then(r => r.json()).catch(() => ({}))
        Promise.all([companyPromise, contentPromise]).then(([co, cm]) => {
            setCompany(co || {})
            const flat = {}
            Object.entries(cm || {}).forEach(([k, v]) => {
                flat[k] = typeof v === 'object' && v !== null ? (v.value ?? v) : v
            })
            setCms(flat)
        }).finally(() => setReady(true))
    }, [])

    // Helper: get CMS value with fallback
    const c = useCallback((key, fallback = '') => cms[key] || fallback, [cms])
    // Helper: get company value with fallback
    const co = useCallback((key, fallback = '') => company[key] || fallback, [company])

    const uiValue = useMemo(() => ({
        mobileMenuOpen,
        setMobileMenuOpen
    }), [mobileMenuOpen])

    const value = useMemo(() => ({
        company,
        cms,
        c,
        co,
        ready,
        mobileMenuOpen,
        setMobileMenuOpen
    }), [company, cms, c, co, ready, mobileMenuOpen])

    return (
        <SiteUIContext.Provider value={uiValue}>
            <SiteContext.Provider value={value}>
                {children}
            </SiteContext.Provider>
        </SiteUIContext.Provider>
    )
}

