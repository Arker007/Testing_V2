import React from "react";
import { useSite } from "../../shared/context/SiteContext";
import styles from "./home.module.css";

function CatLogo() {
  return (
    <svg viewBox="0 0 135 34" className={styles.logoSvg} aria-label="Caterpillar" role="img">
      <title>Caterpillar</title>
      <g fill="currentColor">
        {/* C */}
        <path d="M 12 6 C 3.7 6 0 11.5 0 17 C 0 22.5 3.7 28 12 28 C 18 28 21.5 24.5 22.5 21.5 L 16.5 21.5 C 15.8 23 14.2 24 12 24 C 7.5 24 5.5 20 5.5 17 C 5.5 14 7.5 10 12 10 C 14.2 10 15.8 11 16.5 12.5 L 22.5 12.5 C 21.5 9.5 18 6 12 6 Z" />
        {/* A */}
        <path d="M 33 6 L 24 28 L 29.5 28 L 31.2 23.5 L 38.8 23.5 L 40.5 28 L 46 28 L 37 6 Z M 35 11 L 37.6 19.5 L 32.4 19.5 Z" />
        {/* T */}
        <path d="M 46 6 L 46 10 L 52 10 L 52 28 L 57.5 28 L 57.5 10 L 63.5 10 L 63.5 6 Z" />
      </g>
      {/* Iconic CAT Yellow Triangle */}
      <polygon points="31,28 41,28 36,20" fill="#FFCD00" />
      <text x="68" y="24" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="12" fontWeight="800" fill="currentColor" letterSpacing="1.2">
        CATERPILLAR
      </text>
    </svg>
  );
}

function KomatsuLogo() {
  return (
    <svg viewBox="0 0 130 34" className={styles.logoSvg} aria-label="Komatsu" role="img">
      <title>Komatsu</title>
      <text x="0" y="25" fontFamily="'Arial Black', 'Impact', sans-serif" fontSize="22" fontWeight="900" fill="currentColor" letterSpacing="2">
        KOMATSU
      </text>
    </svg>
  );
}

function VolvoLogo() {
  return (
    <svg viewBox="0 0 120 34" className={styles.logoSvg} aria-label="Volvo" role="img">
      <title>Volvo</title>
      <circle cx="15" cy="17" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="23" y1="9" x2="28" y2="4" stroke="currentColor" strokeWidth="2.5" />
      <polygon points="23,4 29,4 29,10" fill="currentColor" />
      <text x="36" y="24" fontFamily="'Times New Roman', 'Georgia', serif" fontSize="19" fontWeight="800" fill="currentColor" letterSpacing="2.5">
        VOLVO
      </text>
    </svg>
  );
}

function JohnDeereLogo() {
  return (
    <svg viewBox="0 0 145 34" className={styles.logoSvg} aria-label="John Deere" role="img">
      <title>John Deere</title>
      <rect x="1" y="3" width="28" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 8 21 C 10 19 13 15 17 13 C 20 12 22 11 21 9 C 19 10 18 11 16 11 C 15 9 17 7 19 6 C 17 6 15 8 14 10 C 12 12 11 15 8 17 Z" fill="currentColor" />
      <text x="36" y="22" fontFamily="'Arial', sans-serif" fontSize="13.5" fontWeight="800" fill="currentColor" letterSpacing="0.8">
        JOHN DEERE
      </text>
    </svg>
  );
}

function JcbLogo() {
  return (
    <svg viewBox="0 0 80 34" className={styles.logoSvg} aria-label="JCB" role="img">
      <title>JCB</title>
      <rect x="0" y="3" width="80" height="28" rx="4" fill="#F5A623" />
      <text x="10" y="25" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="23" fontWeight="900" fill="#000000" letterSpacing="1.8">
        JCB
      </text>
    </svg>
  );
}

function LiebherrLogo() {
  return (
    <svg viewBox="0 0 130 34" className={styles.logoSvg} aria-label="Liebherr" role="img">
      <title>Liebherr</title>
      <text x="0" y="24" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="18" fontWeight="900" fill="currentColor" letterSpacing="1.8">
        LIEBHERR
      </text>
    </svg>
  );
}

function HitachiLogo() {
  return (
    <svg viewBox="0 0 120 34" className={styles.logoSvg} aria-label="Hitachi" role="img">
      <title>Hitachi</title>
      <text x="0" y="24" fontFamily="'Arial Black', sans-serif" fontSize="18" fontWeight="900" fill="currentColor" letterSpacing="2">
        HITACHI
      </text>
    </svg>
  );
}

function TataLogo() {
  return (
    <svg viewBox="0 0 95 34" className={styles.logoSvg} aria-label="Tata" role="img">
      <title>Tata</title>
      <text x="0" y="24" fontFamily="'Arial Black', sans-serif" fontSize="19" fontWeight="900" fill="currentColor" letterSpacing="2.5">
        TATA
      </text>
    </svg>
  );
}

export default function TrustedBySection() {
  const { c } = useSite();

  if (c("show_trusted_by", "1") === "0") return null;

  const companyLogos = [
    { id: "cat", Component: CatLogo, name: "Caterpillar" },
    { id: "komatsu", Component: KomatsuLogo, name: "Komatsu" },
    { id: "volvo", Component: VolvoLogo, name: "Volvo Construction" },
    { id: "deere", Component: JohnDeereLogo, name: "John Deere" },
    { id: "jcb", Component: JcbLogo, name: "JCB" },
    { id: "liebherr", Component: LiebherrLogo, name: "Liebherr" },
    { id: "hitachi", Component: HitachiLogo, name: "Hitachi" },
    { id: "tata", Component: TataLogo, name: "Tata Hitachi" }
  ];

  return (
    <section className={styles.trustedBy}>
      <div className="container">
        <h6 className={styles.trustedHeading}>
          {c("trusted_title", "Trusted by Leading Brands & Industries")}
        </h6>
        <div className={styles.logoRow}>
          {companyLogos.map((item) => {
            const Logo = item.Component;
            return (
              <div key={item.id} className={styles.logoBadge} title={item.name} aria-label={item.name}>
                <Logo />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

