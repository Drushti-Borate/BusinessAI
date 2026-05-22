import pandas as pd
from fastapi import UploadFile, HTTPException
import io

async def process_csv(file: UploadFile):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")
    
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        # Check if empty
        if df.empty:
            raise HTTPException(status_code=400, detail="The uploaded CSV file is empty.")
            
        rows, columns = df.shape
        column_names = df.columns.tolist()
        
        # Replace NaN with None for valid JSON serialization
        df = df.where(pd.notnull(df), None)
        
        # Get up to 5 rows for preview
        preview = df.head(5).to_dict(orient='records')
        
        return {
            "filename": file.filename,
            "rows": rows,
            "columns": columns,
            "column_names": column_names,
            "preview": preview
        }
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="The uploaded CSV file is empty or corrupted.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing CSV: {str(e)}")
