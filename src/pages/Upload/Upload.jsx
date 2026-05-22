import { UploadCloud, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Dummy handler for Phase 1
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Upload Dataset</h1>
        <p className="text-muted-foreground">Upload your business data (CSV, Excel) to generate instant AI insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div 
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
              isDragging 
                ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                : "border-border bg-card hover:bg-muted/30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <UploadCloud className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">Drag & drop your files here</h3>
            <p className="text-muted-foreground mb-6">or click to browse from your computer</p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
              Select Files
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold mb-4">Supported Formats</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['CSV', 'XLSX', 'JSON', 'SQL'].map(ext => (
                <div key={ext} className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 border border-border">
                  <FileText className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">{ext}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-primary" />
              Formatting Tips
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                Ensure the first row contains column headers.
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                Remove any total/summary rows at the bottom.
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 shrink-0" />
                Dates should be consistently formatted (e.g., YYYY-MM-DD).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
