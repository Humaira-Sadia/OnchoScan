import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" height={60} style={{ borderRadius: 8 }} />
        <span style={{ fontSize: 17, fontWeight: 700, color: scrolled ? '#0f172a' : '#fff', transition: 'color 0.3s ease' }}>
          Oncho<span style={{ color: scrolled ? '#0891b2' : '#38bdf8', transition: 'color 0.3s ease' }}>Scan</span>
        </span>
      </div>
      <div style={{
        background: scrolled ? 'rgba(8,145,178,0.1)' : 'rgba(56,189,248,0.12)',
        border: `1px solid ${scrolled ? 'rgba(8,145,178,0.3)' : 'rgba(56,189,248,0.3)'}`,
        borderRadius: 20, padding: '4px 12px',
        fontSize: 11, fontWeight: 500,
        color: scrolled ? '#0891b2' : '#7dd3fc',
        transition: 'all 0.3s ease',
      }}>
        Multimodal AI · M.Tech Research
      </div>
    </div>
  );
};