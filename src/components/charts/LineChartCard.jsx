import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function LineChartCard({ title, data, xKey, yKey }) {
  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-md text-sm">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-primary font-medium">
            {payload[0].name}: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
            <XAxis 
              dataKey={xKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'currentColor', opacity: 0.7, fontSize: 12 }}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              name={yKey}
              stroke="currentColor" 
              className="text-primary"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "var(--color-card)" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
