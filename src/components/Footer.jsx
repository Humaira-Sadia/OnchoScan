
const LINKS = [
  { label: 'About', href: '#' },
  { label: 'Research Paper', href: '#' },
  { label: 'Dataset (BUSI)', href: '#' },
  { label: 'GitHub', href: '#' },
];

const TECH = ['EfficientNet-B4', 'U-Net', 'MLP Fusion', 'React', 'Python'];

export const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-grid-overlay" />

      <div className="footer-inner">

        {/* left — brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <span className="footer-logo-name">Oncho<span>Scan</span></span>
          </div>
          <p className="footer-brand-desc">
            A multimodal deep learning framework for breast cancer diagnosis,
            combining ultrasound imaging with clinical metadata.
          </p>
          <div className="footer-tech-row">
            {TECH.map((t) => (
              <span key={t} className="footer-tech-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* center — links */}
        <div className="footer-links-col">
          <p className="footer-col-title">Resources</p>
          <ul className="footer-links">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="footer-link">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* right — research info */}
        <div className="footer-info-col">
          <p className="footer-col-title">Research</p>
          <div className="footer-info-rows">
            {[
              ['Degree', 'M.Tech — 2027'],
              ['Model', 'Multimodal Fusion'],
              ['Dataset', 'BUSI / Custom'],
              ['Accuracy', '94.3%'],
              ['F1 Score', '0.921'],
            ].map(([k, v]) => (
              <div key={k} className="footer-info-row">
                <span className="footer-info-key">{k}</span>
                <span className="footer-info-val">{v}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} OnchoScan · M.Tech Research Project ·
          AI-generated reports require clinical validation.
        </p>
        <p className="footer-disclaimer">
          Not for clinical use without professional review.
        </p>
      </div>
    </footer>
  );
};