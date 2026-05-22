import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login for Phase 1
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10 opacity-50 dark:opacity-20 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 flex justify-center">
        <Link to="/" className="flex items-center space-x-2">
          <BarChart3 className="h-10 w-10 text-primary" />
          <span className="font-bold text-2xl tracking-tight">DataMind AI</span>
        </Link>
      </div>

      <div className="glass rounded-2xl w-full max-w-md p-8 sm:p-10 z-10 relative">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h2>
          <p className="text-sm text-muted-foreground">Enter your details to access your dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input 
                type="email" 
                required
                placeholder="you@company.com" 
                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Password</label>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input 
                type="password" 
                required
                placeholder="••••••••" 
                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Sign in to Dashboard
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? <a href="#" className="font-medium text-primary hover:text-primary/80">Start your 14-day free trial</a>
          </p>
        </div>
      </div>
    </div>
  );
}
