import React, { useState, useRef, useEffect } from 'react';

const SLIDES = [
    {
        title: "AI-Powered Early Detection",
        desc: "Our multimodal deep learning model analyses ultrasound scans with 94.3% classification accuracy — catching what the eye might miss.",
        gradient: "linear-gradient(160deg, #0f172a 0%, #164e63 60%, #0891b2 100%)",
        icon: (
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
        ),
        stat: "94.3%", statLabel: "Accuracy",
    },
    {
        title: "U-Net Tumour Segmentation",
        desc: "Precisely delineates tumour boundaries using an advanced U-Net architecture, achieving a Dice coefficient of 88.7% on the BUSI dataset.",
        gradient: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 60%, #3b82f6 100%)",
        icon: (
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" />
                <circle cx="18" cy="6" r="3" fill="rgba(59,130,246,0.4)" />
            </svg>
        ),
        stat: "88.7%", statLabel: "Dice Score",
    },
    {
        title: "Multimodal Fusion",
        desc: "Combines deep CNN image features with patient clinical metadata through a feature fusion module for richer, more accurate predictions.",
        gradient: "linear-gradient(160deg, #0f172a 0%, #1c3d5a 60%, #0e7490 100%)",
        icon: (
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" />
                <path d="M12 8v8" />
            </svg>
        ),
        stat: "1.8s", statLabel: "Inference",
    },
    {
        title: "Clinical Decision Support",
        desc: "Generates confidence-scored diagnostic reports with tumour classification and severity assessment to support radiologists and clinicians.",
        gradient: "linear-gradient(160deg, #0f172a 0%, #1e3a5a 60%, #6366f1 100%)",
        icon: (
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        stat: "0.921", statLabel: "F1 Score",
    },
];

export const Diagnosis = ({ onComplete }) => {
    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [age, setAge] = useState('');
    const [birads, setBirads] = useState('');
    const [history, setHistory] = useState('no');
    const [loading, setLoading] = useState(false);
    const [slide, setSlide] = useState(0);
    const [animating, setAnimating] = useState(false);
    const fileRef = useRef();

    /* auto-advance slider */
    useEffect(() => {
        const t = setInterval(() => goTo((slide + 1) % SLIDES.length), 4000);
        return () => clearInterval(t);
    }, [slide]);

    const goTo = (idx) => {
        if (animating || idx === slide) return;
        setAnimating(true);
        setTimeout(() => { setSlide(idx); setAnimating(false); }, 400);
    };

    const handleFile = (f) => f && setFile(f);
    const handleDrop = (ev) => { ev.preventDefault(); setDragOver(false); handleFile(ev.dataTransfer.files[0]); };
    const handleAnalyse = async () => {
        if (!file) return;

        try {
            setLoading(true);

            // convert image to base64
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = async () => {
                try {
                    const response = await fetch("http://127.0.0.1:5000/predict", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            image: reader.result,
                        }),
                    });

                    const result = await response.json();

                    console.log("Prediction:", result);

                    onComplete({
                        file,
                        age,
                        birads,
                        history,
                        prediction: result,
                    });

                } catch (err) {
                    console.error(err);
                    alert("Prediction failed");
                } finally {
                    setLoading(false);
                }
            };

        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const current = SLIDES[slide];

    return (
        <div className="diag-root">

            {/* ── LEFT PANEL ── */}
            <div className="diag-left" style={{ background: current.gradient }}>

                {/* grid texture */}
                <div className="diag-grid-overlay" />

                {/* slide content */}
                <div className={`diag-slide-content${animating ? ' fade-out' : ' fade-in'}`}>
                    <div className="diag-slide-icon">{current.icon}</div>
                    <h2 className="diag-slide-title">{current.title}</h2>
                    <p className="diag-slide-desc">{current.desc}</p>
                    <div className="diag-slide-stat">
                        <span className="diag-stat-num">{current.stat}</span>
                        <span className="diag-stat-label">{current.statLabel}</span>
                    </div>
                </div>

                {/* dots */}
                <div className="diag-dots">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`diag-dot${i === slide ? ' active' : ''}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>

                {/* bottom caption */}
                <p className="diag-left-footer">
                    OnchoScan · Multimodal AI · M.Tech Research 2027
                </p>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="diag-right">
                <div className="diag-form-wrap">

                    <div className="diag-form-header">
                        <h1 className="diag-form-title">Start Diagnosis</h1>
                        <p className="diag-form-sub">
                            Upload an ultrasound scan and enter patient details to generate an AI diagnostic report.
                        </p>
                    </div>

                    {/* Drop Zone */}
                    <div
                        className={`diag-dropzone${dragOver ? ' drag' : ''}${file ? ' loaded' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileRef.current.click()}
                    >
                        {file ? (
                            <div className="diag-file-loaded">
                                <div className="diag-file-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="diag-file-name">{file.name}</p>
                                    <p className="diag-file-size">{(file.size / 1024).toFixed(1)} KB · Click to replace</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="diag-dz-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <p className="diag-dz-title">Drop ultrasound scan here</p>
                                <p className="diag-dz-sub">or click to browse your files</p>
                                <div className="diag-formats">
                                    {['DICOM', 'PNG', 'JPEG', 'NIfTI'].map((f) => (
                                        <span key={f} className="diag-fmt">{f}</span>
                                    ))}
                                </div>
                            </>
                        )}
                        <input ref={fileRef} type="file" accept=".dcm,.png,.jpg,.jpeg" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files[0])} />
                    </div>

                    {/* Patient Details */}
                    <div className="diag-section-label">Patient details</div>

                    <div className="diag-form-grid">
                        <div className="diag-field">
                            <label className="diag-label">Age</label>
                            <input type="number" placeholder="e.g. 47" value={age} onChange={(e) => setAge(e.target.value)} className="diag-input" min={18} max={100} />
                        </div>
                        <div className="diag-field">
                            <label className="diag-label">BI-RADS score</label>
                            <select value={birads} onChange={(e) => setBirads(e.target.value)} className="diag-input">
                                <option value="">Select…</option>
                                <option value="1">1 — Negative</option>
                                <option value="2">2 — Benign</option>
                                <option value="3">3 — Probably benign</option>
                                <option value="4A">4A — Low suspicion</option>
                                <option value="5">5 — Highly suggestive</option>
                            </select>
                        </div>
                        <div className="diag-field diag-field-full">
                            <label className="diag-label">Family history of breast cancer</label>
                            <select value={history} onChange={(e) => setHistory(e.target.value)} className="diag-input">
                                <option value="no">No</option>
                                <option value="yes">Yes — first-degree relative</option>
                                <option value="yes2">Yes — second-degree relative</option>
                            </select>
                        </div>
                    </div>

                    {/* Run Button */}
                    <button className="diag-run-btn" onClick={handleAnalyse} disabled={!file || loading}>
                        {loading ? (
                            <>
                                <div className="diag-spinner" />
                                Analysing scan…
                            </>
                        ) : (
                            <>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                Run analysis
                            </>
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
};