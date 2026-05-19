import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  value: number; // 0-100
  label: string;
}

export function RiskGauge({ value, label }: RiskGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = (val: number) => {
    if (val < 30) return { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.3)' };
    if (val < 60) return { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)' };
    if (val < 80) return { stroke: '#f97316', glow: 'rgba(249, 115, 22, 0.3)' };
    return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)' };
  };

  const getRiskLevel = (val: number) => {
    if (val < 30) return { text: 'Low Risk', color: 'text-emerald-400' };
    if (val < 60) return { text: 'Moderate Risk', color: 'text-amber-400' };
    if (val < 80) return { text: 'High Risk', color: 'text-orange-400' };
    return { text: 'Critical Risk', color: 'text-red-400' };
  };

  const color = getColor(displayValue);
  const riskLevel = getRiskLevel(displayValue);
  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <svg width="240" height="240" className="rotate-[-90deg]">
          <circle
            cx="120"
            cy="120"
            r="90"
            fill="none"
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth="12"
          />
          <motion.circle
            cx="120"
            cy="120"
            r="90"
            fill="none"
            stroke={color.stroke}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 8px ${color.glow})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-5xl font-bold text-white">
              {Math.round(displayValue)}%
            </div>
            <div className="mt-1 text-xs text-slate-400">{label}</div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`mt-6 rounded-full px-4 py-1.5 text-sm font-medium ring-1 ${riskLevel.color} ring-current/20`}
      >
        {riskLevel.text}
      </motion.div>
    </div>
  );
}
