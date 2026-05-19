import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface FeatureImportanceChartProps {
  data: Array<{ name: string; importance: number }>;
}

export function FeatureImportanceChart({ data }: FeatureImportanceChartProps) {
  const sortedData = [...data]
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 8)
    .map((item, index) => ({
      ...item,
      id: `${item.name.replace(/\s+/g, '-').toLowerCase()}-${index}`,
    }));

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 50, left: 110, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(20, 184, 166, 0.5)" />
              <stop offset="100%" stopColor="rgba(20, 184, 166, 0.8)" />
            </linearGradient>
          </defs>
          <XAxis
            type="number"
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#cbd5e1' }}
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
          />
          <Bar
            dataKey="importance"
            fill="url(#barGradient)"
            radius={[0, 6, 6, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
