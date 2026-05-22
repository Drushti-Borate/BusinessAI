import { ArrowRight, BarChart2, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Introducing DataMind AI 2.0
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-balance">
          Understand your business data <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">instantly.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl text-balance">
          Connect your datasets and let our AI analyst uncover hidden trends, generate executive reports, and predict future KPIs—no SQL required.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/dashboard" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
            Start analyzing free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link to="/login" className="bg-card text-foreground border border-border px-8 py-4 rounded-lg font-medium hover:bg-muted transition-colors flex items-center justify-center shadow-sm">
            Book a demo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Enterprise-grade analytics for everyone</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Powerful enough for data scientists, intuitive enough for executives.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Visualizations</h3>
              <p className="text-muted-foreground leading-relaxed">Simply upload your data and our AI automatically generates the most relevant charts and dashboards.</p>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Insights</h3>
              <p className="text-muted-foreground leading-relaxed">Ask questions in plain English and get immediate answers drawn directly from your live business metrics.</p>
            </div>
            
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
              <p className="text-muted-foreground leading-relaxed">Your data never trains our models. Enterprise-grade encryption at rest and in transit ensures complete privacy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
