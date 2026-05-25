import pandas as pd
from fastapi import UploadFile, HTTPException
import io
from app.services.analytics_service import generate_analytics

async def process_csv(file: UploadFile):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")
    
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        # Check if empty
        if df.empty:
            raise HTTPException(status_code=400, detail="The uploaded CSV file is empty.")
            
        # Get up to 5 rows for preview
        # Replace NaN with None for valid JSON serialization for preview
        df_preview = df.where(pd.notnull(df), None)
        preview = df_preview.head(5).to_dict(orient='records')
        column_names = df.columns.tolist()
        
        # Generate analytics and charts
        summary, charts = generate_analytics(df)
        
        return {
            "filename": file.filename,
            "summary": summary,
            "charts": charts,
            "column_names": column_names,
            "preview": preview,
            "rows": summary["rows"],
            "columns": summary["columns"]
        }
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="The uploaded CSV file is empty or corrupted.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing CSV: {str(e)}")
