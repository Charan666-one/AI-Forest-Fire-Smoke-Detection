import { Slider } from './ui/slider';

interface FeatureInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  description?: string;
}

export function FeatureInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  description,
}: FeatureInputProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-sm tabular-nums text-white">
          {value.toFixed(2)}
          {unit && <span className="ml-1 text-xs text-slate-400">{unit}</span>}
        </span>
      </div>
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
      <div className="relative">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-slate-800/50 [&_[data-slot=slider-track]]:ring-1 [&_[data-slot=slider-track]]:ring-white/5 [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-teal-500 [&_[data-slot=slider-range]]:to-emerald-500 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-teal-400 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-md [&_[data-slot=slider-thumb]]:ring-teal-500/20 [&_[data-slot=slider-thumb]]:hover:scale-110"
        />
      </div>
    </div>
  );
}
