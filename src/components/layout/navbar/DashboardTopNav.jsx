import { ThemeToggle } from '../../shared/theme/ThemeToggle';
import { Bell, Search } from 'lucide-react';

export default function DashboardTopNav() {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search analytics, datasets..."
            className="w-full bg-muted/50 border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
        </button>
        <ThemeToggle />
        <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden cursor-pointer">
          <span className="text-xs font-bold text-primary">JD</span>
        </div>
      </div>
    </header>
  );
}
