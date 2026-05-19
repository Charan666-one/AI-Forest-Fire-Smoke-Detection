import { format } from 'date-fns';
import { motion } from 'motion/react';

export interface PredictionRecord {
  id: string;
  timestamp: Date;
  probability: number;
  riskLevel: string;
  detected: boolean;
  confidence: number;
}

interface PredictionHistoryProps {
  predictions: PredictionRecord[];
}

export function PredictionHistory({ predictions }: PredictionHistoryProps) {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-emerald-500/20 text-emerald-400 ring-emerald-500/30';
      case 'moderate':
        return 'bg-amber-500/20 text-amber-400 ring-amber-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 ring-orange-500/30';
      case 'critical':
        return 'bg-red-500/20 text-red-400 ring-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 ring-slate-500/30';
    }
  };

  if (predictions.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-900/30 ring-1 ring-white/5">
        <p className="text-sm text-slate-500">No predictions yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900/30 ring-1 ring-white/5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-slate-900/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                Fire Probability
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                Risk Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                Detection
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody>
            {predictions.slice().reverse().slice(0, 10).map((prediction, idx) => (
              <motion.tr
                key={prediction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-white/5 transition-colors hover:bg-slate-900/30"
              >
                <td className="px-4 py-3 text-sm text-slate-300">
                  {format(prediction.timestamp, 'MMM d, HH:mm:ss')}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-white">
                  {prediction.probability.toFixed(1)}%
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${getRiskColor(prediction.riskLevel)}`}
                  >
                    {prediction.riskLevel}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  {prediction.detected ? 'Fire Detected' : 'No Fire'}
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  {(prediction.confidence * 100).toFixed(1)}%
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
