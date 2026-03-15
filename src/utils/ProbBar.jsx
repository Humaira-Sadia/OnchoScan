import { AnimateBar } from './AnimateBar';

export const ProbBar = ({ label, pct, color, textColor, delay }) => {
    return (
        <div className="onco-bar-row">
            <div className="onco-bar-header">
                <span className="onco-bar-label">{label}</span>
                <span className="onco-bar-pct" style={{ color: textColor }}>{pct}%</span>
            </div>
            <AnimateBar pct={pct} color={color} delay={delay} />
        </div>
    )
};