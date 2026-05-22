export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-lg tracking-tight">DataMind AI</span>
          <p className="text-sm text-muted-foreground mt-1">Empowering decisions with intelligent data.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
