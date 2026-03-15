import React, { useState, useEffect } from 'react';

const RESULTS = {
  accuracy: "94.3%",
  segmentation: "88.7%",
  inference: "1.8s",
  type: "Malignant",
  confidence: 87,
  benign: 10,
  normal: 3,
  precision: "0.931",
  recall: "0.912",
  f1: "0.921",
};

/* ── Animated probability bar ── */
function ProbBar({ label, pct, color, textColor, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div className="rpt-bar-row">
      <div className="rpt-bar-header">
        <span className="rpt-bar-label">{label}</span>
        <span className="rpt-bar-pct" style={{ color: textColor }}>{pct}%</span>
      </div>
      <div className="rpt-bar-track">
        <div
          className="rpt-bar-fill"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

/* ── Summary panel shown on left ── */
const SUMMARY_STATS = [
  { num: "94.3%", label: "Classification accuracy", color: "#38bdf8" },
  { num: "88.7%", label: "Dice segmentation score", color: "#818cf8" },
  { num: "1.8s",  label: "Inference time",          color: "#fb923c" },
  { num: "0.921", label: "F1 score",                color: "#34d399" },
];

export const Report = ({ data, onReset }) => {
  const biradLabel = data.birads ? `BI-RADS ${data.birads}` : "BI-RADS 4A";

  const handleExport = () => {
    const lines = [
      "OnchoScan — Breast Cancer Diagnostic Report",
      "============================================",
      "",
      "Patient Input",
      `  File             : ${data.file?.name || "scan.dcm"}`,
      `  Age              : ${data.age || "—"}`,
      `  BI-RADS          : ${data.birads || "—"}`,
      `  Family History   : ${data.history === "no" ? "No" : "Yes"}`,
      "",
      "Analysis Results",
      `  Classification Accuracy  : ${RESULTS.accuracy}`,
      `  Segmentation (Dice)      : ${RESULTS.segmentation}`,
      `  Inference Time           : ${RESULTS.inference}`,
      `  Diagnostic Type          : ${RESULTS.type}`,
      "",
      "Class Probabilities",
      `  Malignant  : ${RESULTS.confidence}%`,
      `  Benign     : ${RESULTS.benign}%`,
      `  Normal     : ${RESULTS.normal}%`,
      "",
      "Evaluation Metrics",
      `  Precision  : ${RESULTS.precision}`,
      `  Recall     : ${RESULTS.recall}`,
      `  F1 Score   : ${RESULTS.f1}`,
      "",
      "Note: This report is AI-generated and requires clinical validation.",
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "oncoscan_diagnostic_report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rpt-root">

      {/* ── LEFT PANEL ── */}
      <div className="rpt-left">
        <div className="rpt-grid-overlay" />
        <div className="rpt-left-content">

          {/* verdict badge */}
          <div className="rpt-verdict-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            High Suspicion
          </div>

          <h2 className="rpt-left-title">
            Malignant<br />
            <span className="rpt-left-title-muted">diagnosis detected</span>
          </h2>

          <p className="rpt-left-desc">
            The AI model has classified the scan as malignant with 87% confidence.
            Immediate histopathological confirmation and clinical review is advised.
          </p>

          {/* patient summary */}
          <div className="rpt-patient-card">
            <p className="rpt-patient-title">Patient summary</p>
            <div className="rpt-patient-rows">
              <div className="rpt-patient-row">
                <span className="rpt-patient-key">File</span>
                <span className="rpt-patient-val">{data.file?.name || "scan.dcm"}</span>
              </div>
              {data.age && (
                <div className="rpt-patient-row">
                  <span className="rpt-patient-key">Age</span>
                  <span className="rpt-patient-val">{data.age}</span>
                </div>
              )}
              <div className="rpt-patient-row">
                <span className="rpt-patient-key">BI-RADS</span>
                <span className="rpt-patient-val">{biradLabel}</span>
              </div>
              <div className="rpt-patient-row">
                <span className="rpt-patient-key">Family Hx</span>
                <span className="rpt-patient-val">{data.history === "no" ? "None" : "Yes"}</span>
              </div>
            </div>
          </div>

          {/* stats grid */}
          <div className="rpt-stats-grid">
            {SUMMARY_STATS.map(({ num, label, color }) => (
              <div key={label} className="rpt-stat">
                <span className="rpt-stat-num" style={{ color }}>{num}</span>
                <span className="rpt-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="rpt-left-footer">OnchoScan · Multimodal AI · M.Tech Research 2027</p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="rpt-right">
        <div className="rpt-form-wrap">

          {/* header */}
          <div className="rpt-header">
            <div>
              <h1 className="rpt-heading">Diagnostic report</h1>
              <p className="rpt-meta">
                {data.file?.name || "scan.dcm"}
                {data.age ? ` · Age ${data.age}` : ""}
                {` · ${biradLabel}`}
              </p>
            </div>
            <div className="rpt-btn-row">
              <button className="rpt-btn-outline" onClick={onReset}>← New scan</button>
              <button className="rpt-btn-primary" onClick={handleExport}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export report
              </button>
            </div>
          </div>

          {/* stat cards */}
          <div className="rpt-cards">
            {[
              { label: "Classification accuracy", value: RESULTS.accuracy, cls: "c1" },
              { label: "Segmentation (Dice)",      value: RESULTS.segmentation, cls: "c2" },
              { label: "Inference time",           value: RESULTS.inference, cls: "c3" },
              { label: "Diagnostic type",          value: RESULTS.type, cls: "c4" },
            ].map(({ label, value, cls }) => (
              <div key={label} className={`rpt-card ${cls}`}>
                <p className="rpt-card-label">{label}</p>
                <p className="rpt-card-value">{value}</p>
              </div>
            ))}
          </div>

          {/* prob bars */}
          <div className="rpt-results-card">
            <p className="rpt-section-label">Class probabilities</p>
            <ProbBar label="Malignant" pct={RESULTS.confidence} color="linear-gradient(90deg,#ef4444,#dc2626)" textColor="#dc2626" delay={100} />
            <ProbBar label="Benign"    pct={RESULTS.benign}     color="linear-gradient(90deg,#f59e0b,#d97706)" textColor="#d97706" delay={220} />
            <ProbBar label="Normal"    pct={RESULTS.normal}     color="linear-gradient(90deg,#10b981,#059669)" textColor="#059669" delay={340} />

            {/* metrics */}
            <div className="rpt-metrics">
              {[["Precision", RESULTS.precision], ["Recall", RESULTS.recall], ["F1 score", RESULTS.f1]].map(([l, v]) => (
                <div key={l} className="rpt-metric">
                  <p className="rpt-metric-label">{l}</p>
                  <p className="rpt-metric-value">{v}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};