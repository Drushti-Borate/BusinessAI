import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Modern cohesive colors for pie slices
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function PieChartCard({ title, data }) {
  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-md text-sm flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }}></div>
          <span className="font-medium">{payload[0].name}:</span>
          <span className="font-bold">{payload[0].value.toLocaleString()}</span>
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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              stroke="var(--color-card)"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
