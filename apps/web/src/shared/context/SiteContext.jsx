import { createContext, useContext, useEffect, useState } from 'react'

const SiteContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export function useSite() {
    return useContext(SiteContext)
}

export function SiteProvider({ children }) {
    const [company, setCompany] = useState({})
    const [cms, setCms] = useState({})
    const [ready, setReady] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const pf = window.__prefetch || {}
        const company  = pf.company  || fetch('/api/company').then(r => r.json()).catch(() => ({}))
        const content  = pf.content  || fetch('/api/content').then(r => r.json()).catch(() => ({}))
        Promise.all([company, content]).then(([co, cm]) => {
            setCompany(co || {})
            const flat = {}
            Object.entries(cm || {}).forEach(([k, v]) => {
                flat[k] = typeof v === 'object' && v !== null ? (v.value ?? v) : v
            })
            setCms(flat)
        }).finally(() => setReady(true))
    }, [])

    // Helper: get CMS value with fallback
    const c = (key, fallback = '') => cms[key] || fallback
    // Helper: get company value with fallback
    const co = (key, fallback = '') => company[key] || fallback

    return (
        <SiteContext.Provider value={{ company, cms, c, co, ready, mobileMenuOpen, setMobileMenuOpen }}>
            {children}
        </SiteContext.Provider>
    )
}
