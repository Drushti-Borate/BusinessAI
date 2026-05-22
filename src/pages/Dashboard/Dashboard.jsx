import { ArrowUpRight, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const stats = [
  { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
  { name: 'Active Users', value: '2,350', change: '+15.2%', icon: Users },
  { name: 'Conversion Rate', value: '3.24%', change: '+4.1%', icon: Activity },
  { name: 'Growth', value: '+12.5%', change: '+2.1%', icon: TrendingUp },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, here's your business at a glance.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.change} <ArrowUpRight className="h-3 w-3 ml-1" />
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Area Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm lg:col-span-2 min-h-[400px] flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Revenue Overview</h3>
            <select className="bg-muted border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 bg-muted/30 rounded-lg border border-dashed border-border flex items-center justify-center">
            <p className="text-muted-foreground text-sm flex flex-col items-center">
              <BarChart2 className="h-8 w-8 mb-2 opacity-50" />
              Chart visualization will render here
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">New dataset processed</p>
                  <p className="text-xs text-muted-foreground">Q3_financials.csv analysis completed.</p>
                  <span className="text-xs text-muted-foreground mt-1 inline-block">{i * 2} hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Need to import BarChart2 in Dashboard. Adding it dynamically for simplicity since it's just placeholder.
import { BarChart2 } from 'lucide-react';
