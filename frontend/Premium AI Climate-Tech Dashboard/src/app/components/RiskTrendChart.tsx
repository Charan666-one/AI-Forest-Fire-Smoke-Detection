import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { format } from 'date-fns';

interface RiskTrendChartProps {
  data: Array<{ timestamp: Date; probability: number }>;
}

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  const chartData = data.map((item) => ({
    time: format(item.timestamp, 'HH:mm:ss'),
    probability: item.probability,
  }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">No trend data available</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProbability" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#cbd5e1' }}
          />
          <Area
            type="monotone"
            dataKey="probability"
            stroke="#14b8a6"
            strokeWidth={2}
            fill="url(#colorProbability)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
