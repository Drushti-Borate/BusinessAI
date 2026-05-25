import React from 'react';
import BarChartCard from './BarChartCard';
import LineChartCard from './LineChartCard';
import PieChartCard from './PieChartCard';

export default function ChartWrapper({ config }) {
  if (!config || !config.data || config.data.length === 0) {
    return null;
  }

  switch (config.type) {
    case 'bar':
      return (
        <BarChartCard 
          title={config.title} 
          data={config.data} 
          xKey={config.xKey} 
          yKey={config.yKey} 
        />
      );
    case 'line':
      return (
        <LineChartCard 
          title={config.title} 
          data={config.data} 
          xKey={config.xKey} 
          yKey={config.yKey} 
        />
      );
    case 'pie':
      return (
        <PieChartCard 
          title={config.title} 
          data={config.data} 
        />
      );
    default:
      return (
        <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-center min-h-[300px] text-muted-foreground">
          Unsupported chart type: {config.type}
        </div>
      );
  }
}
