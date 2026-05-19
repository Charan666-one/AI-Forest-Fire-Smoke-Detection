import { Flame, Activity, Wifi } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
  backendOnline: boolean;
  predictionCount: number;
}

export function Header({ backendOnline, predictionCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F14]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1800px] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/30">
              <Flame className="size-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">
                AI Forest Fire Detection
              </h1>
              <p className="text-xs text-slate-400">
                Environmental Risk Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 rounded-lg bg-slate-900/50 px-3 py-1.5 ring-1 ring-white/5">
              <div className={`size-1.5 rounded-full ${backendOnline ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-slate-500'}`} />
              <span className="text-xs text-slate-300">
                {backendOnline ? 'System Online' : 'Offline'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Activity className="size-3.5" />
              <span>{predictionCount} predictions</span>
            </div>

            <time className="text-xs text-slate-400">
              {format(new Date(), 'MMM d, yyyy • HH:mm')}
            </time>
          </div>
        </div>
      </div>
    </header>
  );
}
