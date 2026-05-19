import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
}

export function StatCard({ label, value, icon: Icon, trend, subtitle }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex h-[88px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-4 ring-1 ring-white/5 transition-all hover:ring-white/10"
    >
      <div className="flex items-start justify-between">
        <div className="flex min-h-0 flex-col justify-between">
          <p className="text-xs text-slate-400">{label}</p>
          <p className="mt-1.5 text-2xl font-semibold leading-none text-white">{value}</p>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/50 ring-1 ring-white/5">
          <Icon className="size-4 text-slate-400" />
        </div>
      </div>
      {subtitle && (
        <p className="text-xs text-slate-500">{subtitle}</p>
      )}
    </motion.div>
  );
}
