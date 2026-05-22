import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, Table2, Columns, Rows } from 'lucide-react';
import { useState, useRef } from 'react';
import { uploadService } from '../../services/api/uploadService';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const processFile = async (selectedFile) => {
    if (!selectedFile) return;
    
    // Reset states
    setError(null);
    setResult(null);
    setFile(selectedFile);
    
    // Basic validation
    if (!selectedFile.name.endsWith('.csv')) {
      setError("Invalid file format. Please upload a CSV file.");
      return;
    }

    setLoading(true);
    
    try {
      const data = await uploadService.uploadCSV(selectedFile);
      setResult(data);
    } catch (err) {
      setError(err.message);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Dataset Upload</h1>
          <p className="text-muted-foreground">Upload your CSV business data to generate instant AI insights.</p>
        </div>
        {result && (
          <button 
            onClick={resetUpload}
            className="bg-card border border-border text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            Upload New File
          </button>
        )}
      </div>

      {!result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-6">
            <div 
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer ${
                isDragging 
                  ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                  : "border-border bg-card hover:bg-muted/30"
              } ${loading ? "opacity-50 pointer-events-none" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !loading && fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".csv" 
                className="hidden" 
              />
              
              {loading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                  <h3 className="text-xl font-bold mb-2">Analyzing Dataset...</h3>
                  <p className="text-muted-foreground">Please wait while we process your file.</p>
                </div>
              ) : (
                <>
                  <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadCloud className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Drag & drop your CSV here</h3>
                  <p className="text-muted-foreground mb-6">or click to browse from your computer</p>
                  <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm pointer-events-none">
                    Select File
                  </button>
                </>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start">
                <AlertCircle className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
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
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Upload Successful</h2>
              <p className="text-sm text-muted-foreground">File: <span className="font-medium text-foreground">{result.filename}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <Rows className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Rows</p>
                <h3 className="text-2xl font-bold">{result.rows.toLocaleString()}</h3>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <Columns className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Columns</p>
                <h3 className="text-2xl font-bold">{result.columns.toLocaleString()}</h3>
              </div>
            </div>
            
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <Table2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Data Type</p>
                <h3 className="text-2xl font-bold">Tabular Data</h3>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
              <h3 className="font-semibold text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Data Preview (First {result.preview.length} rows)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    {result.column_names.map((col, idx) => (
                      <th key={idx} className="px-6 py-3 font-medium tracking-wider whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {result.preview.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-muted/50 transition-colors">
                      {result.column_names.map((col, colIndex) => (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                          {row[col] !== null ? String(row[col]) : <span className="text-muted-foreground italic">null</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
